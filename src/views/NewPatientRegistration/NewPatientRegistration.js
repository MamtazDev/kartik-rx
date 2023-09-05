import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import {
  PatientDetails,
  DoctorDetails,
  // Verification,
  // PaymentDetails,
} from './components';
// import axios from 'utils/axios';
import { Search } from 'components/SearchBar/components';
import SearchResults from './components/SearchResults';
// import { set } from "immutable";
import { axiosInstance } from 'actions/helpers';
import { getSnackbarErrorObj, INITIAL_SNACKBAR_DATA } from 'atoms/snackbar/helpers';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import RoomDetails from './components/RoomDetails';
import InsuranceDetails from './components/InsuranceDetails';
import { useHistory } from 'react-router';
import _isEmpty from 'lodash/isEmpty';
import { PATIENT_TYPE } from 'utils/patient';
import { AddDialog } from 'molecules/Dialogs';
import ListDetailsDialog from 'molecules/Dialogs/ListDetailsDialog';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import { LoaderContext, SnackbarContext } from 'globalContexts';

const useStyles = makeStyles()((theme) => ({
  cardStyle: {
    marginTop: theme.spacing(1),
  },
  gridStyle: {
    spacing: '{2}',
  },
  cardContentStyle: {
    marginTop: theme.spacing(-2),
  },
  divStyle: {
    width: '100%',
  },
  ButtonStyle: {
    marginTop: theme.spacing(1),
  },
  successDialogTypography: {
    textAlign: 'center',
    fontSize: '24px',
    textTransform: 'capitalize',
    fontWeight: '600',
    color: '#3f51b5',
  },
}));

const INITIAL_STATE = {
  selectedPatient: undefined,
  open_dialogue: false,
  searchResults: [],
  openSuccessDialog: false,
  mrNumber: undefined,
  ipNumber: undefined,
};

const patientRegistrationTypes = [PATIENT_TYPE.OP, PATIENT_TYPE.IP];

const defaultPatient = {
  first_name: '',
  last_name: '',
  dob: moment().format('DD/MM/YYYY'),
  father_name: '',
  mother_name: '',
  email: '',
  gender: 'M',
  mrno: '',
  city: '',
  address: '',
  phone: '',
  id: '',
};

