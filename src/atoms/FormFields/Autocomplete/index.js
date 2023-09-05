import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useController } from 'react-hook-form';
import _map from 'lodash/map';

const AutocompleteRx = props => {
  const { control, name, rules, defaultValue, setValue, componentData, fullWidth, ...rest } = props;
  const [open, setOpen] = useState(false);

  const {
    field: { ref, onChange, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const getLabel = (option) => {
    if(option.displayValue)
      return option.displayValue;
    
    if(option.value)
      return option.value;

    let label = '';
    _map(componentData, (x) => {
      if(x.value == option)
        label = x.displayValue;
    });

    return label;
  };

  return (
    <Autocomplete
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      {...inputProps}
      ref={ref}
      {...rest}
      onChange={(e, data) => onChange(data.value)}
      options={componentData}
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
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

AutocompleteRx.propTypes = {
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
};

AutocompleteRx.defaultProps = {
  multiple: false,
  disabled: false,
  disableCloseOnSelect: false,
  fullWidth: false,
};

export default AutocompleteRx;
