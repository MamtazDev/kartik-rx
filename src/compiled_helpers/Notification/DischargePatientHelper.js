import {timestampToAppDateTime} from 'utils/time';
import {patientName} from 'utils/patient';
import _map from 'lodash/map';
import reducerHelper from './reducerHelper';
import moment from 'moment';


export const prepareRowsFn = (state) => {
  if(!state.DischargedList.data)
    return [];

  return _map(state.DischargedList.data, patient => (
    {
      ...patient,
      admDate: timestampToAppDateTime(patient.discharge_ip.admitted_at),
      disDate: timestampToAppDateTime(patient.discharge_ip.discharged_at),
      name: patientName(patient),
      // roomNameDisp: patient.assigned_room.name + ` (${patient.assigned_room.type})`,
      editObj: patient,
    }
  ));
};

export const dischargeFn = () => {
  
};

const prepareSummaryTableRowsFn = (state) => {
  if(!state.SummaryTable.data)
    return [];

  return [
    {type: 'Bill No.', amount: state.SummaryTable.data.billno,},
    {type: 'Room Fee', amount: state.SummaryTable.data.room_amount,},
    {type: 'Doctor Fee', amount: state.SummaryTable.data.doctor_amount,},
    {type: 'Discount', amount: state.SummaryTable.data.discount,},
    {type: 'Total', amount: state.SummaryTable.data.total_amount,},
  ];
};

const INITIAL_STATE = {
  data: [],
  loaded: false,
  SummaryDialog: {
    isOpen: false,
  },
  SummaryTable: {
    loaded: false,
  },
  DischargedList: {
    loaded: false,
  },
  RoomSelect: {room: {name: '', type: ''}},
};


const actionTypesUtils = {
  dataloadFn: (state, action) => {return {...state, DischargedList: {...state.DischargedList, loaded: false} };},
  dataloadSuccessFn: (state, action) => {return {...state, DischargedList: {...state.DischargedList, loaded: true, data: action.payload.data}};},

  dischargeSummaryDataloadFn: (state, action) => {return {...state, SummaryTable: {...state.SummaryTable, loaded: false, editObj: action.payload.editObj}};},
  dischargeSummaryDataloadSuccessFn: (state, action) => {return {...state, SummaryTable: {...state.SummaryTable, loaded: true, data: action.payload.data}};},

  changeRoomDialogOpenFn: (state, action) => {return {...state, ChangeRoom: {...state.ChangeRoom, isOpen: true}};},
  changeRoomDialogCloseFn: (state, action) => {return {...state, ChangeRoom: {...state.ChangeRoom, isOpen: false}};},
};

const actionHandlerUtils = {
  dataloadFn: reducerHelper.getDischargedPatientsData,
  getDischargeSummaryData: reducerHelper.getDischargeSummaryData,
};


export default {
  dischargeFn,
  prepareRowsFn,
  prepareSummaryTableRowsFn,

  actionTypesUtils,
  actionHandlerUtils,
  INITIAL_STATE,
};