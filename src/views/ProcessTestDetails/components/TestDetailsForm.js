import React, { useRef, useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography, Input, Box } from '@mui/material';
import ReactToPrint from 'react-to-print';
import TableView from 'components/Table/Table';
import PatientDetails from './PatientDetails';
import _map from 'lodash/map';
import LabReport from '../CreateReport/LabReport';
import { axiosInstance } from 'actions/helpers';
import { patientName } from 'utils/patient';
import { calculateAge, timestampToAppDateTime } from 'utils/time';
import Modal from '@mui/material/Modal';
// import ReactToPrint from 'react-to-print';


const COLUMNS = [
  { id: 'name', label: 'TEST', align: 'left' },
  { id: 'input', label: 'RESULT', align: 'center' },
  { id: 'range', label: 'REFERENCE RANGE', align: 'center' },
  { id: 'units', label: 'UNITS', align: 'center' },
  { id: 'method', label: 'METHOD', align: 'center' },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ComponentToPrint = ({ title, patientDetails }) => {
  return (
    <Grid className='print-source'>
      <Grid container justifyContent='center'>
        <Grid item>
          <Typography variant='h3'>{title} Test Result </Typography>
        </Grid>
      </Grid>
      <PatientDetails patientDetails={patientDetails} />
    </Grid>
  );
};

function TestDetailsForm(props) {

  const printItem = useRef();
  const componentRef = useRef();


  const { data, patientDetails } = props;
  const [patientData, setPatientData] = useState({});
  const [inputs, setInputs] = useState(
    Array.from({ length: data[0].result.test_content.length }, (_, i) => (
      Array.from({ length: data[0].result.test_content[i].rows.length }, () => '')
    ))
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hospitalInfo = {
    name: 'SRI KRISHNA CHILDREN HOSPITAL',
    address: '(A unit of Bhavitha Healthcare Pvt Ltd) 2-7-730, CENTRAL EXCISE COLONY, OPP. SUBEDARI P.S, SUBEDARI, WARANGAL-506001',
    contactno: '0870-2447291,2447292',
    gstno: 'GST No :36AACCB7112M1Z0',
  };

  const getPatientData = async () => {

    const { data: patientData } = await axiosInstance.get(
      `/patients/patient_with_details/${patientDetails.patient_id}`
    );

    setPatientData((current) => ({
      ...current,
      ...patientData,
      patient_id: patientData.id,
      name: patientName(patientData),
      age: calculateAge(patientData.dob),
      sex: patientData.gender,
      ip: {
        ...patientData.ip,
        admissionTimeandDate: timestampToAppDateTime(patientData?.ip?.admitted_at),
        dischargeTimeandDate: patientData?.ip?.discharged_at ? timestampToAppDateTime(patientData.ip.discharged_at) : '-',
      },
      // TODO: cleanup. This is a hack to get the room type in the bill.
      ipNo: patientDetails.ip_id,
      roomType: patientData?.ip?.roomType,
    }));
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const [tabData, setTabData] = useState({ ...data[0], findings: '' });

  const handleChange = (event, section_idx, index) => {
    const temp = [...inputs];
    temp[section_idx][index] = event.target.value;
    setInputs(temp);
  };

  const handleSave = () => {
    console.log(tabData);
  };
  // const handleCancel = () => {
  //   alert('Clear all task for now!');
  // };

  const handleClear = () => {
    setInputs(Array.from({ length: data[0].TEST_DETAILS.length }, () => ''));
    let result = { ...tabData, findings: '' };
    setTabData(result);

  };

  const handleFindings = (event) => {
    let result = { ...tabData, findings: event.target.value };
    setTabData(result);
  };

  const filterData = (test_content, section_idx) => {
    return test_content.rows.map((test, index) => {
      return {
        ...test,
        input: (
          <Input
            value={inputs[section_idx][index]}
            onChange={(event) => handleChange(event, section_idx, index)}
          />
        ),
      };
    });
  };

  return (
    <div>
      <div ref={componentRef}>
        <Grid style={{ padding: '20px' }}>
          <ComponentToPrint
            title={data[0].description}
            patientDetails={patientDetails}
          />
          {_map(tabData.result.test_content, (test_content, section_idx) => {
            return (
              <Box sx={{ mb: 2 }}><TableView
                columns={COLUMNS}
                pageTitle={test_content.subheader}
                tableData={filterData(test_content, section_idx)}
                loaded={true}
                displayPagination={false}
              />
              </Box>
            );
          })}

          <Grid container style={{ marginTop: '30px' }}>
            <Typography
              style={{
                fontWeight: 'bold',
                marginRight: '20px',
                fontSize: '20px',
              }}
            >
              Findings :{' '}
            </Typography>
            <Grid xs={8}>
              <TextField
                multiline={true}
                rows={3}
                fullWidth
                value={tabData.findings}
                style={{ minHeight: '150px', borderColor: '#3f51b5' }}
                onChange={handleFindings}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid container justifyContent='center'>
        <Button variant='contained' color='primary' onClick={handleSave}>
          Save
        </Button>
        <Button
          onClick={handleClear}
          variant='outlined'
          color='primary'
          style={{ marginLeft: '20px', marginRight: '20px' }}
        >
          Clear
        </Button>


        <ReactToPrint
          trigger={() => <Button variant='contained' color='secondary'>
            Print
          </Button>}
          content={() => componentRef.current}
        />

        {/* <LabReport
          text='Print'
          hospitalInfo={hospitalInfo}
          patientData={patientData}
          patientDetails={patientDetails}
          tableData={tabData.result.test_content}
          columns={COLUMNS} /> */}

        <Button
          variant='contained'
          // onClick={handleCancel}
          onClick={handleOpen}
          style={{
            marginLeft: '20px',
            marginRight: '20px',
            backgroundColor: '#ff0000',
            color: '#ffffff',
          }}
        >
          Cancel
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Are you sure?
            </Typography>

            <Box mt={5}>
              <Button
                variant='contained'
                // onClick={handleCancel}
                onClick={handleClose}
                style={{
                  marginRight: '20px',
                  // backgroundColor: '#ff0000',
                  // color: '#ffffff',
                }}
              >
                No
              </Button>
              <Button
                variant='contained'
                // onClick={handleCancel}
                onClick={handleClose}
                style={{
                  // backgroundColor: '#ff0000',
                  // color: '#ffffff',
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </div>
  );
}

export default TestDetailsForm;
