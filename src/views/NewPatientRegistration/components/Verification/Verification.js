import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { set } from 'js-cookie';

const useStyles = makeStyles()((theme) => ({
  root: {
    // width: theme.breakpoints.values.lg,
    // maxWidth: '100%',
    // margin: '0 auto',
    // padding: theme.spacing(3, 3, 6, 3)
  },
  options: {
    marginTop: theme.spacing(-2),
  },
  patientType: {
    marginTop: theme.spacing(1),
  },
}));
const Verification = (props) => {
  const [generateDisabled, setGenerateDisabled] = useState(false);
  let [time, setTime] = useState(5);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && seconds == 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const { className, ...rest } = props;

  const {classes} = useStyles();

  const handleGenerateOtp = () => {
    setIsActive(true);
    setInterval(5);
    setGenerateDisabled(true);

    setTimeout(() => {
      setTime(time--);
      setGenerateDisabled(false);
      setIsActive(false);
    }, 5000);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardHeader title='Verification' />
        <CardContent className={classes.options}>
          <Grid
            className={classes.options}
            container
            spacing={2}
            alignItems='center'
          >
            <Grid item xs={3}></Grid>
            <Grid item xs={2}>
              <Button
                variant='contained'
                color='primary'
                size='medium'
                fullWidth
                disabled={generateDisabled}
                onClick={handleGenerateOtp}
              >
                Generate OTP
              </Button>
              {generateDisabled
                ? <Typography variant='caption'>Resend in {time} s</Typography>
                : <div></div>}
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id='otp'
                label='Enter OTP'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={2}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
              >
                Submit OTP
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

Verification.propTypes = {
  className: PropTypes.string,
};

export default Verification;
