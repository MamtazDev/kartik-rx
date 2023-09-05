import { combineReducers } from 'redux';
import {INITIAL_SNACKBAR_DATA} from 'atoms/snackbar/helpers';
import snackbarReducer, {SNACKBAR_ACTION_TYPES} from 'compiled_helpers/common/snackbarReducer';
import loaderReducer, {INITIAL_LOADER_DATA, LOADER_ACTION_TYPES}  from 'compiled_helpers/common/globalLoaderReducer';


// TODO: import snackbar actions and reducer and merge them
import addPatientHelperFns from 'compiled_helpers/NotificationAddPatient/helper';

export const ACTION_TYPES = {
  ADD_PATIENT_SUBMIT: "ADD_PATIENT_SUBMIT",
  ADD_PATIENT_SUBMIT_SUCCEEDED: "ADD_PATIENT_SUBMIT_SUCCEEDED",
  RESET_PATIENT_FORM: "RESET_PATIENT_FORM",

  PAGE_RESET: "PAGE_RESET",
  ...SNACKBAR_ACTION_TYPES,
  ...LOADER_ACTION_TYPES,
};


const INITIAL_APP_STATE = {
  loaded: false,
  pageReset: 0,
  ...addPatientHelperFns.INITIAL_STATE,
};

export const INITIAL_STATE = {
  app: {...INITIAL_APP_STATE},
  snackbar: {...INITIAL_SNACKBAR_DATA},
  globalLoader: {...INITIAL_LOADER_DATA}
}


export const actionHandlersMap = {
  [ACTION_TYPES.ADD_PATIENT_SUBMIT]: (payload, {dispatch}) => {
    addPatientHelperFns.actionHandlerUtils.addPatientSubmitFn(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.PAGE_RESET,ACTION_TYPES.ON_SNACKBAR_SUCCESS_ACTION,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
}


function baseReducer(state = {...INITIAL_APP_STATE}, action) {
  switch (action.type) {
  
  case ACTION_TYPES.ADD_PATIENT_SUBMIT_SUCCEEDED: return addPatientHelperFns.actionTypesUtils.addPatientSubmitSuccessFn(state, action);
  case ACTION_TYPES.RESET_PATIENT_FORM: return addPatientHelperFns.actionTypesUtils.resetPatientForm(state, action);
  

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