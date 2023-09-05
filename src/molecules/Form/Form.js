import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';

import { makeStyles } from 'tss-react/mui';
import PageDataProcessedField from 'atoms/FormFields/PageDataProcessedField';
import rendererMapper from './rendererMapper';

export const DISPLAY_STYLES = {
  HALF: 'HALF',
  FULL: 'FULL',
};

const getFormFieldStyle = (displayStyle, classes) => {
  if (displayStyle === DISPLAY_STYLES.HALF) {
    return classes.halfFormFieldStyle;
  }

  return classes.formFieldStyle;
};

const useStyles = makeStyles()((theme) => ({
  formFieldStyle: { marginBottom: theme.spacing(2) },
  halfFormFieldStyle: {
    marginBottom: theme.spacing(2),
    display: 'inline-block',
    width: '50%',
  },
}));

const renderField = (field, control, setValue, className) => {
  let Component;
  if (field.component === 'pageDataProcessed')
    Component = PageDataProcessedField;
  else
    Component = rendererMapper[field.component];

  return (
    <div key={field.name} className={className}>
      <Component
        key={field.name}
        name={field.name}
        control={control}
        setValue={setValue}
        field={field}
        {...field.componentOptions}
      />
    </div>
  );
};

const Form = props => {
  const { fields, control, setValue } = props;
  const { classes } = useStyles();

  return _map(fields, (field) => renderField(field, control, setValue, getFormFieldStyle(
    field.formFieldStyle, classes)
  ));
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
