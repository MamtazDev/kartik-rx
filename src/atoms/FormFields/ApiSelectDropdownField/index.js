import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { axiosInstance } from 'actions/helpers';
import MenuItem from '@mui/material/MenuItem';

import TextField from '@mui/material/TextField';
import _keyBy from 'lodash/keyBy';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';


const ApiSelectDropdownField = ({ control, name, rules, defaultValue, apiFields, ...rest }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const [data, setData] = useState([]);

  const setDropdownData = async function() {
    let request;
    if (apiFields.requestType == 'post')
      request = await axiosInstance.post(apiFields.endpoint);
    else
      request = await axiosInstance.get(apiFields.endpoint);

    if (apiFields.dataProcessor)
      setData(apiFields.dataProcessor(request.data));
    else
      setData(_keyBy(request.data, 'ids'));
    
    control.setValues(`api.data.${name}`, request.data);
  };
  
  useEffect(() => {
    setDropdownData();
  }, [setDropdownData]);

  return <TextField
    select
    {...inputProps}
    inputRef={ref}
    {...rest}
    InputLabelProps={{ shrink: true }}>
    {_isEmpty(data) ? <MenuItem key='loading'>Loading...</MenuItem> : _map(data, (option) => (
      <MenuItem key={option.key} value={option.value}>
        {option.displayValue ? option.displayValue : option.value}
      </MenuItem>
    ))
    }
  </TextField>;
};

ApiSelectDropdownField.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  setValue: PropTypes.func,
  rules: PropTypes.object,
  label: PropTypes.string,
  apiFields: PropTypes.shape({
    endpoint: PropTypes.string,
    requestType: PropTypes.string,
    dataProcessor: PropTypes.func,
  }),
  disabled: PropTypes.bool,
};

export default ApiSelectDropdownField;