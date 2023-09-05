// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseTableView.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import TableView from 'components/Table/Table';
import {ACTION_TYPES} from '../reducer';
import _isEmpty from 'lodash/isEmpty';



const columns = [
  { id: 'description', label: 'Description', align: 'center'},
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
          ...state,
          ...state.SummaryTable
        },
      });
    }
  }, [state.SummaryTable.loaded]);

  return <div className={classes.root}>
    <TableView
      columns={columns}
      tableData={_isEmpty(state.data) ? state.SummaryTable.data : state.data}
      loaded={state.SummaryTable.loaded}
      pageTitle={'Tests List'}
      
      displayPagination={ false }
    />
  </div>;
};

SummaryTable.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default SummaryTable;