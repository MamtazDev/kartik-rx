import React, { useEffect, useState } from 'react';
import { Box, Card, Tab, Tabs } from '@mui/material';
import TestDetailsForm from './components/TestDetailsForm';
import { Page, Header } from 'components';
import PatientDetails from './components/PatientDetails';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { axiosInstance } from 'actions/helpers';
import { useParams } from 'react-router-dom';

function ProcessTestDetails(props) {
  const [value, setValue] = useState(0);
  const [selectedTests, setSelectedTests] = useState([]);
  const urlParams = useParams();

  const patientDetails = props.location.state || {};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`/labReports/active_reports/${urlParams.id}`);

        setValue(data[0].id);
        setSelectedTests(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTestDetails();
  }, []);
  console.log(':::::: selectedTests', selectedTests, props.location, urlParams);

  const filterData = (el_id) => selectedTests?.filter((test) => test.id === el_id);

  return (
    <Page>
      <Header heading='Investigations' subHeading='Process Test Details' />
      <PatientDetails patientDetails={patientDetails} />
      <Card>
        <Box sx={{ width: '100%', typography: 'body1' }}> 
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label='Lab API tabs example'
                variant='scrollable'
                orientation='horizontal'
                scrollButtons='auto'
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {selectedTests?.map((test) => (
                  <Tab key={test.id} label={test.description} value={test.id} />
                ))}

              </TabList>
            </Box>

            {selectedTests?.map((test) => {
              return (
                <TabPanel key={test.id} value={test.id}>
                  <TestDetailsForm
                    data={filterData(test.id)}
                    patientDetails={patientDetails}
                  />
                </TabPanel>
              );
            })}
          </TabContext>
        </Box>
      </Card>
    </Page>
  );
}

export default ProcessTestDetails;
