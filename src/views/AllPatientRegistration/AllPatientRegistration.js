import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Page, Header } from 'components';
import { PatientActivity, SearchWith } from './components';
import axios from 'utils/axios';
import { axiosInstance } from 'actions/helpers';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import { LoaderContext } from 'globalContexts';

const useStyles = makeStyles()((theme) => ({
  cardStyle: {
    marginTop: theme.spacing(1),
  },
  gridStyle: {
    spacing: '{2}',
  },
  cardContentStyle: {
    marginTop: theme.spacing(-2),
    paddingTop: 0,
  },
  divStyle: {
    padding: 0,
  },
  ButtonStyle: {
    marginTop: theme.spacing(1),
  },
  DialogStyle: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  dialogCloseButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const AllPatientRegistration = () => {
  const { classes } = useStyles();
  const [title, setTitle] = useState('Today\'s Patient Activity');
  const [patientData, setPatientData] = useState([]);
  const [searchUrl, setSearchUrl] = useState('');
  const {setShowLoader} = useContext(LoaderContext);

  // useeffect for the search result
  useEffect(() => {
    setShowLoader(true);
    // set data into the patient data
    setPatient();
  }, []);

  const setPatient = async function () {
    try {
      let request = await axiosInstance.get('/patients/active');
      let todayregistrations = request.data;
      console.log(todayregistrations);
      await setPatientData(request.data);
      setShowLoader(false);
    } catch (error) {
      console.log(
        'error occured while fetching data from api/patient/todays_registrations api'
      );
      console.log(error);
    }
  };

  const onSearch = () => {
    async function searching() {
      //fetch the built url
      if (
        searchUrl.substring(searchUrl.indexOf('=') + 1) === '' ||
        searchUrl.substring(searchUrl.indexOf('=') + 1) === null
      ) {
        setTitle('Today\'s Patient Activity');
        setPatient();
        return;
      }
      try {
        let result = await axios.get(searchUrl);
        let resultData = result.data.result;
        await setPatientData(resultData);
        await setTitle('Search Result');
      } catch {
        setTitle('Today\'s Patient Activity');
        return;
      }
    }
    searching();
  };

  return (
    <PageHeaderWrapper title='All Patients' heading='All Patients' subHeading="Today's Registrations">
      <SearchWith
        setUrl={setSearchUrl}
        onSearch={onSearch}
        baseUrl='api/patient/search_with/'
      />
      <PatientActivity
        title={title}
        patientData={patientData}
        style={useStyles}
        className={classes.cardStyle}
      />
    </PageHeaderWrapper>
  );
};

export default AllPatientRegistration;
