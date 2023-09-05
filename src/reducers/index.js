import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import patientReducer from './patientReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  patient: patientReducer,
});

export default rootReducer;
