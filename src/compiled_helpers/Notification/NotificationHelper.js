import {timestampToAppDateTime} from 'utils/time';
import {patientName} from 'utils/patient';
import _map from 'lodash/map';
import addPatientHelperFns from 'compiled_helpers/NotificationAddPatient/helper';
import reducerHelper from './reducerHelper';
import moment from 'moment';


export const prepareRowsFn = (state) => {
  if(!state.InRoomList.data)
    return [];

  return _map(state.InRoomList.data, patient_ip => (
    {
      ...patient_ip,
      ...patient_ip.patient,
      admDate: timestampToAppDateTime(patient_ip.admitted_at),
      name: patientName(patient_ip.patient),
      roomNameDisp: patient_ip.assigned_room ? patient_ip.assigned_room.name + ` (${patient_ip.assigned_room.type})` : '',
      editObj: {
        ...patient_ip.patient,
        ip: patient_ip,
      },
    }
  ));
};

const roomNamesFromDialogStateFn = (formData) => (formData.roomData);

const onDiscountChangeFn = (control, setValue) => {
  let details = control._formValues.dischargeDetails;
  const finalAmount = details.total_amount - details.discount;
  setValue('dischargeDetails.final_amount', `${finalAmount} (${details.total_amount} - ${details.discount})`);
};

const dischargeEditPresubmitDataProcessFn = (state, pageFormData) => {
  if(state.EditDialog.isOpen) {
    return {
      ipid: state.EditDialogDetails.editObj.ip.id,
      data: _map(pageFormData.data, (el) => ({
        ...el,
        startdate: el.startdate.unix(),
        enddate: el.startdate.unix(),
      })),
    };
  } else {
    return {
      ipid: state.DischargeDialogDetails.editObj.ip.id,
      ...pageFormData.dischargeDetails,
    };
  }
};

const changeRoomPresubmitDataProcessFn = (state, pageFormData) => {
  return {
    data: {
      ipid: state.ChangeRoomDialog.editObj.ip.id,
      dest_room_id: pageFormData.room.id,
    }
  };
};

const preparePatientChargesEditData = (data) => {
  return _map(data, charge => {
    let startdate = moment.unix(charge.startdate).startOf('day');
    let enddate;

    if(!charge.enddate)
      enddate = moment().startOf('day');
    else
      enddate = moment.unix(charge.enddate).startOf('day');
    
    addPatientHelperFns.roomApiRequestProcessorFn([charge.room]);

    return {
      startdate,
      enddate,
      room_id: charge.room.id,
      room_log_id: charge.room_log_id,
    };
  });
};

const INITIAL_STATE = {
  data: [],
  InRoomList: {loaded: false,},

  DischargeDialog: {isOpen: false,},
  DischargeDialogDetails: {
    dischargeDetails: {billno: '', discount: 0, room_amount: 0, doctor_amount: 0, total_amount: 0, final_amount: 0},
  },

  EditDialog: {isOpen: false,},
  EditDialogDetails: {
    formType: 'array',
    rowCount: 0,
    fieldsParent: 'data',
    data: [],
  },

  ChangeRoomDialog: { isOpen: false, editObj: {}, },

  ChangeRoom: {room: {name: '', type: ''}},
};

const prepareDischargeDialogDetails = (data) => {
  let roomFee = 0;
  let doctorFee = 0;

  _map(data, charge => {
    let startdate = moment.unix(charge.startdate).startOf('day');
    let enddate;

    if(!charge.enddate)
      enddate = moment().startOf('day');
    else
      enddate = moment.unix(charge.enddate).startOf('day');

    let daysDiff = enddate.diff(startdate, 'days');

    roomFee += charge.room_amount * daysDiff;
    doctorFee += charge.doctor_amount * daysDiff;
  });

  let totalAmount = roomFee + doctorFee;

  return {
    room_amount: roomFee,
    doctor_amount: doctorFee,
    total_amount: totalAmount,
    final_amount: `${totalAmount} (${totalAmount} - 0)`,
  };
};

const actionTypesUtils = {
  dataloadFn: (state, action) => {return {...state, InRoomList: {...state.InRoomList, loaded: false} };},
  dataloadSuccessFn: (state, action) => {return {...state, InRoomList: {...state.InRoomList, loaded: true, data: action.payload.data} };},

  patientChargesLoadSuccessFn: (state, action) => {
    return {
      ...state,
      DischargeDialogDetails: {
        ...state.DischargeDialogDetails,
        editObj: state.DischargeDialog.editObj,
        data: action.payload.data,
        dischargeDetails: {
          ...state.DischargeDialogDetails.dischargeDetails,
          ...prepareDischargeDialogDetails(action.payload.data),
        },
      },
      EditDialogDetails: {
        ...state.EditDialogDetails,
        editObj: state.EditDialog.editObj,
        rowCount: action.payload.data.length,
        data: preparePatientChargesEditData(action.payload.data),
        roomData: addPatientHelperFns.roomApiRequestProcessorFn(action.payload.roomData),
      },
    };
  },
  dischargePatientSuccessFn: (state, action) => {
    return {...state, loaded: false, DischargeDialog: {...state.DischargeDialog, isOpen: false}};
  },
};

const actionHandlerUtils = {
  dataloadFn: reducerHelper.getActivePatientsData,
  changeRoomSubmitFn: reducerHelper.submitPatientsRoomChange,
  dischargePatientSubmitFn: reducerHelper.submitDischargePatient,
  patientChargesDataloadFn: reducerHelper.patientChargesDataloadFn,
  editPatientSubmitFn: reducerHelper.editPatientSubmitFn,
};

export default {
  prepareRowsFn,
  changeRoomPresubmitDataProcessFn,
  dischargeEditPresubmitDataProcessFn,
  onDiscountChangeFn,
  roomNamesFromDialogStateFn,

  actionTypesUtils,
  actionHandlerUtils,
  INITIAL_STATE,
};
