import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';

import axios from 'utils/axios';
import _keyBy from 'lodash/keyBy';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import { axiosInstance } from 'actions/helpers';
import { doctorName } from 'utils/patient';
import TextFieldRx from 'atoms/TextField';

const useStyles = makeStyles()((theme) => ({
  root: {
    // width: theme.breakpoints.values.lg,
    // maxWidth: '100%',
    // margin: '0 auto',
    // padding: theme.spacing(3, 3, 6, 3)
  },
  options: {
    marginTop: theme.spacing(-2),
  },
  patientType: {
    marginTop: theme.spacing(1),
  },
}));

const DoctorDetails = (props) => {
  const { className, control, errors, doctor, setValue, ...rest } = props;
  const [registrationType, setRegistrationType] = useState('self');
  const [consultingDoctors, setConsultingDoctors] = useState({});
  const [referralDoctors, setReferralDoctors] = useState({});

  useEffect(() => {
    async function fetchData() {
      //fetch doctor list for cons
      let docsList = await (await axios.get('/api/consultationDoctor')).data
        .doctors;
      setReferralDoctors(docsList);

      let consulting = await (await axiosInstance.get('/doctors/')).data;
      setConsultingDoctors(_keyBy(consulting, 'ids'));
    }
    //set in the cons options
    //fetch for referral
    //set in the options for reff
    fetchData();
  }, []);

  const {classes} = useStyles();

  const handleTypeChange = (event) => {
    setRegistrationType(event.target.value);
  };

  const handleConsDoctorSelect = (details) => {
    setValue('consDoctor', details);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardHeader title='Doctor Details' />
        <CardContent className={classes.options}>
          <Grid className={classes.options} container spacing={2}>
            <Grid item xs={12}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Source of Registration</FormLabel>
                <RadioGroup
                  row
                  aria-label='sourceOfRegistration'
                  name='sourceOfRegistration'
                  value={registrationType}
                  onChange={handleTypeChange}
                >
                  <FormControlLabel
                    value='self'
                    control={<Radio />}
                    label='Self'
                  />
                  <FormControlLabel
                    value='referred'
                    control={<Radio />}
                    label='Referred'
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs>
              <TextFieldRx
                control={control}
                name='refDoctor'
                select
                label="Referral Doctor's Name"
                fullWidth
                disabled={registrationType === 'self' ? true : false}
                rules={{
                  required: {
                    value: registrationType === 'self' ? false : true,
                    message: 'You must enter reffered doctor\'s name',
                  },
                }}
                error={Boolean(errors?.refDoctor)}
                helperText={
                  errors?.refDoctor ? errors?.refDoctor.message : false
                }
              >
                {_isEmpty(referralDoctors) ? (
                  <MenuItem>Loading...</MenuItem>
                ) : (
                  _map(referralDoctors, (option) => (
                    <MenuItem key={option.name} value={option.name}>
                      Dr. {option.name}
                    </MenuItem>
                  ))
                )}
              </TextFieldRx>
            </Grid>
            <Grid item xs>
              <TextFieldRx
                control={control}
                name='consDoctorName'
                select
                label="Consulting Doctor's Name"
                fullWidth
                rules={{
                  required: {
                    value: true,
                    message: 'You must enter doctor\'s name',
                  },
                }}
                error={Boolean(errors?.consDoctor)}
                helperText={
                  errors?.consDoctor
                    ? errors?.consDoctor.message
                    : false
                }
              >
                {_isEmpty(consultingDoctors) ? (
                  <MenuItem>Loading...</MenuItem>
                ) : (
                  _map(consultingDoctors, (details, ids) => (
                    <MenuItem
                      key={ids}
                      value={doctorName(details)}
                      onClick={() => handleConsDoctorSelect(details)}
                    >
                      {doctorName(details)}
                    </MenuItem>
                  ))
                )}
              </TextFieldRx>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

DoctorDetails.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
};

export default DoctorDetails;
