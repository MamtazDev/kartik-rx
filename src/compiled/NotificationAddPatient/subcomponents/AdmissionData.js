// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: Form/Base.js)

import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from 'tss-react/mui';
import Form from 'molecules/Form';
import addPatientHelperFns from 'compiled_helpers/NotificationAddPatient/helper';

const fields = [
  {'component': 'date', 'componentOptions': {'label': 'Date of Admission', 'fullWidth': true}, 'name': 'patient.doa'},
  {'component': 'text', 'componentOptions': {'label': 'Patient IP No.', 'fullWidth': true}, 'name': 'registration_info.ipno'},
  {'component': 'text', 'componentOptions': {'label': 'Patient Name', 'fullWidth': true}, 'name': 'patient.first_name'},
  {'component': 'apiAutocomplete', 'name': 'doctor.ids', 'componentOptions': {'label': 'Doctor Name', 'fullWidth': true, 'fetchOptions': addPatientHelperFns.getDoctorsForAutocompleteFn}},
  {'component': 'apiAutocomplete', 'name': 'registration_info.room_id', 'componentOptions': {'label': 'Room', 'fullWidth': true, 'fetchOptions': addPatientHelperFns.getRoomsForAutocompleteFn}},
];

// const useStyles = makeStyles()((theme) => ({
// }));

const AdmissionData = (props) => {
  const { control, setValue } = props;
  // const { classes } = useStyles();

  return (
    <Form
      fields={fields}
      control={control}
      setValue={setValue}
    />
  );
};

AdmissionData.propTypes = {
  setValue: PropTypes.func,
  control: PropTypes.object,
};

export default AdmissionData;