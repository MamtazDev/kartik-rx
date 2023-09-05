// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseTableView.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import TableView from 'components/Table/Table';
import {ACTION_TYPES} from '../reducer';


import helperFns from 'compiled_helpers/Notification/DischargePatientHelper';

const columns = [
  { id: 'type', label: 'Charge Type', align: 'center'},
  { id: 'amount', label: 'Amount', align: 'center'},
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const SummaryTable = (props) => {
  const {onAction, state} = props;
  const { classes } = useStyles();

  

  

  useEffect(() => {
    // setTableData();
    if(!state.SummaryTable.loaded) {
      onAction({
        type: [ACTION_TYPES.SUMMARY_DATA_LOAD,],
        payload: {
          ...state.SummaryTable
        },
      });
    }
  }, [state.SummaryTable.loaded]);

  return <div className={classes.root}>
    <TableView
      columns={columns}
      tableData={ helperFns.prepareSummaryTableRowsFn(state) }
      loaded={state.SummaryTable.loaded}
      pageTitle={'Charges'}
      
    />
  </div>;
};

SummaryTable.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default SummaryTable;