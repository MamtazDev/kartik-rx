import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Grid } from '@mui/material';

import { Page } from 'components';
import {
  Header,
  TodayPatientRegistration,
  TodayBilling,
  RegisteredBilled,
  TodayTasks,
} from './components';

const useStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    '& > *': {
      height: '100%'
    }
  }
}));

const DashboardAnalytics = () => {
  const {classes} = useStyles();

  return (
    <Page
      className={classes.root}
      title='Home'
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        {/* <Grid
          item
          xs={12}
        >
          <Overview />
        </Grid>
        <Grid
          item
          lg={8}
          xl={9}
          xs={12}
        >
          <FinancialStats />
        </Grid>
        <Grid
          item
          lg={4}
          xl={3}
          xs={12}
        >
          <EarningsSegmentation />
        </Grid>
        <Grid
          item
          lg={8}
          xs={12}
        >
          <LatestOrders />
        </Grid> */}
        <Grid
          item
          lg={4}
          xs={12}
        >
          <TodayPatientRegistration />
        </Grid>
        <Grid
          item
          lg={4}
          xs={12}
        >
          <TodayBilling />
        </Grid>
        <Grid
          item
          lg={4}
          xs={12}
        >
          <RegisteredBilled />
        </Grid>
        <Grid
          item
          lg={4}
          xs={12}
        >
          <TodayTasks />
        </Grid>
        {/* <Grid
          item
          lg={8}
          xs={12}
        >
          <MostProfitableProducts />
        </Grid>
        <Grid
          item
          lg={4}
          xs={12}
        >
          <TopReferrals />
        </Grid> */}
      </Grid>
    </Page>
  );
};

export default DashboardAnalytics;
