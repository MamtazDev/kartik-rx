import React, { useState, useEffect, useContext } from 'react';
import { Page, Header, SearchWithDate } from 'components';
import { axiosInstance } from 'actions/helpers';
import { timestampToAppDateTime } from 'utils/time';
import ShowCancelledTestsModal from './ShowCancelledTestsModal';
import CancelledModalContent from './CancelledModalContent';
import TableView from 'components/Table/Table';
import UrlFnInfoDialog from 'molecules/Dialogs/UrlFnInfoDialog';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LoaderContext } from 'globalContexts';
import { SearchWith } from 'views/AllPatientRegistration/components';

export const VIEW_TYPES = {
  PROCESS: 'PROCESS',
  CANCELLED: 'CANCELLED',
};

const PROCESS_COLUMNS = [
  { id: 'date', label: 'Adm Date', align: 'center' },
  { id: 'ip_id', label: 'IP No.', align: 'center' },
  { id: 'patient_id', label: 'MR No.', align: 'center' },
  { id: 'bill_id', label: 'Bill No.', align: 'center' },
  { id: 'patient_name', label: 'Patient Name', align: 'center' },
  { id: 'no_of_tests', label: 'No.of Test', align: 'center' },
  { id: 'no_of_test_completed', label: 'No.of Tests Processed', align: 'center' },
];

const CANCELLED_COLUMNS = [
  { id: 'date', label: 'Adm Date', align: 'center' },
  { id: 'ip_id', label: 'IP No.', align: 'center' },
  { id: 'patient_id', label: 'MR No.', align: 'center' },
  { id: 'bill_id', label: 'Bill No.', align: 'center' },
  { id: 'patient_name', label: 'Patient Name', align: 'center' },
  { id: 'no_of_tests', label: 'No.of Test', align: 'center' },
  { id: 'no_of_test_cancelled', label: 'No.of Tests Cancelled', align: 'center' },
];


const InvestigationsBase = (props) => {
  const { viewType } = props;
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [cancelledModalOpen, setCancelledModalOpen] = useState(false);

  const [searchUrl, setSearchUrl] = useState('');
  const [labReports, setLabReports] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('Current IP Patients');
  const [patientData, setPatientData] = useState([]);
  const {setShowLoader} = useContext(LoaderContext);


  const [modalContent, setModalContent] = useState({
    cancelledQueryUrl: '',
    editObj: {}
  });
  const history = useHistory();

  const handleCancelledModalOpen = (editObj) => {
    setModalContent({
      ...modalContent,
      cancelledQueryUrl: `/labReports/cancelled_reports/${editObj.bill_id}`,
      editObj,
    });
    setCancelledModalOpen(true);
  };
  const handleCancelledModalClose = () => setCancelledModalOpen(false);

  const handleProcessClick = (editObj) => {
    console.log('::::::::::: editObj ', editObj);
    let data = labReports.find((element) => element.id === editObj.id);
    history.push({
      pathname: `/Processtests/details/${editObj.bill_id}`,
      state: data,
    });
  };

  const getActionButtons = () => {
    if (viewType == VIEW_TYPES.PROCESS) {
      return [
        {
          label: 'Process',
          onClick: handleProcessClick,
          variant: 'contained',
          color: 'primary',
        },
      ];
    }

    return [
      {
        label: 'Cancelled',
        onClick: handleCancelledModalOpen,
        action_type: 'OPEN_DischargeDialog',
        color: 'primary',
        style: { marginRight: '20px' },
      },
    ];
  };

  const fetchLabReports = async () => {
    const params = new URLSearchParams({
      date_from: Date.now(),
      date_to: Date.now(),
      cancelled_only: viewType == VIEW_TYPES.CANCELLED,
    }).toString();

    try {
      setLoaded(false);
      const { data } = await axiosInstance.get(`/labReports/summary?${params}`);

      let result = data.map((item) => ({
        ...item,
        editObj: { ...item },
        date: timestampToAppDateTime(item.created_time),
      }));

      setLabReports(result);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelledReportsView = (data, editObj) => {
    return <CancelledModalContent
      data={data}
      editObj={editObj}
    />;
  };


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



  useEffect(() => {
    fetchLabReports();
  }, []);

  return (
    <Page title='All Patients'>
      <Header heading='Investigations' subHeading={viewType == VIEW_TYPES.PROCESS ? 'Process Tests' : 'Cancelled Tests'} />

      {viewType == VIEW_TYPES.CANCELLED &&
        <UrlFnInfoDialog
          isOpen={cancelledModalOpen}
          title='Cancelled Tests'
          onClose={handleCancelledModalClose}
          queryUrl={modalContent.cancelledQueryUrl}
          editObj={modalContent.editObj}
          displayFn={cancelledReportsView}
        />
      }

      <SearchWithDate
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        onClick={fetchLabReports}
      />

      <SearchWith
        setUrl={setSearchUrl}
        onSearch={onSearch}
        baseUrl='api/patient/ip/search_with/'
      />

      <TableView
        columns={viewType == VIEW_TYPES.PROCESS ? PROCESS_COLUMNS : CANCELLED_COLUMNS}
        tableData={labReports}
        loaded={loaded}
        pageTitle={'Process Tests'}
        displayPagination={true}
        actionButtons={getActionButtons()}
      />
    </Page>
  );
};

export default InvestigationsBase;
