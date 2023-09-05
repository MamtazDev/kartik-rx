import { doctorName } from 'utils/patient';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _get from 'lodash/get';
import { getSnackbarErrorObj, INITIAL_SNACKBAR_DATA } from 'atoms/snackbar/helpers';
import { axiosInstance } from 'actions/helpers';
import { axiosGetCommon, axiosPostCommon } from 'utils/helpers/fetchHelper';
import { timestampToAppDateTime } from 'utils/time';
import moment from 'moment';


const presubmit_data_process = (state, pageFormData) => {
  return {
    ...state,
    Search: {
      ...state.Search,
      ...{
        date_from: typeof (pageFormData.date_from) === 'number' ? pageFormData.date_from : pageFormData.date_from.valueOf(),
        date_to: typeof (pageFormData.date_to) === 'number' ? pageFormData.date_to : pageFormData.date_to.valueOf(),
      }
    },
  };
};

export const prepareRowsFn = (state) => {
  if (!state.ProcessTestsList.data)
    return [];

  return _map(state.ProcessTestsList.data, patient => (
    {
      ...patient,
      date: timestampToAppDateTime(patient.created_time),
      editObj: patient,
    }
  ));
};

const prepareSummaryTableRowsFn = (state) => (state.SummaryTable.data);

const INITIAL_STATE = ({ cancelled_only }) => ({
  Search: {
    date_from: moment.now(),
    date_to: moment.now(),
    cancelled_only: cancelled_only,
  },
  ProcessTestsList: {
    loaded: false,
  },
  CancelledTestsList: {
    loaded: false,
  },
  SummaryDialog: {
    isOpen: false,
  },
});

const handleProcessTestClickFn = (editObj) => {
  window.location.href = `/Processtests/details/${editObj.bill_id}`;
};

const dataloadFn = (payload, { dispatch }, actionTypes) => {
  axiosGetCommon(
    '/labReports/summary',
    { ...payload.Search },
    { type: actionTypes.successActionType },
    { type: actionTypes.failureActionType },
    { dispatch },
  );
};

const getCancelledTestData = (payload, { dispatch }, actionTypes) => {
  axiosGetCommon(
    `/labReports/cancelled_reports/${payload.editObj.bill_id}`,
    {},
    { type: actionTypes.successActionType },
    { type: actionTypes.failureActionType },
    { dispatch },
  );
};


const actionTypesUtils = {
  dataloadFn: (state, action) => { return { ...state, ProcessTestsList: { ...state.ProcessTestsList, loaded: false }, CancelledTestsList: { ...state.CancelledTestsList, loaded: false } }; },
  dataloadSuccessFn: (state, action) => { return { ...state, ProcessTestsList: { ...state.ProcessTestsList, loaded: true, data: action.payload.data }, CancelledTestsList: { ...state.CancelledTestsList, loaded: true, data: action.payload.data } }; },

  cancelledTestDataloadFn: (state, action) => { return { ...state, SummaryTable: { ...state.SummaryTable, loaded: false, editObj: action.payload.editObj } }; },
  cancelledTestDataloadSuccessFn: (state, action) => { return { ...state, SummaryTable: { ...state.SummaryTable, loaded: true, data: action.payload.data } }; },
};

const actionHandlerUtils = {
  dataloadFn,
  getCancelledTestData,
};

export default {
  handleProcessTestClickFn,
  prepareRowsFn,
  presubmit_data_process,
  prepareSummaryTableRowsFn,

  actionTypesUtils,
  actionHandlerUtils,

  INITIAL_STATE,
};
