import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Grid } from '@mui/material';

import { Page } from 'components';
import {
  Header,
  Overview,
  LatestOrders
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
      title='Patient Registration'
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
        >
          <Overview />
        </Grid>
        <Grid
          item
          lg={12}
          xs={12}
        >
          <LatestOrders sectionHeader='Today'/>
        </Grid>
        <Grid
          item
          lg={12}
          xs={12}
        >
          <LatestOrders sectionHeader='Yesterday'/>
        </Grid>
        <Grid
          item
          lg={12}
          xs={12}
        >
          <LatestOrders sectionHeader='Previous Days'/>
        </Grid>
      </Grid>
    </Page>
  );
};

export default DashboardAnalytics;
