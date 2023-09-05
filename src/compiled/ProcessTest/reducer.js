import { combineReducers } from 'redux';
import {INITIAL_SNACKBAR_DATA} from 'atoms/snackbar/helpers';
import snackbarReducer, {SNACKBAR_ACTION_TYPES} from 'compiled_helpers/common/snackbarReducer';
import loaderReducer, {INITIAL_LOADER_DATA, LOADER_ACTION_TYPES}  from 'compiled_helpers/common/globalLoaderReducer';


// TODO: import snackbar actions and reducer and merge them
import helperFns from 'compiled_helpers/ProcessTests/helper';

export const ACTION_TYPES = {
  DATA_LOAD: "DATA_LOAD",
  DATA_LOAD_SUCCEEDED: "DATA_LOAD_SUCCEEDED",
  ON_SEARCH_DATA_LOAD: "ON_SEARCH_DATA_LOAD",

  PAGE_RESET: "PAGE_RESET",
  ...SNACKBAR_ACTION_TYPES,
  ...LOADER_ACTION_TYPES,
};


const INITIAL_APP_STATE = {
  loaded: false,
  pageReset: 0,
  ...helperFns.INITIAL_STATE({cancelled_only: false}),
};

export const INITIAL_STATE = {
  app: {...INITIAL_APP_STATE},
  snackbar: {...INITIAL_SNACKBAR_DATA},
  globalLoader: {...INITIAL_LOADER_DATA}
}


export const actionHandlersMap = {
  [ACTION_TYPES.DATA_LOAD]: (payload, {dispatch}) => {
    helperFns.actionHandlerUtils.dataloadFn(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.DATA_LOAD_SUCCEEDED,ACTION_TYPES.HIDE_GLOBAL_LOADER,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
  [ACTION_TYPES.ON_SEARCH_DATA_LOAD]: (payload, {dispatch}) => {
    helperFns.actionHandlerUtils.dataloadFn(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.DATA_LOAD_SUCCEEDED,ACTION_TYPES.HIDE_GLOBAL_LOADER,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
}


function baseReducer(state = {...INITIAL_APP_STATE}, action) {
  switch (action.type) {
  
  case ACTION_TYPES.DATA_LOAD: return helperFns.actionTypesUtils.dataloadFn(state, action);
  case ACTION_TYPES.DATA_LOAD_SUCCEEDED: return helperFns.actionTypesUtils.dataloadSuccessFn(state, action);
  

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