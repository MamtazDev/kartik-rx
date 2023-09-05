import {SNACKBAR_TYPES} from 'atoms/snackbar/helpers';

export const ACTION_TYPES = {
  ON_RECORDINGS_SNACKBAR_ACTION: 'ON_RECORDINGS_SNACKBAR_ACTION',

  LOAD_USER: 'LOAD_USER',
  LOAD_USER_SUCCEEDED: 'LOAD_USER_SUCCEEDED',
  LOAD_USER_FAILED: 'LOAD_USER_FAILED',

  EDIT_USER: 'EDIT_USER',
  EDIT_USER_SUCCEEDED: 'EDIT_USER_SUCCEEDED',
  EDIT_USER_FAILED: 'EDIT_USER_FAILED',

  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCEEDED: 'CHANGE_PASSWORD_SUCCEEDED',
  CHANGE_PASSWORD_FAILED: 'CHANGE_PASSWORD_FAILED'
};

export const INITIAL_STATE = {
  isSaving: false,
  isSaveProfileSuccess: false,
  isOpenSnackbar: false,
  snackbarType: '',
  snackbarMessage: ''
};

function accountSettingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTION_TYPES.ON_RECORDINGS_SNACKBAR_ACTION:
    return {
      ...state,
      isOpenSnackbar: action.payload.isOpen
    };
  case ACTION_TYPES.LOAD_USER:
    return {
      ...state,
      currentUser: {},
    };
  case ACTION_TYPES.LOAD_USER_SUCCEEDED:
    return {
      ...state,
      loaded: true,
      currentUser: action.payload.currentUser,
    };
  case ACTION_TYPES.LOAD_USER_FAILED:
    return {
      ...state,
      loaded: true,
      isOpenSnackbar: true,
      snackbarType: SNACKBAR_TYPES.ERROR,
      snackbarMessage: action.payload.message
    };
  case ACTION_TYPES.EDIT_USER:
    return {
      ...state,
      isSaving: true,
      isOpenSnackbar: true,
      isSaveProfileSuccess: false,
      snackbarType: SNACKBAR_TYPES.INFO,
      snackbarMessage: 'Updating info...'
    };
  case ACTION_TYPES.EDIT_USER_SUCCEEDED:
    return {
      ...state,
      isSaving: false,
      isSaveProfileSuccess: true,
      isOpenSnackbar: true,
      snackbarType: SNACKBAR_TYPES.SUCCESS,
      snackbarMessage: action.payload.message
    };
  case ACTION_TYPES.EDIT_USER_FAILED:
    return {
      ...state,
      isSaving: false,
      isSaveProfileSuccess: false,
      isOpenSnackbar: true,
      snackbarType: SNACKBAR_TYPES.ERROR,
      snackbarMessage: action.payload.message
    };
  case ACTION_TYPES.CHANGE_PASSWORD:
    return {
      ...state,
      isSaving: true,
      isOpenSnackbar: true,
      snackbarType: SNACKBAR_TYPES.INFO,
      snackbarMessage: 'Changing password...'
    };
  case ACTION_TYPES.CHANGE_PASSWORD_SUCCEEDED:
    return {
      ...state,
      isSaving: false,
      isOpenSnackbar: true,
      snackbarType: SNACKBAR_TYPES.SUCCESS,
      snackbarMessage: action.payload.message
    };
  case ACTION_TYPES.CHANGE_PASSWORD_FAILED:
    return {
      ...state,
      isSaving: false,
      isOpenSnackbar: true,
      snackbarType: SNACKBAR_TYPES.ERROR,
      snackbarMessage: action.payload.message
    };
  default:
    return state;
  }
}

export default accountSettingsReducer;