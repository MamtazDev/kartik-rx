import React, { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import {
  Card,
  CardHeader,
  Divider,
  // List,
  // ListItem,
  // ListItemAvatar,
  // ListItemText,
  // Avatar,
  Typography,
  // Link
} from '@mui/material';

import ViewReport from '../ViewReport';
import axios from 'utils/axios';
// import getInitials from 'utils/getInitials';

const useStyles = makeStyles()(theme => ({
  root: {},
  statsContainer: {
    display: 'flex'
  },
  statsItem: {
    padding: theme.spacing(3),
    flexGrow: 1,
    '&:first-of-type': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  content: {
    padding: 0
  },
  date: {
    whiteSpace: 'nowrap'
  }
}));

const CustomerActivity = props => {
  const { className, ...rest } = props;

  const {classes} = useStyles();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = () => {
      axios.get('/api/dashboard/customer-activity').then(response => {
        if (mounted) {
          setCustomers(response.data.customers);
        }
      });
    };

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Today's Billings" />
      <Divider />
      <div className={classes.statsContainer}>
        <div className={classes.statsItem}>
          <Typography
            align='center'
            component='h4'
            gutterBottom
            variant='overline'
          >
            Total Registrations
          </Typography>
          <Typography
            align='center'
            variant='h3'
          >
            13
          </Typography>
        </div>
        <Divider />
        <div className={classes.statsItem}>
          <Typography
            align='center'
            component='h4'
            gutterBottom
            variant='overline'
          >
            Not billed
          </Typography>
          <Typography
            align='center'
            variant='h3'
          >
            5
          </Typography>
        </div>
      </div>
      <Divider />
      <ViewReport statsContainerClass={classes.statsContainer} />
    </Card>
  );
};

CustomerActivity.propTypes = {
  className: PropTypes.string
};

export default CustomerActivity;
