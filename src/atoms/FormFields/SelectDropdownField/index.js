import React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';

import TextFieldRx from 'atoms/FormFields/TextField';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

const SelectDropdownField = ({ control, name, rules, defaultValue, componentData, ...rest }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return <TextFieldRx
    control={control}
    name={name}
    select
    {...rest}
  >
    {_isEmpty(componentData) ? <MenuItem>Loading...</MenuItem> : _map(componentData, (option) => (
      <MenuItem key={option.key} value={option.value}>
        {option.displayValue ? option.displayValue : option.value}
      </MenuItem>
    ))
    }
  </TextFieldRx>;
};

SelectDropdownField.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  rules: PropTypes.object,
  label: PropTypes.string,
  componentData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.any,
      displayValue: PropTypes.string,
    }),
  ),
  disabled: PropTypes.bool,
};

export default SelectDropdownField;