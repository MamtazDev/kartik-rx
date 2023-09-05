// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseTableView.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import TableView from 'components/Table/Table';
import {ACTION_TYPES} from '../reducer';


import SummaryDialog from 'compiled/NotificationDischargedPatient/subcomponents/SummaryDialog';
import helperFns from 'compiled_helpers/Notification/DischargePatientHelper';

const columns = [
  { id: 'admDate', label: 'Adm Date', align: 'center'},
  { id: 'disDate', label: 'Discharged Date', align: 'center'},
  { id: 'discharge_ip.ipno', label: 'IP No.', align: 'center'},
  { id: 'mrno', label: 'MR No.', align: 'center'},
  { id: 'name', label: 'Name', align: 'center'},
  { id: 'gender', label: 'Gender', align: 'center'},
  { id: 'phone', label: 'Phone', align: 'center'},
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const DischargedList = (props) => {
  const {onAction, state} = props;
  const { classes } = useStyles();

  const getActionButtons = () => {
    return [
      {'label': 'Summary', 'onClick': onViewSummaryClickFn, 'action_type': ['OPEN_SummaryDialog', 'SUMMARY_TABLE_INIT']},
    ];
  };

  const onViewSummaryClickFn = (editObj) => {
    onAction({
      type: [ACTION_TYPES.OPEN_SummaryDialog,ACTION_TYPES.SUMMARY_TABLE_INIT,],
      payload: {
        editObj
      },
    });
  };

  useEffect(() => {
    // setTableData();
    if(!state.DischargedList.loaded) {
      onAction({
        type: [ACTION_TYPES.DATA_LOAD,],
        payload: {
          ...state.DischargedList
        },
      });
    }
  }, [state.DischargedList.loaded]);

  return <div className={classes.root}>
    <TableView
      columns={columns}
      tableData={ helperFns.prepareRowsFn(state) }
      loaded={state.DischargedList.loaded}
      pageTitle={'Discharged IP Patients (Today)'}
      actionButtons={getActionButtons()}
    />
    <SummaryDialog onAction={onAction} state={state} />
  </div>;
};

DischargedList.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default DischargedList;