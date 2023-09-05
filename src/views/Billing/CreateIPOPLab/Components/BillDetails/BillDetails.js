import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
// import { Autocomplete } from '@mui/material';
import { BillContext } from '../../commons';
import DiscountSection from './DiscountSection';
import { BILL_DISCOUNT_STATUS } from 'utils/patient';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import { BILL_TYPES } from 'views/Billing/CreateIPOPLab/billTypes';
import { PAYMENT_OPTIONS } from '../../paymentOptions';
import ReplayIcon from '@mui/icons-material/Replay';

const BillingForm = (props) => {
  const {
    style,
    className,
    advanceAmount,
    setPaymentType,
    paymentType,
    setPayableAmount,
    payableAmount,
    paymentStatus,
    ...rest
  } = props;

  const { classes } = style();
  const { billdata, selectedBillTypeRadio, handleBillSearch, pendingAndAdvance, paidAdvance } = useContext(BillContext);
  const discountAmount = billdata.discount_status === BILL_DISCOUNT_STATUS.APPROVED ? billdata.discount.amount : 0;
  const closedBill = !_isEmpty(billdata.payments);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        style={{
          padding: 0,
        }}
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>Bill Details</div>
            <Button
              className={classes.searchButton}
              onClick={() => handleBillSearch(null)}
              variant='outlined'
            >
              <ReplayIcon />
            </Button>
          </div>
        }
      />
      <CardContent
        style={{
          padding: 0,
        }}
      >
        <Grid
          spacing={2}
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          style={{ marginTop: '8px' }}
        >
          <Grid item xs={6}>
            <Grid spacing={2} container>
              <Grid item xs={6}>
                <TypographyBody
                  text='Total Amount'
                  disabled
                  value={billdata.amount}
                />
              </Grid>
              <Grid item xs={6}>
                <TypographyBody
                  text='Net Amount Payable'
                  disabled
                  value={billdata.amount - discountAmount}
                />
              </Grid>

              <Grid item xs={6}>
                <TypographyBody
                  text='Disc Amount'
                  disabled
                  value={discountAmount}
                />
              </Grid>
              <Grid item xs={6}>
                <TypographyBody
                  text='Refundable amount'
                  disabled
                  value={0}
                />
              </Grid>
              {selectedBillTypeRadio === BILL_TYPES.FINAL_BILL.identifier &&
                <>
                  <Grid item xs={6}>
                    <TypographyBody
                      text='Advance amount paid'
                      disabled
                      value={paidAdvance}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TypographyBody
                      text='Final amount to be paid'
                      disabled
                      value={billdata.amount - discountAmount - paidAdvance}
                    />
                  </Grid>
                </>}

              {closedBill ? (
                <Grid item xs={12}>
                  <TypographyBody
                    text='Paid Amount'
                    disabled
                    value={_map(billdata.payments, 'amount').reduce((a, b) => a + b, 0)}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <TypographyBody
                    text='Amount being paid'
                    onChange={(e) => setPayableAmount(e.target.value)}
                    value={payableAmount}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <PaymentOptions paymentType={paymentType} setPaymentType={setPaymentType} paymentStatus={paymentStatus} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}  >
            <DiscountSection disabled={selectedBillTypeRadio !== BILL_TYPES.FINAL_BILL.identifier} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

BillingForm.propTypes = {
};

const PaymentOptions = ({ paymentType, setPaymentType, paymentStatus }) => {
  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  return (
    <div style={{ width: '100%', marginTop: '5px', }}>
      <FormControl component='fieldset' style={{ width: '100%' }} disabled={paymentStatus}>
        <Grid item >
          <FormLabel component='legend'>
            <Typography variant='h5'>Payment Details</Typography>
          </FormLabel>
        </Grid>
        <RadioGroup
          row
          aria-label='paymentType'
          name='paymentType'
          value={paymentType}
          onChange={handlePaymentChange}
          style={{ width: '100%' }}
        >
          <Grid
            container
            item
            xs={12}
            direction='row'
            alignItems='flex-start'
          >
            {_map(PAYMENT_OPTIONS, (option) => (
              option.identifier !== PAYMENT_OPTIONS.PENDING.identifier &&
              <FormControlLabel
                key={option.identifier}
                value={option.identifier}
                control={<Radio />}
                label={option.displayText}
              />
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
      {paymentType === PAYMENT_OPTIONS.UPI.identifier && (
        <TextField
          label='Enter UPI ID'
          style={{ width: '350px' }}
          variant='standard'
          disabled={paymentStatus}
        />
      )}
    </div>
  );
};

export default BillingForm;

const TypographyBody = (props) => {
  const { disabled, text, value, ...rest } = props;
  return (
    <TextField
      fullWidth
      InputLabelProps={{ shrink: true }}
      // id="mrNo"
      label={text}
      variant='standard'
      disabled={disabled}
      size='small'
      value={value}
      {...rest}
    />
  );
};

TypographyBody.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
