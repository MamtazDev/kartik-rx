/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import NewPatientRegistration from 'views/NewPatientRegistration';
import CloseIcon from '@mui/icons-material/Close';
import _map from 'lodash/map';
import { timestampToAppDate } from 'utils/time';
import { patientName, PATIENT_TYPE } from 'utils/patient';
import CreateBillButton from 'molecules/Buttons/createBillButton';
import TableView from 'components/Table/Table';
import clsx from 'clsx';
import { AddDialog } from 'molecules/Dialogs';


const getName = (patient) => {
  return patient.first_name + ' ' + patient.last_name;
};

const columns = [
  { id: 'date', label: 'Adm Date', align: 'center' },
  { id: 'ipno', label: 'IP No.', align: 'center' },
  { id: 'id', label: 'Mr No.', align: 'center' },
  { id: 'patient.full_name', label: 'Name', align: 'center' },
  { id: 'patient.gender', label: 'Gender', align: 'center' },
  { id: 'patient.phone', label: 'Phone', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'assign', label: 'Assign', align: 'center' },
  { id: 'createbill', label: 'Create Bill', align: 'center' },
];

const useStyles = makeStyles()((theme) => ({
  cardStyle: {
    marginTop: theme.spacing(1),
  },
}));

const IpOpAssignButton = (props) => {
  // cleanup these set values
  const { patient, setSelectedPatient, setDialogType, setMrNo, setName, setIpNo, setDialog } = props;

  const handleAssignOP = (mrNo, name) => {
    setDialogType('Out Patient');
    setMrNo(mrNo);
    setName(name);
    setDialog(true);
    setSelectedPatient(patient);
  };

  const handleAssignIP = (mrNo, ipNo, name) => {
    setDialogType('In-Patient');
    setMrNo(mrNo);
    setIpNo(ipNo);
    setName(name);
    setDialog(true);
    setSelectedPatient(patient);
  };

  return (<ButtonGroup>
    <Button
      color='primary'
      size='small'
      variant='outlined'
      // TODO: fix this
      disabled={!patient.assign.op}
      onClick={() =>
        handleAssignOP(patient.id, getName(patient))
      }
    >
      OP
    </Button>
    <Button
      color='primary'
      size='small'
      variant='outlined'
      disabled={!patient.assign.ip}
      onClick={() =>
        handleAssignIP(
          patient.id,
          patient.ipno,
          getName(patient)
        )
      }
    >
      IP
    </Button>
  </ButtonGroup>);
};

// TODO: add typechecks

const PatientActivity = (props) => {
  const [name, setName] = useState();
  const [dialog, setDialog] = useState(false);
  const [dialogType, setDialogType] = useState('assignOP');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [mrNo, setMrNo] = useState();
  const [ipNo, setIpNo] = useState();

  const { title, style, className, ...rest } = props;
  const classes = style();

  const getPatientMod = (patient) => {
    let ipPatient = patient.ipno ? true : false;
    patient = {
      ...patient,
      assign: { op: ipPatient, ip: !ipPatient },
      patientName: patientName(patient),
      status: ipPatient ? PATIENT_TYPE.IP : PATIENT_TYPE.OP,
      createBill: { op: !ipPatient, ip: ipPatient, p: true },
      date: timestampToAppDate(patient.admitted_at),
    };

    return {
      ...patient,
      components: {
        assign: <IpOpAssignButton
          patient={patient}
          setDialogType={setDialogType}
          setMrNo={setMrNo}
          setName={setName}
          setIpNo={setIpNo}
          setDialog={setDialog}
          setSelectedPatient={setSelectedPatient}
        />,
        createbill: <CreateBillButton patient={patient} />,
      }
    };
  };

  const patientData = _map(props.patientData, getPatientMod);

  return (
    <div className={clsx(classes.root, className)}>
      <TableView
        columns={columns}
        tableData={patientData}
        loaded={true}
        pageTitle={title}
      />
      <AddDialog
        displayActions={false}
        isOpen={dialog}
        onClose={() => setDialog(false)}
        maxWidth='lg'
        title={`Assign New ${dialogType}`}
      >
        {(() => {
          switch (dialogType) {
            case 'Out Patient':
              return (
                <NewPatientRegistration
                  name={name}
                  mrno={mrNo}
                  header='disabled'
                  search='disabled'
                />
              );
            case 'In-Patient':
              return (
                <NewPatientRegistration
                  patientName={name}
                  mrno={selectedPatient.id}
                  ipno={selectedPatient.ipno}
                  patient={selectedPatient}
                  header='disabled'
                  search='disabled'
                />
              );
            case 'createBillOP':
              return <p>this is create bill op</p>;
            case 'createBillIP':
              return <p>this is createBill ip</p>;
            case 'createBillP':
              return <p>this is createBill p</p>;
            default:
              return <p>default</p>;
          }
        })()}
      </AddDialog>
    </div>
  );
};

PatientActivity.propTypes = {
  className: PropTypes.string,
};

export default PatientActivity;
