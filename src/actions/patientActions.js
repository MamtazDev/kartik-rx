export const NEW_PATIENT_CREATE = 'NEW_PATIENT_CREATE';
export const NEW_PATIENT_CREATE_FAILED = 'NEW_PATIENT_CREATE_FAILED';
export const NEW_PATIENT_CREATE_SUCCEEDED = 'NEW_PATIENT_CREATE_SUCCEEDED';

export const createNewUser = (payload) => (dispatch) => {
  dispatch({
    type: NEW_PATIENT_CREATE,
  });
};