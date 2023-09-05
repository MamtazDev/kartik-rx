import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import { LinearProgress } from '@mui/material';

const useStyles = makeStyles()(() => ({
  root: {
    height: '100%'
  }
}));

const Error = props => {
  const { route } = props;

  const {classes} = useStyles();

  return (
    <main className={classes.root}>
      <Suspense fallback={<LinearProgress />}>
        {renderRoutes(route.routes)}
      </Suspense>
    </main>
  );
};

Error.propTypes = {
  route: PropTypes.object
};

export default Error;
