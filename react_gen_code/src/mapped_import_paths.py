from munch import Munch, DefaultMunch

base_import_paths = {
    "table_query": "import TableView from 'components/Table/Table';",
    "table": "",
}

base_template_paths = Munch(
    base="BaseComponent.js",
    reducer="BaseReducer.js",
    table_query="components/BaseTableView.js",
    form="components/BaseForm.js",
    form_base="components/Form/Base.js",
    form_array="components/Form/Array.js",

    confirm_dialog="components/Dialogs/ConfirmDialog.js",
    children_dialog="components/Dialogs/ChildrenDialog.js",

    routes="routes.js",
    navigation="navigationConfig.js",
    
    table="",
)

base_template_paths_v2 = Munch(
    base="BaseComponent.js",
    reducer="BaseReducer.js",
    table_query="components_v2/BaseTableView.js",
    form="components_v2/BaseForm.js",
    form_base="components_v2/Form/Base.js",
    form_array="components_v2/Form/Array.js",

    confirm_dialog="components_v2/Dialogs/ConfirmDialog.js",
    children_dialog="components_v2/Dialogs/ChildrenDialog.js",

    routes="routes.js",
    navigation="navigationConfig.js",
    
    table="",
)


def get_table_query_parent_usage(component_config: DefaultMunch) -> str:
    return f"<{component_config.name} />"


get_template_parent_usage = Munch(
    table_query=get_table_query_parent_usage,
)
