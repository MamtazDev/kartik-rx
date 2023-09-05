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
import helperFns from 'compiled_helpers/ProcessTests/helper';

const fields = [
  {'component': 'date', 'componentOptions': {'label': 'From', 'fullWidth': true}, 'name': 'date_from', 'formFieldStyle': 'HALF'},
  {'component': 'date', 'componentOptions': {'label': 'To', 'fullWidth': true}, 'name': 'date_to', 'formFieldStyle': 'HALF'},
];

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  options: {
    marginTop: theme.spacing(-2),
  },
}));

const Search = (props) => {
  const { state, onAction } = props;
  const { classes } = useStyles();
  // { handleSubmit, watch, setValue, control, reset }
  const formMethods = useForm({
    defaultValues: { ...state.Search },
  });

  useEffect(() => {
    formMethods.reset({...formMethods.control._formValues, ...state.Search });
  }, [state.Search, state.pageReset]);

  const handleSave = (pageFormData) => {
    let data;

    data = helperFns.presubmit_data_process(state, pageFormData);

    onAction({
      type: [ACTION_TYPES.ON_SEARCH_DATA_LOAD,],
      payload: {
        ...data,
      }
    });
  };
  const Component = state.Search.formType === 'array' ? FormArray : Form;

  return (
    <FormProvider {...formMethods}>
      <Card className={classes.root}>
        <CardHeader title='Search' />
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
              Search
            </Button>
          </Box>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

Search.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default Search;