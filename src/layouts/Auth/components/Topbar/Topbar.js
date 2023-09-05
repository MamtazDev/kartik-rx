import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Toolbar, Typography } from '@mui/material';

const useStyles = makeStyles()(() => ({
  root: {
    boxShadow: 'none'
  },
  header: {
    color: 'white',
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const {classes} = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color='primary'
    >
      <Toolbar>
        <RouterLink to='/'>
          <Typography className={classes.header} variant='h5' component='h5'>RX</Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
