import { combineReducers } from 'redux';
import {INITIAL_SNACKBAR_DATA} from 'atoms/snackbar/helpers';
import snackbarReducer, {SNACKBAR_ACTION_TYPES} from 'compiled_helpers/common/snackbarReducer';
import loaderReducer, {INITIAL_LOADER_DATA, LOADER_ACTION_TYPES}  from 'compiled_helpers/common/globalLoaderReducer';


// TODO: import snackbar actions and reducer and merge them
import helperFns from 'compiled_helpers/Notification/NotificationHelper';

export const ACTION_TYPES = {
  DATA_LOAD: "DATA_LOAD",
  DATA_LOAD_SUCCEEDED: "DATA_LOAD_SUCCEEDED",
  OPEN_DischargeDialog: "OPEN_DischargeDialog",
  CLOSE_DischargeDialog: "CLOSE_DischargeDialog",
  DISCHARGE_PATIENT_SUMMARY_LOAD_SUCCEEDED: "DISCHARGE_PATIENT_SUMMARY_LOAD_SUCCEEDED",
  DISCHARGE_PATIENT_SUBMIT: "DISCHARGE_PATIENT_SUBMIT",
  OPEN_EditDialog: "OPEN_EditDialog",
  CLOSE_EditDialog: "CLOSE_EditDialog",
  EDIT_PATIENT_SUBMIT: "EDIT_PATIENT_SUBMIT",
  OPEN_ChangeRoomDialog: "OPEN_ChangeRoomDialog",
  CLOSE_ChangeRoomDialog: "CLOSE_ChangeRoomDialog",
  CHANGEROOM_SUBMIT: "CHANGEROOM_SUBMIT",

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
        successActionType: [ACTION_TYPES.DATA_LOAD_SUCCEEDED,ACTION_TYPES.HIDE_GLOBAL_LOADER,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
  [ACTION_TYPES.OPEN_DischargeDialog]: (payload, {dispatch}) => {
    helperFns.actionHandlerUtils.patientChargesDataloadFn(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.DISCHARGE_PATIENT_SUMMARY_LOAD_SUCCEEDED,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
  [ACTION_TYPES.DISCHARGE_PATIENT_SUBMIT]: (payload, {dispatch}) => {
    helperFns.actionHandlerUtils.dischargePatientSubmitFn(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.ON_SNACKBAR_SUCCESS_ACTION,ACTION_TYPES.PAGE_RESET,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
  [ACTION_TYPES.OPEN_EditDialog]: (payload, {dispatch}) => {
    helperFns.actionHandlerUtils.patientChargesDataloadFn(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.DISCHARGE_PATIENT_SUMMARY_LOAD_SUCCEEDED,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
  [ACTION_TYPES.EDIT_PATIENT_SUBMIT]: (payload, {dispatch}) => {
    helperFns.actionHandlerUtils.editPatientSubmitFn(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.ON_SNACKBAR_SUCCESS_ACTION,ACTION_TYPES.PAGE_RESET,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
  [ACTION_TYPES.CHANGEROOM_SUBMIT]: (payload, {dispatch}) => {
    helperFns.actionHandlerUtils.changeRoomSubmitFn(
      payload, {dispatch}, {
        successActionType: [ACTION_TYPES.ON_SNACKBAR_SUCCESS_ACTION,ACTION_TYPES.PAGE_RESET,],
        failureActionType: [ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION,],
      }
    )},
}


function baseReducer(state = {...INITIAL_APP_STATE}, action) {
  switch (action.type) {
  
  case ACTION_TYPES.DATA_LOAD: return helperFns.actionTypesUtils.dataloadFn(state, action);
  case ACTION_TYPES.DATA_LOAD_SUCCEEDED: return helperFns.actionTypesUtils.dataloadSuccessFn(state, action);
  case ACTION_TYPES.DISCHARGE_PATIENT_SUMMARY_LOAD_SUCCEEDED: return helperFns.actionTypesUtils.patientChargesLoadSuccessFn(state, action);
  
  case ACTION_TYPES.OPEN_DischargeDialog:
    return {
      ...state,
      DischargeDialog: {
        ...state.DischargeDialog,
        isOpen: true,
        editObj: action.payload.editObj,
      },
    };
  case ACTION_TYPES.CLOSE_DischargeDialog:
    return {
      ...state,
      DischargeDialog: {
        ...state.DischargeDialog,
        isOpen: false,
      },
    };
  case ACTION_TYPES.OPEN_EditDialog:
    return {
      ...state,
      EditDialog: {
        ...state.EditDialog,
        isOpen: true,
        editObj: action.payload.editObj,
      },
    };
  case ACTION_TYPES.CLOSE_EditDialog:
    return {
      ...state,
      EditDialog: {
        ...state.EditDialog,
        isOpen: false,
      },
    };
  case ACTION_TYPES.OPEN_ChangeRoomDialog:
    return {
      ...state,
      ChangeRoomDialog: {
        ...state.ChangeRoomDialog,
        isOpen: true,
        editObj: action.payload.editObj,
      },
    };
  case ACTION_TYPES.CLOSE_ChangeRoomDialog:
    return {
      ...state,
      ChangeRoomDialog: {
        ...state.ChangeRoomDialog,
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