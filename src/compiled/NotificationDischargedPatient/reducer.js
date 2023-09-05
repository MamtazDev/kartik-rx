import { combineReducers } from 'redux';
import {INITIAL_SNACKBAR_DATA} from 'atoms/snackbar/helpers';
import snackbarReducer, {SNACKBAR_ACTION_TYPES} from 'compiled_helpers/common/snackbarReducer';
import loaderReducer, {INITIAL_LOADER_DATA, LOADER_ACTION_TYPES}  from 'compiled_helpers/common/globalLoaderReducer';


// TODO: import snackbar actions and reducer and merge them
import helperFns from 'compiled_helpers/Notification/DischargePatientHelper';

export const ACTION_TYPES = {
  DATA_LOAD: "DATA_LOAD",
  DATA_LOAD_SUCCEEDED: "DATA_LOAD_SUCCEEDED",
  SUMMARY_TABLE_INIT: "SUMMARY_TABLE_INIT",
  SUMMARY_DATA_LOAD: "SUMMARY_DATA_LOAD",
  SUMMARY_DATA_LOAD_SUCCEEDED: "SUMMARY_DATA_LOAD_SUCCEEDED",
  OPEN_SummaryDialog: "OPEN_SummaryDialog",
  CLOSE_SummaryDialog: "CLOSE_SummaryDialog",

  PAGE_RESET: "PAGE_RESET",
  ...SNACKBAR_ACTION_TYPES,
  ...LOADER_ACTION_TYPES,
};


const INITIAL_APP_STATE = {
  loaded: false,
  pageReset: 0,
  ...helperFns.INITIAL_STATE,
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
        successActionType: [ACTION_TYPES.DATA_LOAD_SUCCEEDED,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
  [ACTION_TYPES.SUMMARY_DATA_LOAD]: (payload, {dispatch}) => {
    helperFns.actionHandlerUtils.getDischargeSummaryData(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.SUMMARY_DATA_LOAD_SUCCEEDED,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
}


function baseReducer(state = {...INITIAL_APP_STATE}, action) {
  switch (action.type) {
  
  case ACTION_TYPES.DATA_LOAD: return helperFns.actionTypesUtils.dataloadFn(state, action);
  case ACTION_TYPES.DATA_LOAD_SUCCEEDED: return helperFns.actionTypesUtils.dataloadSuccessFn(state, action);
  case ACTION_TYPES.SUMMARY_TABLE_INIT: return helperFns.actionTypesUtils.dischargeSummaryDataloadFn(state, action);
  case ACTION_TYPES.SUMMARY_DATA_LOAD_SUCCEEDED: return helperFns.actionTypesUtils.dischargeSummaryDataloadSuccessFn(state, action);
  
  case ACTION_TYPES.OPEN_SummaryDialog:
    return {
      ...state,
      SummaryDialog: {
        ...state.SummaryDialog,
        isOpen: true,
        editObj: action.payload.editObj,
      },
    };
  case ACTION_TYPES.CLOSE_SummaryDialog:
    return {
      ...state,
      SummaryDialog: {
        ...state.SummaryDialog,
        isOpen: false,
      },
    };

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