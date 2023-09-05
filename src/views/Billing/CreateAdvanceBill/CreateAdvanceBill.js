import React, {useState} from 'react';
import { makeStyles } from 'tss-react/mui';
import { Page } from 'components';
import Header from 'components/Header';
import { BillDetails, BillTypeSelection, BillParticulars, BillingForm } from '../CreateIPOPLab/Components';
// import { BillTab } from "./Componenets";
// import uuid from 'uuid/v1';
// import { Card } from "@mui/material";
// import {
//   BillDetails,
//   BillingForm,
//   BillParticulars,
//   BillTypeSelection,
// } from "./Components";

const useStyles = makeStyles()((theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(2, 2, 2, 3),
  },
  cardStyle: {
    marginTop: theme.spacing(1),
  },
  gridStyle: {
    spacing: '{2}',
  },
  cardContentStyle: {
    marginTop: theme.spacing(-2),
  },
  divStyle: {
    padding: 0,
  },
  ButtonStyle: {
    marginTop: theme.spacing(1),
  },
  dialogCloseButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  statsContainer: {
    width: '100%',
    padding: '0',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    gridGap: '0',
    border: `1px solid ${theme.palette.divider}`,
    borderRight: '0px',
  },
  statsItem: {
    padding: theme.spacing(1),
    flexGrow: 1,
    borderRight: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    fontSize: '.75rem',
  },
}));

const initialBillData = {
  description: '',
  services: '',
  consDr: {
    first_name: '',
    last_name: '',
  },
  rate: '',
  qty: 0,
  total: 0,
  discPerc: 0,
  discA: 0,
  netAmount: 0,
};

const CreateAdvanceBill = () => {
  const {classes} = useStyles();

  const [headData, setHeadData] = useState({
    mrNo: '',
    ipNo: '',
    consDoctor: '',
    refDoctor: '',
    disabled: false,
  });

  const [patientData, setPatientData] = useState({
    information: {
      name: '',
      motherName: '',
      age: '',
      sex: '',
      phNo: '',
      address: '',
    },
    ipDetails: {
      admissionTimeandDate: '',
      roomNo: '',
      roomType: '',
      bedNo: '',
      roomChargesPerDay: '',
    },
  });

  const [billdata, setBillData] = useState([initialBillData]);
  
  return (
    <Page className={classes.root} title='Create Advance Bill Form'>
      <Header heading='Billing' subHeading='Create Advance Bill' />
      <BillTypeSelection style={useStyles} className={classes.cardStyle} headData={headData} />
      <BillParticulars style={useStyles} className={classes.cardStyle} discharge={true} patientData={patientData} />
      {/* <BillingForm /> */}
      <BillDetails style={useStyles} className={classes.cardStyle} billdata={billdata} />
    </Page>
  );
};

export default CreateAdvanceBill;