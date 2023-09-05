from munch import Munch
from .default_munch import DefaultMunchRx


def base_validator(component_config: DefaultMunchRx):
    assert component_config.content.title
    assert component_config.content.heading
    assert component_config.content.sub_heading


def table_query_validator(component_config: DefaultMunchRx):
    assert component_config.content.init_table_data_action

base_validators = Munch(
    base=base_validator,
    table_query=table_query_validator,
)

def validate_config(component_config: DefaultMunchRx) -> DefaultMunchRx:
    assert component_config.template_type is not None
    assert component_config.content.name is not None

    if component_config.template_type in base_validators:
        base_validators[component_config.template_type](component_config=component_config)
    
    return component_config

def validate_reducer_config(reducer_config: DefaultMunchRx) -> DefaultMunchRx:
    assert reducer_config.template_type is not None

    for key in reducer_config.content.action_types:
        if reducer_config.content.action_types[key] is None:
            reducer_config.content.action_types[key] = DefaultMunchRx()

        el = reducer_config.content.action_types[key]
        if el.action_handler_fn:
            if not isinstance(el.action_handler_fn.success_actiontype, list):
                el.action_handler_fn.success_actiontype = [el.action_handler_fn.success_actiontype]
        
            if not isinstance(el.action_handler_fn.failure_actiontype, list):
                el.action_handler_fn.failure_actiontype = [el.action_handler_fn.failure_actiontype]

    return reducer_config