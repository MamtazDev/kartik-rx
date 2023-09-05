import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import PatientDetails from '../PatientDetails';
import CloseIcon from '@mui/icons-material/Close';
import _map from 'lodash/map';
import TableView from 'components/Table/Table';
import CreateBillButton from 'molecules/Buttons/createBillButton';
import { timestampToAppDate } from 'utils/time';
import moment from 'moment';
import { AddDialog } from 'molecules/Dialogs';

const columns = [
  { id: 'date', label: 'Adm Date', align: 'center' },
  { id: 'ipno', label: 'IP No.', align: 'center' },
  { id: 'patient.full_name', label: 'Name', align: 'center' },
  { id: 'patient.gender', label: 'Gender', align: 'center' },
  { id: 'patient.phone', label: 'Phone', align: 'center' },
  { id: 'registration_type', label: 'Status', align: 'center' },
  { id: 'days', label: 'Admitted(Days)', align: 'center' },
  { id: 'createbill', label: 'Create Bill', align: 'center' },
  { id: 'details', label: 'Details', align: 'center' },
];


const PatientTable = (props) => {
  // const [orders, setOrders] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [dialogType, setDialogType] = useState('assignOP');
  const [mrNo, setMrNo] = useState();
  const [ipNo, setIpNo] = useState();
  const { title, patientData, style, className, ...rest } = props;
  const classes = style();

  const handleViewDetails = (mrNo, ipNo) => {
    setDialogType('assignIP');
    setMrNo(mrNo);
    setIpNo(ipNo);
    setDialog(true);
  };

  const getDetailsButton = (patient) => {
    return <Button
      onClick={() =>
        handleViewDetails(patient.ipNo, patient.mrNo)
      }
      size='small'
      variant='text'
    >
      View Details
    </Button>;
  };

  const getRow = (patientObj) => {
    return {
      ...patientObj,
      date: timestampToAppDate(patientObj.admitted_at),
      days: moment.unix(moment().unix()).diff(moment.unix(patientObj.admitted_at), 'days'),
      components: {
        createbill: <CreateBillButton patient={patientObj} />,
        details: getDetailsButton(patientObj),
      }
    };
  };

  const tableData = _map(patientData, getRow);

  return (
    <div className={clsx(classes.root, className)}>
      <TableView
        columns={columns}
        tableData={tableData}
        loaded={true}
        pageTitle='Current IP Patients'
      />
      <AddDialog
        isOpen={dialog}
        onClose={() => setDialog(false)}
        title='Patient Details'
        displayActions={false}
      >
        <PatientDetails style={style} className={classes.cardStyle} />
      </AddDialog>
    </div>
  );
};

PatientTable.propTypes = {
  className: PropTypes.string,
};

export default PatientTable;
