// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseForm.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
{%- if content.fields %}
import Form from 'molecules/Form';
import FormArray from 'molecules/FormArray';
{%- endif %}
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { ACTION_TYPES } from '../reducer';
{%- for js_header in additional_imports %}
{{ js_header }}
{%- endfor %}

{%- import 'common.macros' as common_macros %}

const fields = [
  {%- for field in content.fields %}
  {{field.jinja2Str()}},
  {%- endfor %}
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  options: {
    marginTop: theme.spacing(-2),
  },
}));

const {{content.name}} = (props) => {
  const { state, onAction } = props;
  const { classes } = useStyles();
  // { handleSubmit, watch, setValue, control, reset }
  const formMethods = useForm({
    defaultValues: { ...state.{{content.name}} },
  });

  useEffect(() => {
    formMethods.reset({...formMethods.control._formValues, ...state.{{content.name}} });
  }, [state.{{content.name}}, state.pageReset]);

  const handleSave = (pageFormData) => {
    let data;

    {% if content.presubmit_data_process %}data = {{content.presubmit_data_process}}(state, pageFormData);
    {%- else %}data = pageFormData; {% endif %}

    onAction({
      type: {{ common_macros.get_action_types(content.submit_action_type) }},
      payload: {
        ...data,
      }
    });
  };

  {%- if content.fields %}
  const Component = state.{{content.name}}.formType === 'array' ? FormArray : Form;
  {%- endif %}

  return (
    <FormProvider {...formMethods}>
      <Card className={classes.root}>
        <CardHeader title='{{content.form_header if content.form_header else content.name}}' />
        <CardContent className={classes.options}>
          {%- if content.fields %}
          <Grid className={classes.options} container spacing={2}>
            <Grid item xs>
              <Component
                fields={fields}
                control={formMethods.control}
                setValue={formMethods.setValue}
              />
            </Grid>
          </Grid>
          {%- endif %}
          {%- for child_component in child_components %}
          <Grid className={classes.options} container spacing={2}>
            <Grid item xs>
              <{{ child_component }}
                onAction={onAction}
                state={state}
                fields={fields}
                control={formMethods.control}
                setValue={formMethods.setValue} 
              />
            </Grid>
          </Grid>
          {%- endfor %}
          <Box mt={2} alignItems='center' justifyContent='center'>
            <Button fullWidth color='primary' variant='contained' onClick={formMethods.handleSubmit(handleSave)}>
              {{content.submit_button_text if content.submit_button_text else 'Submit'}}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

{{content.name}}.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default {{content.name}};
