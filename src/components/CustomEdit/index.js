// Formik form elements to edit project details, e.g. name, description, etc.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Button, Grid } from '@mui/material';
import FormikField from 'atoms/FormikFields';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEmpty from 'lodash/isEmpty';


// Takes a list of attributes to edit, e.g. name, description, etc. and renders a form with those attributes
const CustomEdit = (props) => {
  // fields contains details like { name: 'name', type: 'text', label: 'Name' }
  const { editObj, onAction, submitOnActionTypes, fields, submitError } = props;

  const formik = useFormik({
    initialValues: {
      ...fields.reduce((acc, field) => {
        if(field.name !== 'submitError')
          _set(acc, field.name, _get(editObj, field.name, ''));

        return {...acc};
      }, {})
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onAction({
        type: submitOnActionTypes,
        payload: {
          ...editObj,
          ...values
        },
      });
    },
  });

  // If there is a submit error, enable the submit button
  useEffect(() => {
    if(submitError > 0) {
      formik.setSubmitting(false);
    }
  }, [submitError]);

  if (_isEmpty(editObj)) {
    return <></>;
  }

  return (
    <Grid container spacing={2} sx={{mt: 2}}>
      {fields.map((formType) => (
        <Grid item xs={formType.xs ? formType.xs : 12} key={formType.name}>
          <FormikField
            fullWidth
            key={formType.name}
            formik={formik}
            {...formType}
          />
        </Grid>
      ))}
      {/* Submit button */}
      <Grid item xs={12}>
        <Button
          color='primary'
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

CustomEdit.propTypes = {
  editObj: PropTypes.object,
  onAction: PropTypes.func,
  submitOnActionTypes: PropTypes.array,
  fields: PropTypes.array,
  submitError: PropTypes.number,
};

CustomEdit.defaultProps = {
  submitError: 0,
};

export default CustomEdit;
