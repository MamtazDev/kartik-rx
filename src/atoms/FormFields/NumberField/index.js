import React from 'react';
import PropTypes from 'prop-types';
import { useController, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const NumberFieldRx = ({ control, name, rules, defaultValue, setValue, onChangeHelper, ...rest }) => {
  const {
    field: { ref, onChange, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const onChangeWrapper = onChangeHelper ? (e) => {onChange(e); onChangeHelper(control, setValue);} : onChange;

  // TODO: InputLabelProps isn't preferred, but works for now. When a value in the input
  //   field is updated by external update, e.g. setValue, the label of the field doesn't move up.
  return <TextField
    {...inputProps}
    onChange={onChangeWrapper}
    inputRef={ref}
    {...rest}
    type='number'
    InputLabelProps={{ shrink: true }}
  />;
};

NumberFieldRx.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  setValue: PropTypes.func,
  rules: PropTypes.object,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default NumberFieldRx;