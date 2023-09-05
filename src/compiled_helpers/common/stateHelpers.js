import {getSnackbarErrorObj} from 'atoms/snackbar/helpers';

const failureSnackbarFn = (state, action) => {return {...state, snackbarData: getSnackbarErrorObj(action.payload.message)};};

export default {
  failureSnackbarFn,
};