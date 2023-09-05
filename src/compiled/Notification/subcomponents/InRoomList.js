// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseTableView.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import TableView from 'components/Table/Table';
import {ACTION_TYPES} from '../reducer';


import DischargeDialog from 'compiled/Notification/subcomponents/DischargeDialog';
import EditDialog from 'compiled/Notification/subcomponents/EditDialog';
import ChangeRoomDialog from 'compiled/Notification/subcomponents/ChangeRoomDialog';
import helperFns from 'compiled_helpers/Notification/NotificationHelper';

const columns = [
  { id: 'admDate', label: 'Adm Date', align: 'center'},
  { id: 'id', label: 'IP No.', align: 'center'},
  { id: 'mrno', label: 'MR No.', align: 'center'},
  { id: 'name', label: 'Name', align: 'center'},
  { id: 'gender', label: 'Gender', align: 'center'},
  { id: 'phone', label: 'Phone', align: 'center'},
  { id: 'roomNameDisp', label: 'Room', align: 'center'},
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const InRoomList = (props) => {
  const {onAction, state} = props;
  const { classes } = useStyles();

  const getActionButtons = () => {
    return [
      {'label': 'Discharge', 'onClick': onDischargeClickFn, 'action_type': 'OPEN_DischargeDialog'},
      {'label': 'Change Room', 'onClick': onChangeRoomClickFn, 'action_type': 'OPEN_ChangeRoomDialog'},
      {'label': 'Edit', 'onClick': onEditClickFn, 'action_type': 'OPEN_EditDialog'},
    ];
  };

  const onDischargeClickFn = (editObj) => {
    onAction({
      type: [ACTION_TYPES.OPEN_DischargeDialog,],
      payload: {
        editObj
      },
    });
  };const onChangeRoomClickFn = (editObj) => {
    onAction({
      type: [ACTION_TYPES.OPEN_ChangeRoomDialog,],
      payload: {
        editObj
      },
    });
  };const onEditClickFn = (editObj) => {
    onAction({
      type: [ACTION_TYPES.OPEN_EditDialog,],
      payload: {
        editObj
      },
    });
  };

  useEffect(() => {
    // setTableData();
    if(!state.InRoomList.loaded) {
      onAction({
        type: [ACTION_TYPES.DATA_LOAD,ACTION_TYPES.SHOW_GLOBAL_LOADER,],
        payload: {
          ...state.InRoomList
        },
      });
    }
  }, [state.InRoomList.loaded]);

  return <div className={classes.root}>
    <TableView
      columns={columns}
      tableData={ helperFns.prepareRowsFn(state) }
      loaded={state.InRoomList.loaded}
      pageTitle={'Current IP Patients'}
      actionButtons={getActionButtons()}
    />
    <DischargeDialog onAction={onAction} state={state} />
    <EditDialog onAction={onAction} state={state} />
    <ChangeRoomDialog onAction={onAction} state={state} />
  </div>;
};

InRoomList.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default InRoomList;