// Formik form elements to edit project details, e.g. name, description, etc.

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@mui/material';
import _get from 'lodash/get';
import _range from 'lodash/range';
import _map from 'lodash/map';
import FormikField from './index';

// helper wrapper component to render a field based on the type with formik
const ListField = (props) => {
  // perRowFields is an array of objects, each object is a field
  // e.g. [{ type: 'text', name: 'name', label: 'Name' }, { type: 'text', name: 'description', label: 'Description' }]
  const { formik, baseSectionName, perRowFields, defaultadditem, additem, ...rest } = props;

  return (
    <>
      {_map(_range(_get(formik.values, baseSectionName).length), (index) => (
        <Grid container spacing={2} mt={0.25} key={`${baseSectionName}[${index}]`}>
          {perRowFields.map((field) => (
            <Grid item xs={field.xs ? field.xs : 12} key={`${baseSectionName}[${index}].${field.name}`}>
              <FormikField formik={formik} {...rest} {...field} name={`${baseSectionName}[${index}].${field.name}`} />
            </Grid>
          ))}
        </Grid>
      ))}
      {additem && (
        <Grid container mt={0.25} spacing={2} key={`${baseSectionName}.addItem`}>
          <Grid item xs={5}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                formik.setFieldValue(
                  baseSectionName,
                  [..._get(formik.values, baseSectionName), {...defaultadditem}]
                );
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

ListField.propTypes = {
  formik: PropTypes.object,
  perRowFields: PropTypes.array,
  baseSectionName: PropTypes.string,
  defaultadditem: PropTypes.object,
  additem: PropTypes.bool,
};

ListField.defaultProps = {
  defaultadditem: {},
  additem: false,
};

export default ListField;