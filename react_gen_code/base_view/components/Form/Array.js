// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: Form/Array.js)

import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from 'tss-react/mui';
import FormArray from 'molecules/FormArray';

{%- for js_header in additional_imports %}
{{ js_header }}
{%- endfor %}

const fields = [
  {%- for field in content.fields %}
  {{field.jinja2Str()}},
  {%- endfor %}
];

// const useStyles = makeStyles((theme) => ({
// }));

const {{content.name}} = (props) => {
  const { control, setValue } = props;
//   const { classes } = useStyles();

  return (
    <FormArray
      fields={fields}
      control={control}
      setValue={setValue}
    />
  );
};

{{content.name}}.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default {{content.name}};
