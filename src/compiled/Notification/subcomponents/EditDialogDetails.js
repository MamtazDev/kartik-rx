// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseForm.js)

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import Form from 'molecules/Form';
import FormArray from 'molecules/FormArray';
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


import helperFns from 'compiled_helpers/Notification/NotificationHelper';

const fields = [
  {'component': 'date', 'name': 'startdate', 'componentOptions': {'label': 'Start Date'}},
  {'component': 'date', 'name': 'enddate', 'componentOptions': {'label': 'End Date'}},
  {'component': 'pageDataProcessed', 'baseComponent': 'autocomplete', 'name': 'room_id', 'componentOptions': {'label': 'Room', 'fullWidth': true, 'pageFormDataProcessor': helperFns.roomNamesFromDialogStateFn}},
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  options: {
    marginTop: theme.spacing(-2),
  },
}));

const EditDialogDetails = (props) => {
  const { state, onAction } = props;
  const { classes } = useStyles();
  // { handleSubmit, watch, setValue, control, reset }
  const formMethods = useForm({
    defaultValues: { ...state.EditDialogDetails },
  });

  useEffect(() => {
    formMethods.reset({...formMethods.control._formValues, ...state.EditDialogDetails });
  }, [state.EditDialogDetails, state.pageReset]);

  const handleSave = (pageFormData) => {
    let data;

    data = helperFns.dischargeEditPresubmitDataProcessFn(state, pageFormData);

    onAction({
      type: [ACTION_TYPES.EDIT_PATIENT_SUBMIT,],
      payload: {
        ...data,
      }
    });
  };
  const Component = state.EditDialogDetails.formType === 'array' ? FormArray : Form;

  return (
    <FormProvider {...formMethods}>
      <Card className={classes.root}>
        <CardHeader title='Details' />
        <CardContent className={classes.options}>
          <Grid className={classes.options} container spacing={2}>
            <Grid item xs>
              <Component
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

EditDialogDetails.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default EditDialogDetails;