import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
// import { Autocomplete } from '@mui/material';
import { BillContext } from '../../commons';
import { LoaderContext } from 'globalContexts';
import {BILL_DISCOUNT_STATUS} from 'utils/patient';
import { axiosInstance } from 'actions/helpers';
import { useHistory } from 'react-router';


const DiscountSection = (props) => {
  const { billdata } = useContext(BillContext);
  const {setShowLoader} = useContext(LoaderContext);
  const history = useHistory();
  const [discountAmount, setDiscountAmount] = useState(billdata.discount?.amount ? billdata.discount.amount : 0);
  const discountStatus = billdata.discount_status;
  const viewDisabled = (discountStatus !== BILL_DISCOUNT_STATUS.UNKNOWN) || props.disabled;
  const [discountError, setDiscountError] = useState('');

  useEffect(() => {
    if(billdata.discount?.amount)
      setDiscountAmount(billdata.discount.amount);
  }, [billdata.discount?.amount]);

  const handleRequestDiscount = () => {
    // If discount amount negative, show error.
    if(discountAmount < 0) {
      setDiscountError('Discount amount should be greater than 0');
      return;
    } else {
      setDiscountError('');
    }

    // Axios call to request for discount
    setShowLoader(true);
    axiosInstance.post(
      `/billing/${billdata.id}/discount_request`, {
        amount: discountAmount,
      }
    ).then((res) => {
      setShowLoader(false);
      history.go(0);
    }).catch((err) => {
      console.log(err);
      setShowLoader(false);
    });
  };

  return (
    <Grid container>
      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h5'>
          Enter Discount Amount (If any):
        </Typography>
        <TextField variant='standard'
          error={discountError !== ''}
          sx={{ width: '25%', marginLeft: '10px', textAlign: 'center' }}
          disabled={viewDisabled}
          value={discountAmount}
          type='number'
          InputProps={{
            inputProps: { min: 0 }
          }}
          onChange={(e) => setDiscountAmount(e.target.value)}
          helperText={discountError}
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          justifyContent: 'center',
          margin: '20px 0px',
          width: '100%',
        }}
      >
        <Button
          size='medium'
          variant='contained'
          color='primary'
          onClick={handleRequestDiscount}
          disabled={viewDisabled}
        >
          Request For Discount
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Status: {discountStatus !== BILL_DISCOUNT_STATUS.UNKNOWN ? discountStatus : 'Not Requested'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Approved by: {discountStatus === BILL_DISCOUNT_STATUS.APPROVED ? billdata.discount.approver_full_name : '' }
        </Typography>
      </Grid>
    </Grid>
  );
};

DiscountSection.propTypes = {
};

export default DiscountSection;