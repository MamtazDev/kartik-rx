// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: Dialogs/ChildrenDialog.js)

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import AddDialog from 'molecules/Dialogs/AddDialog';
import {ACTION_TYPES} from '../reducer';

{% import 'common.macros' as common_macros %}

{%- for js_header in additional_imports %}
{{ js_header }}
{%- endfor %}

const {{content.name}} = (props) => {
  const { state, onAction, ...rest } = props;

  {%- for action, params in content.actions.items() %}
  const {{action}} = () => {
    onAction({
      type: {{ common_macros.get_action_types(params.action_type) }},
      payload: {
        ...state.{{content.name}}
      }
    });
  };
  {%- endfor %}

  return <AddDialog
    isOpen={ state.{{content.name}}.isOpen }
    title='{{content.title}}'
    // Actions list
    {%- for action in content.actions.keys() %}
    {{action}}={ {{action}} }
    {% endfor %}

    {%- if content.displayActions %}displayActions={ {{content.displayActions}} }{% endif %}
    {% if content.maxWidth %}maxWidth='{{content.maxWidth}}'{% endif %}
  >
    {%- for child_component in child_components %}
    <{{ child_component }} onAction={onAction} state={state} {...rest} />
    {%- endfor %}
  </AddDialog>;
};

{{content.name}}.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default {{content.name}};
