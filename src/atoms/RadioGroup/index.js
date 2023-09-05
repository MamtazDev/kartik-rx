import React from 'react';
import { useController } from 'react-hook-form';
import RadioGroup from '@mui/material/RadioGroup';

// const RadioGroupRx = ({ register, name, ...rest }) => {
//   console.log(name, register(name));
//   return <RadioGroup {...register(name)} {...rest} />;
// }

function RadioGroupRx({ control, name, rules, defaultValue, ...rest }) {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return <RadioGroup {...inputProps} inputRef={ref} {...rest} />;
}

export default RadioGroupRx;