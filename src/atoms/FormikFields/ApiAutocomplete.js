import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from 'actions/helpers';

import TextField from '@mui/material/TextField';
import _get from 'lodash/get';
import { Autocomplete } from '@mui/material';


const ApiAutocomplete = ({ formik, api, dataProcessor, type, ...props }) => {
  const [options, setOptions] = useState([]);

  const setDropdownData = () => {
    let req = api.type === 'post' ? axiosInstance.post(api.url) : axiosInstance.get(api.url);

    req.then((res) => {
      if(dataProcessor)
        setOptions(dataProcessor(res.data));
      else
        setOptions(res.data);
    }).catch((err) => {
      console.log(`${props.name} err: `, err);
    });
  };
  
  useEffect(() => {
    setDropdownData();
  }, [setDropdownData]);

  return (
    <Autocomplete
      {...props}
      onChange={(event, newValue) => {
        formik.setFieldValue(props.name, newValue);
      }}
      value={_get(formik.values, props.name)}
      options={options}
      {...(type === 'apiAutocompleteMultiple' ? {
        multiple: true,
        filterSelectedOptions: true,
        isOptionEqualToValue: (option, value) => (option.value === value.value),
      } : {})
      }
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};

ApiAutocomplete.propTypes = {
  formik: PropTypes.object,
  options: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  api: PropTypes.object,
  dataProcessor: PropTypes.func,
  type: PropTypes.string,
};

export default ApiAutocomplete;