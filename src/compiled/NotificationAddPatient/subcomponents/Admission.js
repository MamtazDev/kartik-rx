// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseForm.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
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


import AdmissionData from 'compiled/NotificationAddPatient/subcomponents/AdmissionData';
import addPatientHelperFns from 'compiled_helpers/NotificationAddPatient/helper';

const fields = [
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  options: {
    marginTop: theme.spacing(-2),
  },
}));

const Admission = (props) => {
  const { state, onAction } = props;
  const { classes } = useStyles();
  // { handleSubmit, watch, setValue, control, reset }
  const formMethods = useForm({
    defaultValues: { ...state.Admission },
  });

  useEffect(() => {
    formMethods.reset({...formMethods.control._formValues, ...state.Admission });
  }, [state.Admission, state.pageReset]);

  const handleSave = (pageFormData) => {
    let data;

    data = addPatientHelperFns.presubmit_data_process(state, pageFormData);

    onAction({
      type: [ACTION_TYPES.ADD_PATIENT_SUBMIT,],
      payload: {
        ...data,
      }
    });
  };

  return (
    <FormProvider {...formMethods}>
      <Card className={classes.root}>
        <CardHeader title='Details' />
        <CardContent className={classes.options}>
          <Grid className={classes.options} container spacing={2}>
            <Grid item xs>
              <AdmissionData
                onAction={onAction}
                state={state}
                fields={fields}
                control={formMethods.control}
                setValue={formMethods.setValue} 
              />
            </Grid>
          </Grid>
          <Box mt={2} alignItems='center' justifyContent='center'>
            <Button fullWidth color='primary' variant='contained' onClick={formMethods.handleSubmit(handleSave)}>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

Admission.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default Admission;