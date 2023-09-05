import React, {useState} from 'react';
import { makeStyles } from 'tss-react/mui';
import { Page } from 'components';
import Header from 'components/Header';
import { BillDetails, BillTypeSelection, BillParticulars, BillSummary} from '../CreateIPOPLab/Components';
import { BillTab } from './Componenets';
import uuid from 'uuid/v1';

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

const CreateFinalBill = () => {
  const {classes} = useStyles();
  let BillSummaryData = [
    {key:uuid(), title:'Pending Room & Cons. Bills', amount:'2000 /-', notification:'4', firstPara:'Amount To Pay Details', secondPara:'Room & Cons. charges to pay till date'},
    {key:uuid(), title:'Advance Paid', amount:'5000 /-', notification:'0', firstPara:'Advance Payment Details', secondPara:'Advance amount paid till date'},
    {key:uuid(), title:'Pending lab & Service Bills', amount:'3000 /-', notification:'1', firstPara:'Pending Bills to Pay Till Date Details', secondPara:'Pending bills to pay so far'},
    {key:uuid(), title:'Pending Investigation ', amount:'2000 /-', notification:'0', firstPara:'Sample Pending For Collection', secondPara:'Pending Sample Collection Details'},
  ];

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
    <Page className={classes.root} title='Create Final Bill Form'>
      <Header heading='Billing' subHeading='Create Final Bill' />
      <BillTypeSelection
        style={useStyles}
        className={classes.cardStyle}
        headData={headData}
      />
      <BillParticulars
        style={useStyles}
        className={classes.cardStyle}
        discharge={true}
        patientData={patientData}
      />
      <BillSummary data={BillSummaryData} style={useStyles} className={classes.cardStyle}/>
      {/* <BillTab style={useStyles} className={classes.cardStyle} /> */}
      <BillDetails style={useStyles} className={classes.cardStyle} billdata={billdata} />
    </Page>
  );
};

export default CreateFinalBill;