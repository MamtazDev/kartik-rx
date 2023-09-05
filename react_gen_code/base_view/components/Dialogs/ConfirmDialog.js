// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: Dialogs/ConfirmDialog.js)

import React from 'react';
import PropTypes from 'prop-types';
import ConfirmDialog from 'molecules/Dialogs/ConfirmDialog';
import {ACTION_TYPES} from '../reducer';

{% import 'common.macros' as common_macros %}

{%- for js_header in additional_imports %}
{{ js_header }}
{%- endfor %}

const {{content.name}} = (props) => {
  const { state: { {{content.name}} }, onAction } = props;

  {%- for action, params in content.actions.items() %}
  const {{action}} = () => {
    onAction({
      type: {{ common_macros.get_action_types(params.action_type) }},
      payload: {
        ...{{content.name}}
      }
    });
  };
  {%- endfor %}

  return <ConfirmDialog
      isOpen={ {{content.name}}.isOpen }
      message='{{content.message}}'
      title='{{content.title}}'
      {%- for action in content.actions.keys() %}
      {{action}}={ {{action}} }
      {%- endfor %}
  />
}

{{content.name}}.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default {{content.name}};
