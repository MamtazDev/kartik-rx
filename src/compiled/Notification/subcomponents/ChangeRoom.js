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


import addPatientHelperFns from 'compiled_helpers/NotificationAddPatient/helper';
import helperFns from 'compiled_helpers/Notification/NotificationHelper';

const fields = [
  {'component': 'apiAutocomplete', 'name': 'room.id', 'componentOptions': {'label': 'Room', 'fullWidth': true, 'fetchOptions': addPatientHelperFns.getRoomsForAutocompleteFn}},
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  options: {
    marginTop: theme.spacing(-2),
  },
}));

const ChangeRoom = (props) => {
  const { state, onAction } = props;
  const { classes } = useStyles();
  // { handleSubmit, watch, setValue, control, reset }
  const formMethods = useForm({
    defaultValues: { ...state.ChangeRoom },
  });

  useEffect(() => {
    formMethods.reset({...formMethods.control._formValues, ...state.ChangeRoom });
  }, [state.ChangeRoom, state.pageReset]);

  const handleSave = (pageFormData) => {
    let data;

    data = helperFns.changeRoomPresubmitDataProcessFn(state, pageFormData);

    onAction({
      type: [ACTION_TYPES.CHANGEROOM_SUBMIT,],
      payload: {
        ...data,
      }
    });
  };
  const Component = state.ChangeRoom.formType === 'array' ? FormArray : Form;

  return (
    <FormProvider {...formMethods}>
      <Card className={classes.root}>
        <CardHeader title='Available Rooms' />
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

ChangeRoom.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default ChangeRoom;