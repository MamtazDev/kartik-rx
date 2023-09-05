import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _range from 'lodash/range';

import { makeStyles } from 'tss-react/mui';
import PageDataProcessedField from 'atoms/FormFields/PageDataProcessedField';
import rendererMapper from 'molecules/Form/rendererMapper';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles()((theme) => ({
  parentDiv: { marginBottom: theme.spacing(2) },
  formFieldStyle: { marginRight: theme.spacing(2), marginTop: theme.spacing(2) },
  divider: { marginTop: theme.spacing(2) },
}));


const renderField = (field, control, setValue, className) => {
  let Component;
  if(field.component === 'pageDataProcessed')
    Component = PageDataProcessedField;
  else
    Component = rendererMapper[field.component];

  return (
    <Component
      key={field.name}
      name={field.name}
      control={control}
      setValue={setValue}
      field={field}
      className={className}
      {...field.componentOptions}
    />
  );
};

const Form = props => {
  const { fields, control, setValue } = props;

  const formValues = control._formValues;
  const fieldsParent = formValues.fieldsParent ? formValues.fieldsParent : 'data';
  const {classes} = useStyles();

  return _map(_range(formValues.rowCount), (row) => (
    <div key={`${fieldsParent}_${row}`} className={classes.parentDiv}>
      {_map(fields, (field) => renderField({...field, name: `${fieldsParent}.${row}.${field.name}`}, control, setValue, classes.formFieldStyle))}
      <Divider className={classes.divider} />
    </div>
  )
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.string,
      componentOptions: PropTypes.object,
    }),
  ).isRequired,
  control: PropTypes.object.isRequired,
};

export default Form;
