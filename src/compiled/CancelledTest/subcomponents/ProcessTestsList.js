// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseTableView.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import TableView from 'components/Table/Table';
import {ACTION_TYPES} from '../reducer';


import helperFns from 'compiled_helpers/ProcessTests/helper';

const columns = [
  { id: 'date', label: 'Adm Date', align: 'center'},
  { id: 'ip_id', label: 'IP No.', align: 'center'},
  { id: 'patient_id', label: 'MR No.', align: 'center'},
  { id: 'bill_id', label: 'Bill No.', align: 'center'},
  { id: 'patient_name', label: 'Patient Name', align: 'center'},
  { id: 'no_of_tests', label: 'No.of Test', align: 'center'},
  { id: 'no_of_test_completed', label: 'No.of Tests Processed', align: 'center'},
  { id: 'no_of_test_cancelled', label: 'No.of Tests Cancelled', align: 'center'},
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const ProcessTestsList = (props) => {
  const {onAction, state} = props;
  const { classes } = useStyles();

  const getActionButtons = () => {
    return [
      {'label': 'Cancelled', 'onClick': onViewSummaryClickFn, 'action_type': ['OPEN_SummaryDialog', 'SUMMARY_TABLE_INIT']},
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
    if(!state.ProcessTestsList.loaded) {
      onAction({
        type: [ACTION_TYPES.DATA_LOAD,],
        payload: {
          ...state,
          ...state.ProcessTestsList
        },
      });
    }
  }, [state.ProcessTestsList.loaded]);

  return <div className={classes.root}>
    <TableView
      columns={columns}
      tableData={ helperFns.prepareRowsFn(state) }
      loaded={state.ProcessTestsList.loaded}
      pageTitle={'Cancelled Tests'}
      actionButtons={getActionButtons()}
      displayPagination={ true }
    />
  </div>;
};

ProcessTestsList.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default ProcessTestsList;