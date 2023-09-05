import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Button,
  TextField,
  IconButton,

  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import { makeStyles } from 'tss-react/mui';
import BillingTable from './BillingTable';
import SearchIcon from '@mui/icons-material/Search';
import { CancelOutlined } from '@mui/icons-material';
import BillingFormModal from './BillingFormModal';
import { create_instance_object, getDefaultBillData, getDefaultBillInstancesData } from '../../helpers';
import { BillContext } from '../../commons';
import { BILL_TYPES } from 'views/Billing/CreateIPOPLab/billTypes';
import _map from 'lodash/map';
import { AddDialog } from 'molecules/Dialogs';
import { BillItemTypes } from '../../BillItemTypes';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';

const useStyles = makeStyles()((theme) => ({
  cardStyle: {
    marginTop: theme.spacing(1),
  },

  content: {
    padding: 0,
  },
}));

const BillingForm = (props) => {

  const {
    style,
    className,
    showPreviousBill,
    setShowPreviousBill,
    searchBill,
    setSearchBill,
    handleBillSearch,
    billSearch,
    handleBillSearchCancel,
    setAdvanceAmount,
    handleAdvanceBill,
    pendingAndAdvance,
    ...rest
  } = props;

  const { classes } = useStyles();
  const { billinstancesdata, services, doctors, patientType, billdata,
    setBillInstancesData, selectedBillTypeRadio, setSelectedBillTypeRadio, pendingAdvance, pendingLabService } = useContext(BillContext);
  const [billingModalOpen, setBillingModalOpen] = useState(false);
  const [advanceBillAmount, setAdvanceBillAmount] = useState(0);
  const [showfinalBillPopup, setShowfinalBillPopup] = useState(false);

  const handleAddRow = () => {
    setBillInstancesData([
      ...billinstancesdata,
      getDefaultBillInstancesData(),
    ]);
  };

  const handleDelete = (key) => {
    setBillInstancesData(billinstancesdata.filter((row, index) => index !== key));
  };

  const handlebillingModalOpen = () => {
    setBillingModalOpen(true);
  };

  const handlebillingModalClose = () => {
    setBillingModalOpen(false);
  };

  const handleRadioOnchange = (e) => {
    setSelectedBillTypeRadio(e.target.value);
    setBillInstancesData([
      getDefaultBillInstancesData(),
    ]);

    setShowPreviousBill(false);
    if (e.target.value === BILL_TYPES.FINAL_BILL.identifier) {
      setShowPreviousBill(true);
    }
  };

  const handleSubmit = () => {
    console.log(advanceBillAmount);
    handleAdvanceBill(advanceBillAmount);
    setAdvanceAmount(advanceBillAmount);
  };

  const finalBillAlert = ((pendingAdvance + pendingLabService) > 0);

  useEffect(() => {
    if ((selectedBillTypeRadio === BILL_TYPES.FINAL_BILL.identifier) && !billSearch) {
      setShowfinalBillPopup(true);
    }
  }, [selectedBillTypeRadio]);

  let bill_types = BILL_TYPES;
  bill_types.FINAL_BILL.disabled = finalBillAlert;


  return (
    <div className={classes.cardStyle}>
      {
        billingModalOpen && <BillingFormModal billingModalOpen={billingModalOpen} handlebillingModalClose={handlebillingModalClose} />
      }

      <Card>
        <CardHeader
          title={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div> Bill Data</div>
              <div>
                {
                  patientType === 'IP' && (
                    <RadioGroup
                      row
                      aria-label='searchWith'
                      name='searchWith'
                      value={selectedBillTypeRadio}
                      onChange={handleRadioOnchange}
                    >
                      {_map(bill_types, (billType) => {
                        if(billType.identifier === BILL_TYPES.FINAL_BILL.identifier && finalBillAlert) {
                          return <Tooltip title='Final bill disabled as there are pending lab and services bills.' placement='top'>
                            <FormControlLabel
                              value={billType.identifier}
                              key={billType.identifier}
                              control={<Radio />}
                              label={billType.displayText}
                              disabled={billSearch || billType.disabled}
                              sx={{ marginRight: 0, marginLeft: 1 }}
                            />
                          </Tooltip>;
                        }

                        return <FormControlLabel
                          value={billType.identifier}
                          key={billType.identifier}
                          control={<Radio />}
                          label={billType.displayText}
                          disabled={billSearch || billType.disabled}
                          sx={{ marginRight: 0, marginLeft: 1 }}
                        />;
                      })}
                    </RadioGroup>)
                }
              </div>
            </div>
          }
        />
        <CardContent className={classes.content}>
          <div
            style={{
              display: 'flex',
              padding: '5px 25px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                id='standard-basic'
                label='Search by Bill no.'
                variant='standard'
                style={{ minWidth: '300px ' }}
                value={searchBill}
                onChange={(e) => setSearchBill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleBillSearch(null);
                  }
                }}
              />
              <IconButton
                variant='outlined'
                color='primary'
                onClick={() => handleBillSearch(null)}
                size='large'>
                <SearchIcon />
              </IconButton>
              {billSearch && (
                <IconButton onClick={handleBillSearchCancel} size='large'>
                  <CancelOutlined />
                </IconButton>
              )}
            </div>
            <Typography>
              <span style={{ fontWeight: '600' }}>Date:</span>{' '}
              {moment(Date.now()).format('DD-MM-YYYY')}
              <span style={{ marginLeft: '20px', fontWeight: '600' }}>
                {' '}
                Time:
              </span>{' '}
              {moment(Date.now()).format('HH:mm a')}
            </Typography>
          </div>
          {
            (selectedBillTypeRadio === BILL_TYPES.ADVANCE_BILL.identifier) ? (<Grid container justifyContent='center' alignItems='center' style={{ minHeight: '200px' }}>
              <Grid item>
                <Typography variant='h3' style={{ marginRight: '20px', color: '#3f51b5' }}>Enter Advance Amount : </Typography>
              </Grid>
              <Grid item>
                <TextField disabled={billSearch} type='number' value={billSearch ? billdata.amount : advanceBillAmount} onChange={(e) => setAdvanceBillAmount(e.target.value)} />
              </Grid>
              <Grid item>
                <Button disabled={billSearch} variant='outlined' color='primary' style={{ marginLeft: '20px' }} onClick={handleSubmit} >Continue</Button>
              </Grid>

            </Grid>) : (<>
              {finalBillAlert ?
                <>{showfinalBillPopup &&
                  <AddDialog title='Final Bill'
                    isOpen={true}
                    confirmText='OK'
                    onClose={() => {
                      setBillInstancesData([
                        getDefaultBillInstancesData(),
                      ]);
                      setSelectedBillTypeRadio(BILL_TYPES.LAB_SERVICE_BILL.identifier);
                      setShowfinalBillPopup(false);
                    }}
                    onSubmit={() => {
                      setBillInstancesData([
                        getDefaultBillInstancesData(),
                      ]);
                      setSelectedBillTypeRadio(BILL_TYPES.LAB_SERVICE_BILL.identifier);
                      setShowfinalBillPopup(false);
                    }}
                  ><Typography variant='subtitle1' color='lightcoral'>Please clear all the pending bills before proceeding to the final bill</Typography></AddDialog>}
                </> : <>
                  {showfinalBillPopup &&
                    <AddDialog title='Final Bill'
                      isOpen={true}
                      confirmText='Confirm'
                      onClose={() => {
                        setBillInstancesData([
                          getDefaultBillInstancesData(),
                        ]);
                        setSelectedBillTypeRadio(BILL_TYPES.LAB_SERVICE_BILL.identifier);
                        setShowfinalBillPopup(false);
                      }}
                      onSubmit={() => {
                        setBillInstancesData([create_instance_object(services, BillItemTypes.ROOM), create_instance_object(services, BillItemTypes.ROOM_CONSULTATION),]);
                        setShowfinalBillPopup(false);
                      }}
                    ><Typography variant='subtitle1' >Are you sure you want to proceed to the final bill and add room & consultantation charges?</Typography></AddDialog>
                  }</>}

              <BillingTable
                handleDelete={handleDelete}
                services={services}
                doctors={doctors}
                billSearch={billSearch}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '10px',
                }}
              >
                {!billSearch &&
                  <Typography variant='h5'>Total payable Amount (after Discount) : Rs.
                    {_reduce(billinstancesdata, (sum, data) => sum + data.netAmount, 0)}
                    /-</Typography>}
                {!billSearch && (
                  <Button
                    variant='outlined'
                    style={{ padding: '5px 25px' }}
                    onClick={() => handleAddRow()}
                  >
                    ADD
                  </Button>
                )}
              </div></>)
          }
        </CardContent>
      </Card>
    </div >
  );
};

BillingForm.propTypes = {
  className: PropTypes.string,
};

export default BillingForm;

