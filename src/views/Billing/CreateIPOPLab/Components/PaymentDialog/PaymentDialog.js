import { Button, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddDialog from '../../../../../molecules/Dialogs/AddDialog';
import { PAYMENT_OPTIONS } from '../../paymentOptions';

const MessageDialog = (props) => {
  const { message, ...rest } = props;
  return (
    <AddDialog title='Amount Mismatch' {...rest}>
      <Grid item sx={{ mt: 1 }}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }} xs={3}>
          <Typography variant='subtitle1'>
            {message}
          </Typography>
        </Grid>
      </Grid>
    </AddDialog>);
};

const PaymentDialog = (props) => {
  const { buttonText, onButtonClick, transactionId, setTransactionId, billRemainingAmount, payableAmount, paymentType, ...rest } = props;
  const { displayText, transactionIdDisplay, disableProceedBtn } = PAYMENT_OPTIONS[paymentType];

  if (billRemainingAmount > parseInt(payableAmount))
    return <MessageDialog message='Payable amount is less than the remaining amount. Please check the bill details.' {...rest} />;

  else if (billRemainingAmount !== parseInt(payableAmount) && paymentType !== PAYMENT_OPTIONS.CASH.identifier)
    return <MessageDialog message='Remaining amount doesn&apos;t match payment amount. Please check the bill details.' {...rest} />;

  return (
    <AddDialog title='Please Confirm Payment' {...rest}>
      <Grid item sx={{ mt: 1 }}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }} xs={3}>
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }} >{displayText}</Typography>
          {transactionIdDisplay && (
            <TextField sx={{ mx: 2 }} hiddenLabel label={'Enter Transaction Id'} value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
          )}
        </Grid>
        <Grid item sx={{ display: 'flex', alignSelf: 'center' }}>
          <Grid item sx={{ mt: 2 }} xs={3}>
            <Typography variant='subtitle1'>Amount to be Paid: <Typography variant='span' sx={{ fontWeight: 500 }} >{billRemainingAmount}</Typography></Typography>
          </Grid>
        </Grid>
        {paymentType === PAYMENT_OPTIONS.CASH.identifier && <Grid item sx={{ display: 'flex', alignSelf: 'center' }}>
          <Grid item sx={{ mt: 2 }} xs={3}>
            <Typography variant='subtitle1'>Amount to be Returned: <Typography variant='span' sx={{ fontWeight: 500 }} >{parseInt(payableAmount) - billRemainingAmount}</Typography></Typography>
          </Grid>
        </Grid>}
      </Grid>
      <Grid item sx={{ mt: 2 }} xs={3}>
        <Button variant='contained' color='primary' disabled={transactionId === '' && disableProceedBtn ? true : false} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Grid>
    </AddDialog>
  );
};

PaymentDialog.defaultProps = {
  buttonText: 'Proceed',
};

PaymentDialog.propTypes = {
  // AddDialog props
  isOpen: PropTypes.bool,
  open: PropTypes.bool,
  confirmText: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  displayActions: PropTypes.bool,
  maxWidth: PropTypes.string,

  // listData: PropTypes.array.isRequired,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default PaymentDialog;
