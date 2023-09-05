import { combineReducers } from 'redux';
import {INITIAL_SNACKBAR_DATA} from 'atoms/snackbar/helpers';
import snackbarReducer, {SNACKBAR_ACTION_TYPES} from 'compiled_helpers/common/snackbarReducer';
import loaderReducer, {INITIAL_LOADER_DATA, LOADER_ACTION_TYPES}  from 'compiled_helpers/common/globalLoaderReducer';

{% import 'common.macros' as common_macros %}
// TODO: import snackbar actions and reducer and merge them

{%- for js_header in additional_imports %}
{{ js_header }}
{%- endfor %}

export const ACTION_TYPES = {
  {%- if content.action_types %}{%- for action_type in content.action_types.keys() %}
  {{ action_type }}: "{{action_type}}",
  {%- endfor %}{% endif %}

  PAGE_RESET: "PAGE_RESET",
  ...SNACKBAR_ACTION_TYPES,
  ...LOADER_ACTION_TYPES,
};


const INITIAL_APP_STATE = {
  loaded: false,
  pageReset: 0,
  {% if content.initial_state %}...{{content.initial_state}},{% endif %}
};

export const INITIAL_STATE = {
  app: {...INITIAL_APP_STATE},
  snackbar: {...INITIAL_SNACKBAR_DATA},
  globalLoader: {...INITIAL_LOADER_DATA}
}


export const actionHandlersMap = {
  {%- for action_type, action_values in content.action_types.items() %}
  {%- if action_values.action_handler_fn %}
  [ACTION_TYPES.{{ action_type }}]: (payload, {dispatch}) => {
    {{action_values.action_handler_fn.function}}(
      payload, {dispatch}, {
        successActionType: {{ common_macros.get_action_types(action_values.action_handler_fn.success_actiontype) }},
        failureActionType: {{ common_macros.get_action_types(action_values.action_handler_fn.failure_actiontype) }},
      }
    )},
  {%- endif %}
  {%- endfor %}
}


function baseReducer(state = {...INITIAL_APP_STATE}, action) {
  switch (action.type) {
  {% for action_type, action_values in content.action_types.items() %}
  {%- if action_values.prepare_state_fn %}
  case ACTION_TYPES.{{ action_type }}: return {{action_values.prepare_state_fn}}(state, action);
  {%- endif %}
  {%- endfor %}
  {% for action_type, action_values in content.action_types.items() %}
  {%- if action_type[:5] == 'OPEN_' and action_type[-6:] == 'Dialog' %}
  case ACTION_TYPES.{{ action_type }}:
    return {
      ...state,
      {{action_type[5:]}}: {
        ...state.{{action_type[5:]}},
        isOpen: true,
        editObj: action.payload.editObj,
      },
    };
  {%- elif action_type[:6] == 'CLOSE_' and action_type[-6:] == 'Dialog' %}
  case ACTION_TYPES.{{ action_type }}:
    return {
      ...state,
      {{action_type[6:]}}: {
        ...state.{{action_type[6:]}},
        isOpen: false,
      },
    };
  {%- endif %}
  {%- endfor %}

  case ACTION_TYPES.PAGE_RESET:
    return {...INITIAL_APP_STATE, pageReset: state.pageReset + 1};

  default:
    return state;
  }
}

const combinedReducer = combineReducers({
  app: baseReducer,
  snackbar: snackbarReducer,
  globalLoader: loaderReducer,
});

export default combinedReducer;