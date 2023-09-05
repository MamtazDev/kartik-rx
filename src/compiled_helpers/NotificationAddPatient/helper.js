import {doctorName} from 'utils/patient';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _get from 'lodash/get';
import {getSnackbarErrorObj, INITIAL_SNACKBAR_DATA} from 'atoms/snackbar/helpers';
import { axiosInstance } from 'actions/helpers';
import {axiosPostCommon} from 'utils/helpers/fetchHelper';

export const presubmit_data_process = (state, pageFormData) => {
  let selected_amount = 0;
  _map(pageFormData.api.data.registration_info.room_id, (room) => {
    if(room.data.id === pageFormData.registration_info.room_id)
      selected_amount = room.data.amount;
  });

  return {
    patient: {...state.Admission.patient, ...pageFormData.patient},
    doctor: {
      ...pageFormData.doctor,
      first_name: '',
      last_name: '',
    },
    registration_info: {
      ...pageFormData.registration_info,
      amount: selected_amount,
    },
  };
};

export const doctorsApiRequestProcessorFn = (data) => {
  return _map(data, el => ({ids: el.ids, key: el.ids, value: el.ids, displayValue: doctorName(el)}));
};

export const roomApiRequestProcessorFn = (data) => {
  return _map(data, el => ({data: el, key: el.id, value: el.id, displayValue: `${el.type} - ${el.name} (Rs. ${el.amount})`}));
};

const prepareRoomData = (data) => {
  let finalData = {};
  data.forEach(room => {
    if(finalData[room.type])
      finalData[room.type].push(room);
    else
      finalData[room.type] = [room];
  });

  return finalData;
};

export const roomNamesFromApiFn = (pageFormData) => {
  const roomData = _get(pageFormData, 'api.data.roomsavailable');
  if(roomData && pageFormData.room.type) {
    let processedData = prepareRoomData(roomData)[pageFormData.room.type];
    return _map(processedData, el => ({key: el.id, value: el.id, displayValue: `${el.name} - Rs. ${el.amount}`}));
  }
  return [];
};

const addPatientSubmitFn = (payload, {dispatch}, actionTypes) => {
  axiosPostCommon(
    '/notifications/add_patient',
    {...payload},
    {type: actionTypes.successActionType },
    {type: actionTypes.failureActionType },
    { dispatch },
  );
};

const INITIAL_STATE = {
  data: [],
  loaded: false,
  Admission: {
    patient: {
      first_name: '',
      doa: '',
      last_name: '',
      email: '',
      gender: 'O',
      dob: '',
      father_name: '',
      mother_name: '',
      address: '',
      city: '',
      phone: '',
    }, 
    doctor: {ids: ''},
    registration_info: {room_id: '', ipno: '', registration_type: 'IP'}
  },
};

const getDoctorsForAutocompleteFn = () => axiosInstance.get('/doctors/').then(res => doctorsApiRequestProcessorFn(res.data));
const getRoomsForAutocompleteFn = () => axiosInstance.get('/rooms/available').then(res => roomApiRequestProcessorFn(res.data));

const actionTypesUtils = {
  resetPatientForm: (state, action) => {return {...state, Admission: {...INITIAL_STATE.Admission}};},
};

const actionHandlerUtils = {
  addPatientSubmitFn,
};

export default {
  presubmit_data_process,
  doctorsApiRequestProcessorFn,
  roomApiRequestProcessorFn,
  prepareRoomData,
  roomNamesFromApiFn,
  getDoctorsForAutocompleteFn,
  getRoomsForAutocompleteFn,

  actionTypesUtils,
  actionHandlerUtils,
  INITIAL_STATE,
};
