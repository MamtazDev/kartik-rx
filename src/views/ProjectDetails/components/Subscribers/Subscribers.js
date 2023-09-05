import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Grid } from '@mui/material';

import { SubscriberCard } from './components';

const useStyles = makeStyles()(() => ({
  root: {}
}));

const Subscribers = props => {
  const { subscribers, className, ...rest } = props;

  const {classes} = useStyles();

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      {subscribers.map(subscriber => (
        <Grid
          item
          key={subscriber.id}
          lg={4}
          xs={12}
        >
          <SubscriberCard subscriber={subscriber} />
        </Grid>
      ))}
    </Grid>
  );
};

Subscribers.propTypes = {
  className: PropTypes.string,
  subscribers: PropTypes.array.isRequired
};

export default Subscribers;
