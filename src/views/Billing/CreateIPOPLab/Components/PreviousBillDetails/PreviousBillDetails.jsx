import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import React, { useState, useEffect, useContext } from 'react';
import { axiosInstance } from 'actions/helpers';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { timestampToAppDate, timestampToAppDateTime } from 'utils/time';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _concat from 'lodash/concat';
import { TableView } from 'components/Table';
import { BILL_TYPES } from '../../billTypes';
import { PAYMENT_OPTIONS } from '../../paymentOptions';
import _reduce from 'lodash/reduce';
import _find from 'lodash/find';
import { BillContext } from '../../commons';

const useStyles = makeStyles()((theme) => ({
  cardStyle: {
    marginTop: theme.spacing(1),
  },
  content: {
    padding: 0,
  },
}));

const categoryOptions = [BILL_TYPES.LAB_SERVICE_BILL.displayText, BILL_TYPES.ADVANCE_BILL.displayText, BILL_TYPES.FINAL_BILL.displayText];
const { UPI, CARD, CASH, PENDING } = PAYMENT_OPTIONS;
const paymentModeOptions = [UPI.identifier, CARD.identifier, CASH.identifier, PENDING.identifier];

const PreviousBillDetails = ({ style, className, ipNo, handleBillSearch }) => {
  const {patientBlockedStatus} = useContext(BillContext);
  const { classes } = useStyles();
  const columns = [
    { id: 'bill_no', label: 'Bill\xa0No', align: 'center' },
    { id: 'date', label: 'Bill\xa0date', align: 'center' },
    { id: 'billCategory', label: 'Category', align: 'center' },
    { id: 'amount', label: 'Amount', align: 'center' },
    { id: 'paymentsMode', label: 'Payment Mode', align: 'center' },
    { id: 'btn', label: 'Load Bills', align: 'center' },
  ];
  const [categoryFilter, setCategoryFilter] = useState();
  const [paymentModeFilter, setPaymentModeFilter] = useState(patientBlockedStatus ? '' : PENDING.identifier);
  const [activeBills, setActiveBills] = useState([]);
  const [prevBillDetailsExpanded, setPrevBillDetailsExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchPrevBillDetails = async () => {
    setPrevBillDetailsExpanded(!prevBillDetailsExpanded);
    if (!prevBillDetailsExpanded && ipNo) {
      setLoaded(false);
      await axiosInstance
        .get(`/billing/active_bills_segregated/${ipNo}`)
        .then((res) => {
          const mergedActiveBills = _concat(res.data.lab_and_services_bills, res.data.advance_bills || []);
          setActiveBills(mergedActiveBills);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getRow = (patientObj) => {
    const paymentsMode = patientObj.payments[0] ? patientObj.payments[0].info.payment_mode : PENDING.displayText;
    const billCategory = _find(Object.values(BILL_TYPES), {identifier: patientObj.bill_type}).displayText;

    const obj = {
      ...patientObj,
      components: {
        bill_no: <div onClick={() => handleBillSearch(patientObj.id)}>
          <Typography variant='subtitle1' sx={{ my: 1, cursor: 'pointer' }}>{patientObj.id}</Typography>
        </div>,
        btn: <Button size='small' color='primary' variant='outlined' style={{ color: 'primary', marginRight: '2%', marginTop: '1%', }} onClick={() => handleBillSearch(patientObj.id)} >
          Load Bill
        </Button >,
      },
      date: timestampToAppDate(patientObj.created_time),
      paymentsMode: paymentsMode,
      billCategory: billCategory,
    };

    if (!paymentModeFilter && !categoryFilter)
      return obj;
    else if (paymentModeFilter && categoryFilter) {
      if (paymentModeFilter === paymentsMode && categoryFilter === billCategory)
        return obj;
    }
    else if (paymentModeFilter) {
      if (paymentModeFilter === paymentsMode)
        return obj;
    }
    else if (categoryFilter) {
      if (categoryFilter === billCategory)
        return obj;
    }
  };

  const tableData = _filter(_map(activeBills, getRow), (data) => data !== undefined);

  return (
    <div>
      <Accordion expanded={prevBillDetailsExpanded} onChange={fetchPrevBillDetails}>
        <AccordionSummary
          expandIcon={<ExpandMore />} sx={{ m: 1 }}
        >
          <Typography variant='h5' >Previous Bill Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='subtitle1' sx={{ my: 1 }}>Filters</Typography>
            <Autocomplete
              options={categoryOptions}
              getOptionLabel={(option) => option}
              value={categoryFilter}
              renderInput={(params) => (
                <TextField {...params} label='Bill Category' variant='outlined' />
              )}
              sx={{ marginLeft: 3, my: 1, width: '20%', display: 'inline-block' }}
              onChange={(event, val) => {
                setCategoryFilter(val);
              }}
            />
            <Autocomplete
              options={paymentModeOptions}
              value={paymentModeFilter}
              onChange={(event, val) => {
                setPaymentModeFilter(val);
              }}
              sx={{ marginLeft: 3, my: 1, width: '20%', display: 'inline-block' }}
              renderInput={(params) => (
                <TextField {...params} label='Payment Mode' variant='outlined' />
              )}
            />
          </div>
          <Divider />

          <TableView
            columns={columns}
            data={activeBills}
            tableData={tableData}
            loaded={loaded}
            displayPagination={true}
          />
          <CardContent className={classes.content}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: '20px',
              }}
            >
              <Typography style={{ fontSize: '20px' }}>
                Total Bills : <b>{activeBills.length}</b>
              </Typography>
              <Typography style={{ fontSize: '20px' }}>
                Total Amount Paid :{' '}
                <b>{_reduce(_filter(activeBills, ({ payments }) => {
                  return (payments[0] && payments[0].info.payment_mode !== PENDING.identifier);
                }), (sum, { amount }) => {
                  return sum + amount;
                }, 0)}</b>
              </Typography>
            </div>
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </div>
  );

};

export default PreviousBillDetails;