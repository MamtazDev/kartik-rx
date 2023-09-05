import * as actionTypes from 'actions';

const initialState = {
  isCreatingNewPatient: false,
  failureMessage: ''
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {

  // Login
  case actionTypes.NEW_PATIENT_CREATE: {
    return {
      failureMessage: '',
      isCreatingNewPatient: true,
    };
  }

  case actionTypes.NEW_PATIENT_CREATE_SUCCEEDED: {
    return {
      ...state,
      isCreatingNewPatient: false,
    };
  }

  case actionTypes.NEW_PATIENT_CREATE_FAILED: {
    return {
      ...state,
      isCreatingNewPatient: false,
      failureMessage: 'Patient Creation failed'
    };
  }

  default: {
    return state;
  }
  }
};

export default patientReducer;
