import {getSnackbarErrorObj, getSnackbarInfoObj, INITIAL_SNACKBAR_DATA} from 'atoms/snackbar/helpers';

export const SNACKBAR_ACTION_TYPES = {
  ON_SNACKBAR_SUCCESS_ACTION: 'ON_SNACKBAR_SUCCESS_ACTION',
  ON_SNACKBAR_ERROR_ACTION: 'ON_SNACKBAR_ERROR_ACTION',
  ON_SNACKBAR_CLOSE_ACTION: 'ON_SNACKBAR_CLOSE_ACTION',
};


const snackbarReducer = (state = {...INITIAL_SNACKBAR_DATA}, action) => {
  switch (action.type) {
  
  case SNACKBAR_ACTION_TYPES.ON_SNACKBAR_SUCCESS_ACTION:
    return {
      ...state,
      ...getSnackbarInfoObj(action.payload.message ? action.payload.message : 'Success!')
    };
  case SNACKBAR_ACTION_TYPES.ON_SNACKBAR_ERROR_ACTION:
    return {
      ...state,
      ...getSnackbarErrorObj(action.payload.message)
    };
  case SNACKBAR_ACTION_TYPES.ON_SNACKBAR_CLOSE_ACTION:
    return {
      ...state,
      isOpen: false,
    };
  default:
    return state;
  }
};

export default snackbarReducer;