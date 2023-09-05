import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import {DatePicker} from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

const DateFieldRx = ({ control, name, rules, defaultValue, setValue, onChangeHelper, ...rest }) => {
  const {
    field: { ref, onChange, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const onChangeWrapper = onChangeHelper ? (e) => {onChange(e); onChangeHelper(control, setValue);} : onChange;

  // return <TextField
  //   {...inputProps}
  //   onChange={onChangeWrapper}
  //   inputRef={ref}
  //   {...rest}
  //   type="date"
  //   InputLabelProps={{ shrink: true }}
  // />;

  return <DatePicker
    {...inputProps}
    inputRef={ref}
    onChange={onChangeWrapper}
    {...rest}
    fullWidth={false} 
    renderInput={(params) => <TextField {...params} />}
  />;
};

DateFieldRx.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  setValue: PropTypes.func,
  onChangeHelper: PropTypes.func,
  rules: PropTypes.object,
  format: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  label: PropTypes.string,

  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  showTodayButton: PropTypes.bool,
  disabled: PropTypes.bool,
  autoOk: PropTypes.bool,
};

DateFieldRx.defaultProps = {
  disablePast: false,
  disableFuture: false,
  showTodayButton: true,
  disabled: false,
  autoOk: true,
};

export default DateFieldRx;
