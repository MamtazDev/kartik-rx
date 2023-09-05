import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Page, Header } from 'components';
import axios from 'utils/axios';
import { axiosInstance } from 'actions/helpers';
import { SearchWith } from 'views/AllPatientRegistration/components';
import PatientTable from './Components/PatientTable/PatientTable';
import { LoaderContext } from 'globalContexts';
import PageHeaderWrapper from 'components/PageHeaderWrapper';


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
  dialogTitle: {
    alignItems: 'center',
  },
  container3parts: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
  },
  statsItem: {
    padding: theme.spacing(3),
    flexGrow: 1,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const CurrentIP = () => {
  // const [searchResult, setSearchResult] = useState([]);
  // const [title, setTitle] = useState(
  //   `Current IP Patients in Hospital as on ${moment().format("MMM Do (dddd)")}`
  // );

  // useEffect(() => {
  //   async function setPatientData() {
  //     let response = await axios.get("api/patient/currentIP");
  //     await setSearchResult(response.data.result);
  //   }
  //   setPatientData();
  // }, [])
  const [title, setTitle] = useState('Current IP Patients');
  const [patientData, setPatientData] = useState([]);
  const [searchUrl, setSearchUrl] = useState('');
  const {setShowLoader} = useContext(LoaderContext);

  // useeffect for the search result
  useEffect(() => {
    setPatient();
    //set data into the patient data
  }, []);
  
  const setPatient = async function() {
    setShowLoader(true);
    try {
      let request = await axiosInstance.get('/patients/active?registration_type=IP');
      await setPatientData(request.data);
    } catch (error) {
      console.log(
        'error occured while fetching data from api/patient/todays_registrations api'
      );
      console.log(error);
    }
    setShowLoader(false);
  };

  const onSearch = () => {
    async function searching() {
      //fetch the built url
      if (
        searchUrl.substring(searchUrl.indexOf('=') + 1) === '' ||
        searchUrl.substring(searchUrl.indexOf('=') + 1) === null
      ) {
        setTitle('Current IP Patients');
        setPatient();
        return;
      }
      try {
        let result = await axios.get(searchUrl);
        let resultData = result.data.result;
        await setPatientData(resultData);
        await setTitle('Search Result');
      } catch {
        setTitle('Current IP Patients');
        return;
      }
    }
    searching();
  };

  const {classes} = useStyles();
  return (
    <PageHeaderWrapper title='All Patients' heading='In Patients' subHeading='Current In Patients'>
      <SearchWith
        setUrl={setSearchUrl}
        onSearch={onSearch}
        baseUrl='api/patient/ip/search_with/'
      />
      <PatientTable
        style={useStyles}
        className={classes.cardStyle}
        title={title}
        patientData={patientData}
      />
    </PageHeaderWrapper>
  );
};

export default CurrentIP;
