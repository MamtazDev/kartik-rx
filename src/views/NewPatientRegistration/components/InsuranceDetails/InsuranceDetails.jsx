import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import TextFieldRx from 'atoms/TextField';
import React from 'react';

const useStyles = makeStyles()((theme) => ({
  options: {
    marginTop: theme.spacing(-2),
  },
}));

const RoomDetails = (props) => {
  const {
    className,
    patient,
    consDoctor,
    errors,
    onSubmit,
    control,
    setValue,
    insurance,
    patienthasInsurance,
    ...rest
  } = props;

  const { classes } = useStyles();
  const handlePatientHasInsurance = (e) => {
    setValue('patienthasInsurance', e.target.value);
  };
  return (
    <div className={className}>
      <Card>
        <CardHeader title='Insurance Details' />
        <CardContent className={classes.options}>
          <Grid className={classes.options} container spacing={2}>
            <Grid item xs={12}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>
                  Does the patient have insurance claim ?
                </FormLabel>
                <RadioGroup
                  row
                  name='patientHasInsurance'
                  value={patienthasInsurance}
                  onChange={handlePatientHasInsurance}
                >
                  <FormControlLabel
                    value='Yes'
                    control={<Radio />}
                    label='Yes'
                  />
                  <FormControlLabel value='No' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                name='insurance.name'
                label='Insurance Name'
                fullWidth
                disabled={patienthasInsurance === 'No'}
                rules={{
                  required: {
                    value: patienthasInsurance === 'No' ? false : true,
                    message: 'You must enter insurance name',
                  },
                }}
                error={Boolean(errors?.insurance?.name)}
                helperText={
                  errors?.insurance?.name
                    ? errors?.insurance.name.message
                    : false
                }
              ></TextFieldRx>
            </Grid>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                name='insurance.number'
                label='Insurance Number'
                disabled={patienthasInsurance === 'No'}
                rules={{
                  required: {
                    value: patienthasInsurance === 'No' ? false : true,
                    message: 'You must enter insurance number',
                  },
                }}
                error={Boolean(errors?.insurance?.number)}
                helperText={
                  errors?.insurance?.number
                    ? errors?.insurance.number.message
                    : false
                }
                fullWidth
              ></TextFieldRx>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomDetails;
