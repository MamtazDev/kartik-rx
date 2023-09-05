import React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const TextFieldRx = ({ control, name, rules, defaultValue, setValue, onChangeHelper, ...rest }) => {
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
    InputLabelProps={{ shrink: true }}
  />;
};

TextFieldRx.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  setValue: PropTypes.func,
  onChangeHelper: PropTypes.func,
  rules: PropTypes.object,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextFieldRx;