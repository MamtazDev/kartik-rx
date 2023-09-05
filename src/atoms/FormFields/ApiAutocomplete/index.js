import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useController } from 'react-hook-form';
import _map from 'lodash/map';

const ApiAutocompleteRx = props => {
  const { control, name, rules, defaultValue, setValue, fetchOptions, reFetchCount, fullWidth, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [fetchOptionsComplete, setFetchOptionsComplete] = useState(false);
  const loading = open && !fetchOptionsComplete;

  const {
    field: { ref, onChange, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const optionsData = await fetchOptions();

      if (active) {
        setValue(`api.data.${name}`, optionsData);
        setOptions(optionsData);
        setFetchOptionsComplete(true);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, fetchOptions, setValue, name]);

  useEffect(() => {
    setFetchOptionsComplete(false);
    setOptions([]);
  }, [reFetchCount]);

  const getLabel = (option) => {
    if(option.displayValue)
      return option.displayValue;
    
    if(option.value)
      return option.value;

    let label = '';
    _map(options, (x) => {
      if(x.value == option)
        label = x.displayValue;
    });

    return label;
  };

  // TODO: fix styles for non full width

  return (
    <Autocomplete
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      {...inputProps} ref={ref} {...rest}
      onChange={(e, data) => onChange(data.value)}
      options={options}
      getOptionLabel={getLabel}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          name={name}
          fullWidth={fullWidth}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

ApiAutocompleteRx.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  setValue: PropTypes.func,
  rules: PropTypes.object,
  label: PropTypes.string,
  
  fetchOptions: PropTypes.func,
  disabled: PropTypes.bool,
  disableCloseOnSelect: PropTypes.bool,
  multiple: PropTypes.bool,
  error: PropTypes.bool,
  // Refetch used to redo the fetch request.
  // This could be useful when options change based on state
  reFetchCount: PropTypes.number,
};

ApiAutocompleteRx.defaultProps = {
  reFetchCount: 0,
  multiple: false,
  disabled: false,
  disableCloseOnSelect: false,
  fullWidth: false,
};

export default ApiAutocompleteRx;
