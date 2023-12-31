/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { Button, TextField, Grid } from '@mui/material';

import useRouter from 'utils/useRouter';
import { login } from 'actions';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const useStyles = makeStyles()(theme => ({
  root: {},
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const LoginForm = props => {
  const { className, ...rest } = props;

  const { classes } = useStyles();
  // const router = useRouter();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formState.values));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={12}
        >
          <TextField
            error={hasError('email')}
            fullWidth
            helperText={hasError('email') ? formState.errors.email[0] : null}
            label='Email address'
            name='email'
            margin='normal'
            onChange={handleChange}
            value={formState.values.email || ''}
            variant='outlined'
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
        >
          <TextField
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label='Password'
            name='password'
            margin='normal'
            onChange={handleChange}
            type='password'
            value={formState.values.password || ''}
            variant='outlined'
          />
        </Grid>
        <Button
          className={classes.submitButton}
          color='secondary'
          disabled={!formState.isValid}
          size='large'
          type='submit'
          variant='contained'
        >
          Sign in
        </Button>
      </Grid>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;
