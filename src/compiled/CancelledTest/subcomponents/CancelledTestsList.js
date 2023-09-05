// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseTableView.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import TableView from 'components/Table/Table';
import {ACTION_TYPES} from '../reducer';
import _isEmpty from 'lodash/isEmpty';


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

const CancelledTestsList = (props) => {
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
    if(!state.CancelledTestsList.loaded) {
      onAction({
        type: [ACTION_TYPES.DATA_LOAD,],
        payload: {
          ...state,
          ...state.CancelledTestsList
        },
      });
    }
  }, [state.CancelledTestsList.loaded]);

  return <div className={classes.root}>
    <TableView
      columns={columns}
      tableData={ helperFns.prepareRowsFn(state) }
      loaded={state.CancelledTestsList.loaded}
      pageTitle={'Cancelled Tests'}
      actionButtons={getActionButtons()}
      displayPagination={ true }
    />
  </div>;
};

CancelledTestsList.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default CancelledTestsList;