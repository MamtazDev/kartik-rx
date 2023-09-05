import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import TextFieldRx from 'atoms/TextField';
import DetailedAge from './DOB';


const PatientDetails = (props) => {
  const { classes, control, setValue, errors, ...rest } = props;

  const [dateOfBirth, setDateOfBirth] = useState(moment.now());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [age, setAge] = useState(0);

  const handleCalendarOpen = () => {
    if (!props.disabled) setCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };

  const handleCalendarChange = () => { };

  const handleCalendarAccept = (date) => {
    setDateOfBirth(date);
    setValue('patient.dob', moment(date).format('DD/MM/YYYY'));
    calculateAge(date);
  };

  // When patient.dob is changed, useeffect to reset the dob and age
  useEffect(() => {
    if (props.patient.dob) {
      setDateOfBirth(moment(props.patient.dob, 'DD/MM/YYYY').toDate());
      calculateAge(moment(props.patient.dob, 'DD/MM/YYYY').toDate());
    }
  }, [props.patient.dob]);

  const calculateAge = (date) => {
    let age = moment(date).fromNow();
    setAge(age.substring(0, age.length - 3));
  };

  const calendarMinDate = moment().subtract(100 * 365, 'days');
  const birthdate = new Date('1990-03-15');
  return (
    <div {...rest} className={classes.divStyle}>
      <Card>
        <CardHeader title='Patient Details' />
        <CardContent className={classes.cardContentStyle}>
          <Grid className={classes.cardContentStyle} container spacing={2}>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                fullWidth
                name='patient.first_name'
                id='name'
                label='Patient First Name'
                disabled={props.disabled}
                rules={{
                  required: {
                    value: !props.disabled,
                    message: 'You must enter your name',
                  },
                  minLength: {
                    value: 3,
                    message: 'Minimum 3 characters required',
                  },
                  pattern: {
                    value: /^[a-z ,.'-]+$/i,
                    message: 'Invalid name',
                  },
                }}
                error={Boolean(errors?.patient?.first_name)}
                helperText={
                  errors?.patient?.first_name
                    ? errors.patient.first_name.message
                    : false
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                fullWidth
                name='patient.last_name'
                id='name'
                label='Patient Last Name'
                disabled={props.disabled}
                rules={{
                  required: {
                    value: !props.disabled,
                    message: 'You must enter last name',
                  },
                  minLength: {
                    value: 3,
                    message: 'Minimum 3 characters required',
                  },
                  pattern: {
                    value: /^[a-z ,.'-]+$/i,
                    message: 'Invalid name',
                  },
                }}
                error={Boolean(errors?.patient?.last_name)}
                helperText={
                  errors?.patient?.last_name
                    ? errors.patient.last_name.message
                    : false
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextFieldRx
                control={control}
                fullWidth
                id='mrno'
                name='patient.id'
                label='Mr.No'
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextFieldRx
                control={control}
                select
                fullWidth
                disabled={props.disabled}
                label='Gender'
                name='patient.gender'
              >
                <MenuItem value='M'>Male</MenuItem>
                <MenuItem value='F'>Female</MenuItem>
                <MenuItem value='O'>Other</MenuItem>
              </TextFieldRx>
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                minDate={calendarMinDate}
                maxDate={moment.now()}
                onAccept={handleCalendarAccept}
                onChange={handleCalendarChange}
                onClose={handleCalendarClose}
                open={calendarOpen}
                value={dateOfBirth}
                variant='dialog'
                renderInput={(params) => <TextFieldRx
                  {...params}
                  fullWidth
                  control={control}
                  label='DOB'
                  onClick={handleCalendarOpen}
                  disabled={props.disabled}
                  name='patient.dob'
                  rules={{
                    required: {
                      value: !props.disabled,
                      message: 'You must enter DOB',
                    },
                  }}
                  error={Boolean(errors?.patient?.dob)}
                  helperText={
                    errors?.patient?.dob
                      ? errors.patient.dob.message
                      : false
                  }
                />}
              />
            </Grid>
            <Grid item xs={3}>
              {/* <TextField fullWidth id='age' label='Age' value={age} disabled /> */}
              <DetailedAge birthdate={birthdate} />
            </Grid>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                fullWidth
                name='patient.father_name'
                id='fathername'
                label="Father's Name"
                disabled={props.disabled}
                rules={{
                  required: {
                    value: !props.disabled,
                    message: 'You must enter father\'s name',
                  },
                  minLength: {
                    value: 3,
                    message: 'Minimum 3 characters required',
                  },
                  pattern: {
                    value: /^[a-z ,.'-]+$/i,
                    message: 'Invalid name',
                  },
                }}
                error={Boolean(errors?.patient?.father_name)}
                helperText={
                  errors?.patient?.father_name
                    ? errors.patient.father_name.message
                    : false
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                fullWidth
                id='motherName'
                name='patient.mother_name'
                label="Mother's Name"
                disabled={props.disabled}
                rules={{
                  required: {
                    value: !props.disabled,
                    message: 'You must enter mother\'s name',
                  },
                  minLength: {
                    value: 3,
                    message: 'Minimum 3 characters required',
                  },
                  pattern: {
                    value: /^[a-z ,.'-]+$/i,
                    message: 'Invalid name',
                  },
                }}
                error={Boolean(errors?.patient?.mother_name)}
                helperText={
                  errors?.patient?.mother_name
                    ? errors.patient.mother_name.message
                    : false
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                fullWidth
                id='address'
                name='patient.address'
                label='Address'
                multiline
                disabled={props.disabled}
                rules={{
                  required: {
                    value: !props.disabled,
                    message: 'You must address',
                  },
                  minLength: {
                    value: 5,
                    message: 'Enter valid Address',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s,.'-]{3,}$/,
                    message: 'Enter valid Address',
                  },
                }}
                error={Boolean(errors?.patient?.address)}
                helperText={
                  errors?.patient?.address
                    ? errors.patient.address.message
                    : false
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextFieldRx
                control={control}
                fullWidth
                id='city'
                name='patient.city'
                label='City'
                disabled={props.disabled}
                rules={{
                  required: {
                    value: !props.disabled,
                    message: 'You must add city',
                  },
                  minLength: {
                    value: 3,
                    message: 'Enter valid city name',
                  },
                }}
                error={Boolean(errors?.patient?.city)}
                helperText={
                  errors?.patient?.city
                    ? errors.patient.city.message
                    : false
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextFieldRx
                control={control}
                fullWidth
                name='patient.phone'
                id='phone'
                label='Phone'
                type='string'
                disabled={true}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

PatientDetails.propTypes = {
  className: PropTypes.string,
  patient: PropTypes.object,
  onUpdate: PropTypes.func,
  control: PropTypes.object,
};

export default PatientDetails;
