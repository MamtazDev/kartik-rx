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
  {'component': 'number', 'name': 'dischargeDetails.billno', 'componentOptions': {'label': 'Bill No.', 'fullWidth': true}},
  {'component': 'number', 'name': 'dischargeDetails.discount', 'componentOptions': {'label': 'Discount', 'fullWidth': true, 'onChangeHelper': helperFns.onDiscountChangeFn}},
  {'component': 'textDisplay', 'name': 'dischargeDetails.room_amount', 'componentOptions': {'label': 'Room Fee', 'fullWidth': true, 'disabled': true}},
  {'component': 'textDisplay', 'name': 'dischargeDetails.doctor_amount', 'componentOptions': {'label': 'Doctor Fee', 'fullWidth': true, 'disabled': true}},
  {'component': 'textDisplay', 'name': 'dischargeDetails.total_amount', 'componentOptions': {'label': 'Total Amount', 'fullWidth': true, 'disabled': true}},
  {'component': 'textDisplay', 'name': 'dischargeDetails.final_amount', 'componentOptions': {'label': 'Final Amount', 'fullWidth': true, 'disabled': true}},
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  options: {
    marginTop: theme.spacing(-2),
  },
}));

const DischargeDialogDetails = (props) => {
  const { state, onAction } = props;
  const { classes } = useStyles();
  // { handleSubmit, watch, setValue, control, reset }
  const formMethods = useForm({
    defaultValues: { ...state.DischargeDialogDetails },
  });

  useEffect(() => {
    formMethods.reset({...formMethods.control._formValues, ...state.DischargeDialogDetails });
  }, [state.DischargeDialogDetails, state.pageReset]);

  const handleSave = (pageFormData) => {
    let data;

    data = helperFns.dischargeEditPresubmitDataProcessFn(state, pageFormData);

    onAction({
      type: [ACTION_TYPES.DISCHARGE_PATIENT_SUBMIT,],
      payload: {
        ...data,
      }
    });
  };
  const Component = state.DischargeDialogDetails.formType === 'array' ? FormArray : Form;

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

DischargeDialogDetails.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default DischargeDialogDetails;