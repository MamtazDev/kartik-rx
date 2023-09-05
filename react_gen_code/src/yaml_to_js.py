from typing import Dict, Optional
import yaml
import logging
from pathlib import Path
from jinja2 import Environment
from munch import Munch, DefaultMunch
from src.mapped_import_paths import base_template_paths, base_template_paths_v2, get_template_parent_usage
from collections import namedtuple
from .default_munch import DefaultMunchRx
from .config_validators import validate_config, validate_reducer_config

logger = logging.getLogger("main")

ComponentInfo = namedtuple("ComponentInfo", "import_line component_jsx")

def write_to_file(path: Path, content: str) -> None:
    with open(path, "w") as f:
        f.write(content)


def get_template_path(template_type: str) -> str:
    return base_template_paths[template_type]


def reducer_to_js(component_config: DefaultMunchRx, base_dir: Path, jenv: Environment) -> None:
    component_config = validate_reducer_config(component_config)

    base_dir.mkdir(parents=True, exist_ok=True)
    template = jenv.get_template(get_template_path(component_config.template_type))
    component_file = base_dir / 'reducer.js'
    component_import_path = str(component_file)[7:-3]
    write_to_file(
        component_file,
        template.render(
            content=component_config.content,
            additional_imports=component_config.content.get('additional_imports', []),
        ),
    )


# Gets recursively called, for component and sub-components
def component_to_js(
    component_config: DefaultMunchRx, base_dir: Path, jenv: Environment
) -> ComponentInfo:
    component_config = validate_config(component_config=component_config)

    base_dir.mkdir(parents=True, exist_ok=True)
    subcomponent_dir = base_dir if "subcomponents" in str(base_dir) else base_dir / "subcomponents"
    subcomponents_imports = []
    child_components = []

    # Subcomponents compiled and created.
    # Associated imports and parent usages also initialized.
    if component_config.subcomponents:
        subcomponent_dir.mkdir(parents=True, exist_ok=True)
        for _, subcomponent_config in component_config.subcomponents.items():
            component_info = component_to_js(
                component_config=subcomponent_config, jenv=jenv, base_dir=subcomponent_dir
            )
            subcomponents_imports.append(component_info.import_line)
            child_components.append(component_info.component_jsx)

    # Parent component compiled
    logger.info("Rendering: component_name: %s template_type: %s", component_config.content.name, component_config.template_type)
    template = jenv.get_template(get_template_path(component_config.template_type))
    component_file = base_dir / (component_config.content.name + ".js")
    component_import_path = str(component_file)[7:-3]
    write_to_file(
        component_file,
        template.render(
            content=component_config.content,
            additional_imports=subcomponents_imports + component_config.content.get('additional_imports', []),
            child_components=child_components + component_config.content.get('additional_child_components', []),
        ),
    )

    # Return relevant details for Parent use
    return ComponentInfo(
        import_line=f"import {component_config.content.name} from '{component_import_path}';",
        component_jsx=f"{component_config.content.name}"
    )


def compile_js(output_path: Path, yaml_base: Path, page_yaml: Path, jenv: Environment) -> None:
    # page_yaml = yaml_base / pagename
    routes_file = yaml_base / "routes.yaml"
    navigation_file = yaml_base / "navigation.yaml"

    with open(page_yaml, "r") as c_file:
        config = DefaultMunchRx.fromDict(yaml.safe_load(c_file))

    with open(routes_file, "r") as c_file:
        routes_config: DefaultMunchRx = DefaultMunchRx.fromDict(yaml.safe_load(c_file))

    routes_list = routes_config.routes
    for component_config in config.components:
        component_dir = output_path / component_config.content.name

        # Prepare reducer
        if component_config.reducer:
            reducer_to_js(component_config=component_config.reducer, base_dir=component_dir, jenv=jenv)

        # Prepare components
        component_to_js(component_config=component_config, base_dir=component_dir, jenv=jenv)

        # Import path added to route
        if component_config.path not in routes_list:
            routes_list[component_config.path] = {"exact": "true", "path": component_config.path}

        routes_list[component_config.path].update(import_path=str(component_dir)[7:] + f"/{component_config.content.name}")
    
    # Save updates route's state
    with open(routes_file, 'w') as outfile:
        logger.info("Rendering: %s", routes_file)
        yaml.dump(routes_config.toDict(), outfile, default_flow_style=False)

    # Write routes.js file
    template = jenv.get_template(base_template_paths.routes)
    write_to_file(
        output_path / base_template_paths.routes,
        template.render(routes=list(routes_list.values())),
    )

    # Sidebar navigation addition
    template = jenv.get_template(base_template_paths.navigation)
    with open(navigation_file, "r") as c_file:
        logger.info("Rendering: %s", navigation_file)
        navigation_config = DefaultMunchRx.fromDict(yaml.safe_load(c_file))
        write_to_file(
            output_path / base_template_paths.navigation,
            template.render(
                navigations=navigation_config.navigations,
                additional_imports=navigation_config.additional_imports,
            ),
        )

    logger.info("Rendering complete: %s", page_yaml)
