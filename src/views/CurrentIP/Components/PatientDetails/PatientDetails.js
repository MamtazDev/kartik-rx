import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const PatientDetails = (props) => {
  const { style, className, ...rest } = props;
  const classes = style();
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.cardContentStyle}>
        <Grid container direction='column' spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id='patientName'
                label='Name'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id='ipNo'
                label='IP. No'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id='consDrName'
                label='Cons. Dr'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id='roomType'
                label='Room Type'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id='roomNo'
                label='Room No.'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id='admDate'
                label='Adm. Date'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              align='flex-start'
              component='header'
              gutterBottom
              variant='h5'
            >
              Billing Details
            </Typography>
          </Grid>
          <Grid item container>
            {/* <div className={classes.container3parts}> */}
            <Grid item lg={4} xs={12}>
              <div className={classes.statsItem}>
                <Typography
                  align='center'
                  component='h4'
                  gutterBottom
                  variant='overline'
                >
                  Amount&nbsp;Paid&nbsp;till&nbsp;date
                </Typography>
                <Typography align='center' variant='h3'>
                  8500
                </Typography>
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className={classes.statsItem}>
                <Typography
                  align='center'
                  component='h4'
                  gutterBottom
                  variant='overline'
                >
                  Advance&nbsp;Paid&nbsp;till&nbsp;date
                </Typography>
                <Typography align='center' variant='h3'>
                  4000
                </Typography>
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className={classes.statsItem}>
                <Typography
                  align='center'
                  component='h4'
                  gutterBottom
                  variant='overline'
                >
                  Total&nbsp;Amount&nbsp;Paid&nbsp;till&nbsp;date
                </Typography>
                <Typography align='center' variant='h3'>
                  12500
                </Typography>
              </div>
            </Grid>
            {/* </div> */}
          </Grid>
          <Grid item container spacing={3}>
            <Grid item>
              <Typography
                align='center'
                component='heading'
                gutterBottom
                variant='h6'
              >
                Previous Paid Bills
              </Typography>
              <ol style={{padding:'.2rem 0rem 0rem 1.2rem'}}>
                <li>bill 1</li>
                <li>bill 2</li>
                <li>bill 3</li>
              </ol>
            </Grid>
            <Grid item>
              <Typography
                align='center'
                component='heading'
                gutterBottom
                variant='h6'
              >
                Previous Paid Advance Bills
              </Typography>
              <ol style={{padding:'.2rem 0rem 0rem 1.2rem'}}>
                <li>bill 1</li>
                <li>bill 2</li>
                <li>bill 3</li>
              </ol>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

PatientDetails.propTypes = {
  className: PropTypes.string,
};

export default PatientDetails;
