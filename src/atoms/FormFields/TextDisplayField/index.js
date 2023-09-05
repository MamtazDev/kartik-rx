import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { useWatch } from 'react-hook-form';
import Typography from '@mui/material/Typography';

const TextDisplayFieldRx = ({ control, name, rules, defaultValue, label, ...rest }) => {
  const displayValue = useWatch({
    control,
    name,
    defaultValue
  });

  return <>
    <Typography component='h3'
      gutterBottom
      variant='overline'>{label}</Typography>
    <Typography variant='body1'>{displayValue}</Typography>
  </>;
};

TextDisplayFieldRx.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  rules: PropTypes.object,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextDisplayFieldRx;