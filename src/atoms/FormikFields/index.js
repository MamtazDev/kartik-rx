// Formik form elements to edit project details, e.g. name, description, etc.

import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Radio, FormControl, FormControlLabel, Grid, Link, MenuItem, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import _get from 'lodash/get';

import ApiAutocomplete from './ApiAutocomplete';

// helper wrapper component to render a field based on the type with formik
const FormikField = ({ formik, type, ...props }) => {
  switch (type) {
  case 'text':
  case 'number':
    return <TextField
      {...props}
      {...(type === 'number' ? { type: 'number' } : {})}
      onChange={formik.handleChange}
      value={_get(formik.values, props.name)}
    />;
  case 'select':
    return (
      <TextField select {...props} onChange={formik.handleChange} value={_get(formik.values, props.name)}>
        {props.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  // Type autocomplete
  case 'autocomplete':
  case 'autocompleteMultiple':
    return (
      <Autocomplete
        {...props}
        onChange={(event, newValue) => {
          formik.setFieldValue(props.name, newValue);
        }}
        value={_get(formik.values, props.name)}
        {...(type === 'autocompleteMultiple' ? {
          multiple: true,
          filterSelectedOptions: true,
          isOptionEqualToValue: (option, value) => (value.value ? option.value === value.value : option.value === value),
        } : {})
        }
        renderInput={(params) => <TextField {...params} label={props.label} />}
      />
    );
  // API select dropdown
  case 'apiAutocomplete':
    return <ApiAutocomplete {...props} formik={formik} />;

  // File upload
  case 'file':
    return (
      <TextField
        {...props}
        onChange={(event) => {
          formik.setFieldValue(props.name, event.currentTarget.files[0]);
        }}
        InputLabelProps={{
          shrink: true,
        }}
        type='file'
      />
    );
  // Date picker
  case 'date':
    return (
      <DatePicker
        {...props}
        value={_get(formik.values, props.name)}
        onChange={(newValue) => {
          formik.setFieldValue(props.name, newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} helperText={params?.inputProps?.placeholder} fullWidth />
        )}
      />
    );
  // Link field
  case 'link':
    return (
      <Typography>
        <Link href={_get(formik.values, props.name)} target='_blank'>{props.label}</Link>
      </Typography>
    );
  // Hidden text field
  case 'hidden':
    return <TextField
      {...props}
      onChange={formik.handleChange}
      value={_get(formik.values, props.name)}
      type='hidden'
    />;
  
  // Radio
  case 'radio':
    return (
      <FormControl component='fieldset'>
        <Typography variant='subtitle2'>{props.label}</Typography>
        <Grid container xs={12}>
          {props.options.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Radio
                  checked={_get(formik.values, props.name) === option.value}
                  onChange={formik.handleChange}
                  value={option.value}
                  name={props.name}
                />
              }
              label={option.label}
            />
          ))}
        </Grid>
      </FormControl>
    );

  default:
    return null;
  }
};



FormikField.propTypes = {
  formik: PropTypes.object,
  type: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default FormikField;