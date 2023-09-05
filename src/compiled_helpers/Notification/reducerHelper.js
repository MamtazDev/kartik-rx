import { axiosInstance } from 'actions/helpers';
import {axiosGetCommon, axiosPostCommon} from 'utils/helpers/fetchHelper';

const getActivePatientsData = (payload, {dispatch}, actionTypes) => {
  axiosGetCommon(
    '/notifications/active_patients',
    {},
    {type: actionTypes.successActionType },
    {type: actionTypes.failureActionType },
    { dispatch },
  );
};

const getDischargedPatientsData = (payload, {dispatch}, actionTypes) => {
  axiosGetCommon(
    '/notifications/discharged_patients',
    {},
    {type: actionTypes.successActionType },
    {type: actionTypes.failureActionType },
    { dispatch },
  );
};

const submitPatientsRoomChange = (payload, {dispatch}, actionTypes) => {
  axiosPostCommon(
    `/notifications/change_patient_room/${payload.data.ipid}`,
    {room_id: payload.data.dest_room_id},
    {type: actionTypes.successActionType },
    {type: actionTypes.failureActionType },
    { dispatch },
  );
};

const submitDischargePatient = (payload, {dispatch}, actionTypes) => {
  axiosPostCommon(
    `/notifications/discharge_patient/${payload.ipid}`,
    {...payload},
    {type: actionTypes.successActionType },
    {type: actionTypes.failureActionType },
    { dispatch },
  );
};

const patientChargesDataloadFn = (payload, {dispatch}, actionTypes) => {
  let id = payload.editObj.discharge_ip ? payload.editObj.discharge_ip.id : payload.editObj.ip.id;
  axiosInstance.get('/rooms/all_active').then(res => {
    axiosGetCommon(
      `/notifications/patient_charges/${id}`,
      {},
      {type: actionTypes.successActionType, payload: {roomData: res.data}},
      {type: actionTypes.failureActionType },
      { dispatch },
    );
  });
};

const editPatientSubmitFn = (payload, {dispatch}, actionTypes) => {
  axiosPostCommon(
    `/notifications/update_patient_history/${payload.ipid}`,
    {data: payload.data},
    {type: actionTypes.successActionType },
    {type: actionTypes.failureActionType },
    { dispatch },
  );
};

const getDischargeSummaryData = (payload, {dispatch}, actionTypes) => {
  axiosGetCommon(
    `/notifications/discharged_patient_summary/${payload.editObj.discharge_ip.id}`,
    {},
    {type: actionTypes.successActionType },
    {type: actionTypes.failureActionType },
    { dispatch },
  );
};

export default {
  getActivePatientsData,
  getDischargedPatientsData,
  submitPatientsRoomChange,
  submitDischargePatient,
  patientChargesDataloadFn,
  editPatientSubmitFn,
  getDischargeSummaryData,
};