import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableRow,
  Typography,
  TableHead,
  TableBody,
  Badge,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from 'tss-react/mui';
import { BillContext } from '../../commons';
import _reduce from 'lodash/reduce';
import _map from 'lodash/map';
import _get from 'lodash/get';
import { getAmount } from '../../getAmount';
import { BillItemTypes } from '../../BillItemTypes';
import { BILL_TYPES } from '../../billTypes';
import { calculateDaysBetween } from '../../CalculateDaysBetween';
import _find from 'lodash/find';
import { create_instance_object } from '../../helpers';
import _filter from 'lodash/filter';

const useStyles = makeStyles()((theme) => ({
  root: {},
  cardContentStyle: {
    paddingTop: 0,
  },
  section: {
    '&:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  sectionHeader: {
    padding: theme.spacing(1),
  },
}));


const BillSummary = (props) => {
  const { pendingAndAdvance, style, className, services, rest } = props;
  const { patientData, paidAdvance, pendingAdvance, pendingRoom, pendingLabService, patientBlockedStatus } = useContext(BillContext);

  const { classes } = style();
  const componentClasses = useStyles();

  const [showMore, setShowMore] = useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [tableTitle, setTableTitle] = useState();
  const [tableData, setTableData] = useState();
  const patientDetails = patientData;

  const handleClickHere = (title, tableTitle, data) => {
    console.log(`handleClick ${title} ${tableTitle}`, data);
    setDialogTitle(title);
    setTableTitle(tableTitle);
    setTableData(data);
    setShowMore(true);
    console.log('');
  };

  const billBundles = [
    {
      title: 'Advance Paid',
      billAmount: patientBlockedStatus ? 0 : paidAdvance,
    },
    {
      title: 'Pending Advance Bills',
      billAmount: pendingAdvance
    },
    {
      title: 'Pending Room & Cons. Bills',
      billAmount: patientBlockedStatus ? 0 : pendingRoom,
      handleClick: () => handleClickHere('Pending Room & Cons. Bills', 'Bills to Pay', pendingAndAdvance.room_bills),
    },
    {
      title: 'Pending lab & Service Bills',
      billAmount: pendingLabService,
    },
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent
        className={componentClasses.cardContentStyle}
        style={{ paddingLeft: '0', paddingBottom: '0' }}
      >
        <Grid container direction='row' justifyContent='center' >
          {_map(billBundles, (bundle, index) => {
            return (
              <BillBundle
                key={index}
                title={bundle.title}
                billAmount={bundle.billAmount}
                handleClick={bundle.handleClick}
              />
            );
          })}
        </Grid>
        <Dialog
          // sm = {true}
          fullWidth
          open={showMore}
          onClose={() => {
            setShowMore(false);
          }}
        >
          <DialogTitle>
            <Typography variant='h6' className={classes.dialogTitle}>
              {dialogTitle}
            </Typography>
            <IconButton
              className={classes.dialogCloseButton}
              onClick={() => setShowMore(false)}
              size='large'>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <BillDetailsTable
            tableTitle={tableTitle}
            dialogTitle={dialogTitle}
            patientDetails={patientDetails}
            tableData={tableData}
            services={services}
            setShowMore={setShowMore}
          />
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BillSummary;

const BillBundle = (props) => {
  const { title, billAmount, notification, handleClick } = props;
  const componentClasses = useStyles();

  return (
    <Grid item xs={3} className={componentClasses.section}>
      <Grid container direction='column'>
        <Grid item xs={12}>
          <Typography
            variant='h6'
            align='center'
            className={componentClasses.sectionHeader}
          >
            {title}
          </Typography>
        </Grid>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12} sx={{ my: 1 }} >
            <Grid item >
              <Typography variant='body1' align='center'>
                {billAmount}
              </Typography>
            </Grid>
          </Grid>
          {handleClick && <Grid item >
            <Button variant='text' size='small'>
              <Typography variant='caption' onClick={handleClick}>
                Click here for details
              </Typography>
            </Button>
          </Grid>}
        </Grid>
      </Grid>
    </Grid>
  );
};

const BillDetailsTable = (props) => {
  const { tableTitle, patientDetails, dialogTitle, tableData, services, setShowMore } = props;
  const { setBillInstancesData, billinstancesdata, setSelectedBillTypeRadio, pendingAndAdvance, patientBlockedStatus } = useContext(BillContext);

  const pendingAdvance = getAmount({ data: pendingAndAdvance.advance_bills, key: 'remaining_amount' });
  const pendingLabService = getAmount({ data: _filter(pendingAndAdvance.lab_and_services_bills, (item) => item.bill_type !== BILL_TYPES.FINAL_BILL.identifier), key: 'remaining_amount' });

  const finalBillAlert = ((pendingAdvance + pendingLabService) > 0);

  const loadRoomBill = () => {
    setBillInstancesData(
      [...billinstancesdata, create_instance_object(services, BillItemTypes.ROOM), create_instance_object(services, BillItemTypes.ROOM_CONSULTATION),]);
    setSelectedBillTypeRadio(BILL_TYPES.FINAL_BILL.identifier);
    setShowMore(false);
  };
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} direction='column'>
          <Grid item>
            <PatientShortDetails patientDetails={patientDetails} />
          </Grid>
          <Grid item>
            <Typography variant='h5'>{tableTitle}</Typography>
          </Grid>
          <Grid item>
            <DialogBillDetailsTable type={dialogTitle} tableData={tableData} />
          </Grid>
          <Grid item>
            {finalBillAlert ? <>
              <Button disabled size='small' onClick={loadRoomBill} color='primary' variant='outlined' style={{ color: 'primary' }} >
                Load Bill
              </Button >
              <Typography sx={{mt: 1}} variant='subtitle2' color='red'>Disabled as there are pending lab and services bills.</Typography>
            </> :
              <>{!_find(billinstancesdata, { code: BillItemTypes.ROOM }) ?
                <Button size='small'  disabled={patientBlockedStatus} onClick={loadRoomBill} color='primary' variant='outlined' style={{ color: 'primary' }} >
                  Load Bill
                </Button >
                : <Typography variant='subtitle1' color='green'>
                  Room Charges Already Loaded
                </Typography>}
              </>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const PatientShortDetails = ({ patientDetails }) => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='h5'>Patient Details</Typography>
      </Grid>
      <Grid
        item
        container
        spacing={1}
        justifyContent='space-between'
        style={{ marginTop: '7px' }}
      >
        <Grid item xs={6}>
          <PatientShortDetailsHeading
            heading='Patient Name'
            value={patientDetails.name}
          />
        </Grid>
        <Grid item xs={3}>
          <PatientShortDetailsHeading
            heading='IP Number'
            value={patientDetails.ipNo}
          />
        </Grid>
        <Grid item xs={3}>
          <PatientShortDetailsHeading
            heading='Room Type'
            value={patientDetails.assigned_room.room_type.name}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
const DialogBillDetailsTable = ({ type, tableData }) => {
  const {patientBlockedStatus} = useContext(BillContext);
  if (type === 'Pending Room & Cons. Bills') {
    const getDays = () => {
      return calculateDaysBetween(tableData[0].startdate, tableData[0].enddate);
    };

    const getRoomCharges = () => {
      let amount = 0;

      tableData.forEach((bill) => {
        amount = amount + bill.room_amount;
      });

      return amount * getDays();
    };
    const getConsFees = () => {
      let amount = 0;

      tableData.forEach((bill) => {
        amount = amount + bill.room.consultation_charges;
      });

      return amount * getDays();
    };

    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>No. Of Days Admitted So Far</TableCell>
            <TableCell>{getDays()} Days</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Room Charges So Far</TableCell>
            <TableCell>{getRoomCharges()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dr. Consultation Charges So Far</TableCell>
            <TableCell>{getConsFees()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Total Charges {patientBlockedStatus ? 'paid':'to pay'}</strong>
            </TableCell>
            <TableCell>{getRoomCharges() + getConsFees()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  if (type === 'Advance Paid') {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill No.</TableCell>
            <TableCell>Advanced Amount Paid</TableCell>
            <TableCell>Date Of Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((bill, key) => (
            <TableRow key={key}>
              <TableCell>Total Advance Paid Till Date</TableCell>
              <TableCell>Rs. 15000</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total Advance Paid Till Date</TableCell>
            <TableCell>{getAmount(tableData, 'amount')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  if (type === 'Pending lab & Service Bills')
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill Date</TableCell>
            <TableCell>Bill No.</TableCell>
            <TableCell>No. of Test Pending For Collection </TableCell>
            <TableCell>List of Tests</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>22/06/21</TableCell>
            <TableCell>21013456</TableCell>
            <TableCell>2</TableCell>
            <TableCell>CPB, CRP</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>22/06/21</TableCell>
            <TableCell>21013445</TableCell>
            <TableCell>1</TableCell>
            <TableCell>CUE</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
};
const PatientShortDetailsHeading = (props) => {
  const { heading, value } = props;
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography
        // variant="h6"
        >
          {heading} :
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='body1'>{value}</Typography>
      </Grid>
    </Grid>
  );
};