// TODO: move to formik
const NewPatientRegistration = (props) => {
  const { classes } = useStyles();
  const history = useHistory();
  const [selectedMrNo, setSelectedMrNo] = useState(props.mrno ? props.mrno : null);
  const [patientDetailsDisabled, setPatientDetailsDisabled] = useState(true);
  const [formState, setFormState] = useState({ searchText: '' });
  const {setShowLoader} = useContext(LoaderContext);
  const {setSnackbarData} = useContext(SnackbarContext);

  const [pageData, setPageData] = useState({ ...INITIAL_STATE });
  const [
    selectedPatientRegistrationType,
    setSelectedPatientRegistrationType,
  ] = useState(patientRegistrationTypes[0]);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patient: { ...defaultPatient },
      consDoctor: {},
      consDoctorName: '',
      registration_info: {
        registration_type: patientRegistrationTypes[0],
        amount: '1',
        roomChargesPerDay: '',
        consultation_charges: '',
        room_type: '',
        roomNumber: '',
      },
      patienthasInsurance: '',
      insurance: {
        number: '',
        name: '',
      },
    },
  });

  const pageFormData = watch();

  useEffect(() => {
    // fetch the patient & put that patient data into patient form
    if (selectedMrNo) {
      setPatientDetailsDisabled(true);

      for (let patient_idx in pageData.searchResults) {
        if (pageData.searchResults[patient_idx].mrno === selectedMrNo) {
          console.log(pageData.searchResults[patient_idx]);

          setValue('patient', pageData.searchResults[patient_idx], {
            shouldDirty: true,
          });
          setPageData((prevValues) => ({
            ...prevValues,
            selectedPatient: pageData.searchResults[patient_idx],
          }));
          break;
        }
      }
    }
  }, [selectedMrNo, pageData.searchResults, setValue]);

  const handleSave = (pageFormData) => {
    let targetUrl = '/patients/new_and_register';
    if (pageFormData.patient.id) targetUrl = '/patients/register';

    const dataObj = {
      patient: {
        ...pageFormData.patient,
        dob: moment(pageFormData.dob).unix(),
      },
      doctor: pageFormData.consDoctor,
      registration_info: pageFormData.registration_info,
    };

    if (pageFormData.patienthasInsurance == 'Yes') {
      dataObj.insurance = pageFormData.insurance;
    }

    setShowLoader(true);
    axiosInstance
      .post(targetUrl, dataObj)
      .then((data) => {
        // TODO: redirect to home page

        setShowLoader(false);
        setPageData({
          ...pageData,
          openSuccessDialog: true,
          mrNumber: data.data.patient_id,
          ipNumber: data.data.ipno,
        });
      })
      .catch((e) => {
        setShowLoader(false);
        if (e.response.data?.detail) {
          setSnackbarData(getSnackbarErrorObj(e.response.data.detail));
        } else {
          setSnackbarData(getSnackbarErrorObj(e.message));
        }
      });
  };

  const handleSearch = (searchText) => {
    //call search api
    if (
      !/^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(
        searchText
      )
    ) {
      setPhoneNumberError(true);
      return;
    }

    async function setSearch() {
      setShowLoader(true);
      let searchResult = await axiosInstance.post('/patients/search', {
        phoneno: searchText,
      });
      let patients = searchResult.data;
      setPageData((prevValues) => ({
        ...prevValues,
        searchResults: patients,
        patient: { ...prevValues.patient, phoneno: searchText },
      }));
      setShowLoader(false);
    }

    setValue('patient.phone', searchText);
    setPhoneNumberError(false);
    setSearch();
    setPageData((prevValues) => ({ ...prevValues, open_dialogue: true }));
  };

  const handleDialogClose = () => {
    setPageData((prevValues) => ({ ...prevValues, open_dialogue: false }));
  };

  const handleSuccessDialogClose = () => {
    setPageData({ ...pageData, openSuccessDialog: false });
    reset();
  };

  useEffect(() => {
    if (selectedMrNo) {
      const temp = pageData.searchResults.filter(
        (res) => res.mrno === selectedMrNo
      );
      if (temp.length > 0) {
        setValue('patient.gender', temp[0].gender);
        setValue('patient.first_name', temp[0].first_name);
        setValue('patient.last_name', temp[0].last_name);
        setValue('patient.mrno', temp[0].mrno);
        setValue('patient.phone', temp[0].phone);
      }
    }
  }, [selectedMrNo, pageData.searchResults, setValue]);

  const gotoBillingPage = () => {
    history.push(
      `/create_ip_op_lab?${pageFormData.registration_info.registration_type !==
        PATIENT_TYPE.OP
        ? `ipNo=${pageData.ipNumber}`
        : `mrNo=${pageData.mrNumber}`
      }`
    );
  };

  return (
    <PageHeaderWrapper title='New Patient' heading='New Patient' subHeading='New Patient Registration'>

      <Grid container alignItems='center'>
        <Typography
          variant='h5'
          component='h2'
          style={{ marginRight: '10px' }}
        >
          Select patient registration type :
        </Typography>
        <RadioGroup row name='row-radio-buttons-group'>
          {patientRegistrationTypes.map((type, key) => (
            <FormControlLabel
              value={type}
              control={
                <Radio
                  checked={selectedPatientRegistrationType === type}
                  onChange={(e) => {
                    setSelectedPatientRegistrationType(e.target.value);
                    setValue(
                      'registration_info.registration_type',
                      e.target.value
                    );
                  }}
                />
              }
              label={type}
              key={key}
            />
          ))}
        </RadioGroup>
      </Grid>

      <Search
        placeholder="Enter Patient's Phone Number"
        className={classes.cardStyle}
        onSearch={handleSearch}
        value={formState}
        setValue={setFormState}
      />
      {phoneNumberError && (
        <Typography style={{ color: 'red', marginTop: '2px' }}>
          Please Enter Valid Number
        </Typography>
      )}
      <br />

      <PatientDetails
        className={classes.cardStyle}
        classes={classes}
        disabled={patientDetailsDisabled}
        patient={pageFormData.patient}
        control={control}
        setValue={setValue}
        errors={errors}
      />
      {/* <Verification className={classes.cardStyle} classes={classes} /> */}
      <DoctorDetails
        className={classes.cardStyle}
        classes={classes}
        doctor={pageFormData.doctor}
        setValue={setValue}
        control={control}
        errors={errors}
      />
      {selectedPatientRegistrationType === PATIENT_TYPE.IP && (
        <>
          <RoomDetails
            className={classes.cardStyle}
            control={control}
            setValue={setValue}
            registration_info={pageFormData.registration_info}
            errors={errors}
            selectedPatientRegistrationType={selectedPatientRegistrationType}
          />
          <InsuranceDetails
            errors={errors}
            className={classes.cardStyle}
            control={control}
            setValue={setValue}
            insurance={pageFormData.insurance}
            patienthasInsurance={pageFormData.patienthasInsurance}
          />
        </>
      )}

      {/* <PaymentDetails
        className={classes.cardStyle}
        classes={classes}
        consDoctor={pageFormData.consDoctor}
        patient={pageFormData.patient}
        registration_info={pageFormData.registration_info}
        onSubmit={handleSubmit(handleSave)}
        control={control}
      /> */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <Button
            color='primary'
            variant='contained'
            fullWidth
            onClick={handleSubmit(handleSave)}
          >
            Proceed to Billing
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            color='primary'
            fullWidth
            variant='outlined'
            onClick={() => {
              reset();
              setFormState({ searchText: '' });
            }}
          >
            Reset / Cancel
          </Button>
        </Grid>
      </Grid>

      {/* Dialog for displaying Search results */}
      <AddDialog
        isOpen={pageData.open_dialogue}
        onClose={handleDialogClose}
        title='Search Results'
        displayActions={false}
      >
        <SearchResults
          onDialogueChange={(val) =>
            setPageData((prevValues) => ({
              ...prevValues,
              open_dialogue: val,
            }))
          }
          patients={pageData.searchResults}
          setSelectedMrNo={(selectedMrNoVal) => {
            if (!selectedMrNoVal)
              setPatientDetailsDisabled(false);

            setSelectedMrNo(selectedMrNoVal);
          }}
        />
      </AddDialog>

      {/* Dialog for displaying Success Message */}
      <ListDetailsDialog
        isOpen={pageData.openSuccessDialog}
        onClose={handleSuccessDialogClose}
        title='Registration Successful'
        displayActions={false}
        listData={[
          {label: 'MR no', value: pageData.mrNumber},
          (pageFormData.registration_info.registration_type !== PATIENT_TYPE.OP) && {label: 'IP no', value: pageData.ipNumber},
        ]}
        onButtonClick={gotoBillingPage}
      />

    </PageHeaderWrapper>
  );
};

NewPatientRegistration.propTypes = {
  className: PropTypes.string,
  patient: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default NewPatientRegistration;
