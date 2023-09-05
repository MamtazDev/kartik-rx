import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import Table from 'components/Table/Table';
import { AddDialog } from 'molecules/Dialogs';
import { BILL_TYPES } from 'views/Billing/CreateIPOPLab/billTypes';
import _map from 'lodash/map';


const useStyles = makeStyles()((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    maxWidth: '900px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', padding: '10px'
  },
  itemTypography: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: '10px',
    width: '30%'
  }
}));

const formSearchWithOptions = [
  {
    identifier: BILL_TYPES.LAB_SERVICE_BILL.identifier,
    displayText: BILL_TYPES.LAB_SERVICE_BILL.displayText,
  }, {
    identifier: BILL_TYPES.ADVANCE_BILL.identifier,
    displayText: BILL_TYPES.ADVANCE_BILL.displayText,
  }, {
    identifier: BILL_TYPES.FINAL_BILL.identifier,
    displayText: BILL_TYPES.FINAL_BILL.displayText,
  },
];

const COLUMNS = [
  { id: 'date', label: 'Bill Date', align: 'center' },
  { id: 'mr_no', label: 'MR No.', align: 'center' },
  { id: 'id', label: 'IP No.', align: 'center' },
  { id: 'billno', label: 'Bill No.', align: 'center' },
  { id: 'bill_type', label: 'Bill Type', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'payment_mode', label: 'Payment mode', align: 'center' },

];

const DATAS = [
  {
    id: '0_investigation',
    date: '2022-05-12 07:30:36',
    mr_no: '0_mr_no',
    billno: '10',
    bill_type: 'Lab/Service',
    amount: 2000,
    payment_mode: 'UPI'
  },
  {
    id: '1_investigation',
    date: '2022-05-12 07:30:36',
    mr_no: '1_mr_no',
    billno: '10',
    bill_type: 'Lab/Service',
    amount: 3000,
    payment_mode: 'CASH'
  },
  {
    id: '2_investigation',
    date: '2022-05-12 07:30:36',
    mr_no: '2_mr_no',
    billno: '10',
    bill_type: 'Lab/Service',
    amount: 5000,
    payment_mode: 'UPI'
  },
];


function BillingFormModal({ billingModalOpen, handlebillingModalClose }) {
  const { classes } = useStyles();

  const [goButton, setGoButton] = React.useState(false);
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());

  const handleGoButton = () => setGoButton(true);

  return (
    <AddDialog
      displayActions={false}
      isOpen={billingModalOpen}
      onClose={handlebillingModalClose}
      maxWidth='lg'
      title={goButton ? 'Billing' : 'Search'}
    >
      {!goButton ? (<>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid item md={7} className={classes.item}>
            <Typography className={classes.itemTypography}>From: </Typography>
            <DatePicker
              md={8}
              fullWidth
              label='FROM'
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid item md={5} className={classes.item}>
            <Typography className={classes.itemTypography}>To: </Typography>
            <DatePicker
              label='TO'
              fullWidth
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent='flex-end' style={{ padding: '10px' }}>
          <Button size='small' variant='contained' color='primary' onClick={handleGoButton}>GO</Button>
        </Grid></>) : (
        <>
          <Grid container justifyContent='space-between' style={{ padding: '10px' }}>
            <Grid item md={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RadioGroup
                row
                aria-label='searchWith'
                name='searchWith'
                // value={searchFor}
                // onChange={handleRadioOnchange}
              >
                {_map(formSearchWithOptions, (option) => (
                  <FormControlLabel
                    key={option.identifier}
                    value={option.identifier}
                    control={<Radio />}
                    label={option.displayText}
                  />
                ))}
              </RadioGroup>
            </Grid>
            <Grid item md={5} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ fontWeight: 'bold', marginRight: '10px' }}>Search Value : </Typography>
              <TextField />
            </Grid>
          </Grid>
          <Divider />
          <Grid container justifyContent='center' style={{ padding: '10px' }}>
            <Table
              columns={COLUMNS}
              tableData={DATAS}
              loaded={true}
              displayPagination={true}
            />
          </Grid>

          <Grid container justifyContent='center' style={{ padding: '10px' }}>
            <Button size='small' variant='contained' color='primary' onClick={handlebillingModalClose}>Cancel</Button>
          </Grid>
        </>)
      }
    </AddDialog>
  );
}

export default BillingFormModal;