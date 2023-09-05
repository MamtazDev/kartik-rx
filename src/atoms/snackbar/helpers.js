
export const SNACKBAR_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const INITIAL_SNACKBAR_DATA = {
  isOpen: false,
  type: SNACKBAR_TYPES.INFO,
  message: '',
};

export const getSnackbarErrorObj = (message) => {
  return {
    isOpen: true,
    type: SNACKBAR_TYPES.ERROR,
    message: message,
  };
};

export const getSnackbarInfoObj = (message) => {
  return {
    isOpen: true,
    type: SNACKBAR_TYPES.INFO,
    message: message,
  };
};
