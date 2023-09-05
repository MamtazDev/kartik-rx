import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  Link,
  Grid
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import { Page } from 'components';
import gradients from 'utils/gradients';
import { LoginForm } from './components';
import { Facebook as FacebookIcon } from 'icons/facebook';
import { Google as GoogleIcon } from 'icons/google';

const useStyles = makeStyles()(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.sm,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Login = () => {
  const { classes } = useStyles();

  return (
    <Page
      className={classes.root}
      title='Login'
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography
            gutterBottom
            variant='h3'
          >
            Sign in
          </Typography>
          <Typography variant='subtitle2'>
            Sign in on the internal platform
          </Typography>
          <LoginForm className={classes.loginForm} />
          <Divider className={classes.divider} />
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <Button
                color='info'
                fullWidth
                startIcon={<FacebookIcon />}
                // onClick={() => formik.handleSubmit()}
                size='large'
                variant='contained'
              >
                Login with Facebook
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Button
                color='error'
                fullWidth
                // onClick={() => formik.handleSubmit()}
                size='large'
                startIcon={<GoogleIcon />}
                variant='contained'
              >
                Login with Google
              </Button>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Link
            align='center'
            color='secondary'
            component={RouterLink}
            to='/auth/register'
            underline='always'
            variant='subtitle2'
          >
            Don't have an account?
          </Link>
        </CardContent>
      </Card>
    </Page>
  );
};

export default Login;
