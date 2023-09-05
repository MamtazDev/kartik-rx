import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { Typography, Button, useTheme, useMediaQuery } from '@mui/material';

import { Page } from 'components';

const useStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 300,
    height: 'auto'
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Error401 = () => {
  const {classes} = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Page
      className={classes.root}
      title='Error 401'
    >
      <Typography
        align='center'
        variant={mobileDevice ? 'h4' : 'h1'}
      >
        401: We are sorry but we are not able to authenticate you.
      </Typography>
      <Typography
        align='center'
        variant='subtitle2'
      >
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt='Under development'
          className={classes.image}
          src='/images/undraw_authentication_fsn5.svg'
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color='primary'
          component={RouterLink}
          to='/'
          variant='outlined'
        >
          Back to home
        </Button>
      </div>
    </Page>
  );
};

export default Error401;
