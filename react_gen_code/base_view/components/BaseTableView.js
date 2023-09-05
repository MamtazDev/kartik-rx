// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseTableView.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import TableView from 'components/Table/Table';
import {ACTION_TYPES} from '../reducer';
import _isEmpty from 'lodash/isEmpty';

{% import 'common.macros' as common_macros %}

{%- for js_header in additional_imports %}
{{ js_header }}
{%- endfor %}

const columns = [
  {%- for col in content.columns %}
  { id: '{{col.id}}', label: '{{col.label}}', align: '{{col.align}}'{% if col.display_func %}, display_func: {{col.display_func}} {% endif %}},
  {%- endfor %}
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const {{content.name}} = (props) => {
  const {onAction, state} = props;
  const { classes } = useStyles();

  {% if content.action_buttons_list -%}
  const getActionButtons = () => {
    return [
      {%- for action_button in content.action_buttons_list %}
      {{ action_button.jinja2Str() }},
      {%- endfor %}
    ];
  };
  {%- endif %}

  {% if content.action_buttons_list -%}{% for action_button in content.action_buttons_list -%}
  {%- if action_button.action_type %}
  const {{action_button.onClick}} = (editObj) => {
    onAction({
      type: {{ common_macros.get_action_types(action_button.action_type) }},
      payload: {
        editObj
      },
    });
  };{%- endif %}{%- endfor %}{% endif %}

  useEffect(() => {
    // setTableData();
    if(!state.{{content.name}}.loaded) {
      onAction({
        type: {{ common_macros.get_action_types(content.init_table_data_action) }},
        payload: {
          ...state,
          ...state.{{content.name}}
        },
      });
    }
  }, [state.{{content.name}}.loaded]);

  return <div className={classes.root}>
    <TableView
      columns={columns}
      {% if content.prepare_rows_fn %}tableData={ {{content.prepare_rows_fn}}(state) }
      {%- else %}tableData={_isEmpty(state.data) ? state.{{content.name}}.data : state.data}{% endif %}
      loaded={state.{{content.name}}.loaded}
      pageTitle={'{{content.page_title if content.page_title else content.name}}'}
      {% if content.action_buttons_list %}actionButtons={getActionButtons()}{% endif %}
      displayPagination={ {{ content.display_pagination if content.display_pagination else 'false' }} }
    />
    {%- for child_component in child_components %}
    <{{ child_component }} onAction={onAction} state={state} />
    {%- endfor %}
  </div>;
};

{{content.name}}.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default {{content.name}};
