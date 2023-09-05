import React from 'react';
import { Card, CardContent } from '@mui/material';
import TableView from 'components/Table/Table';

const COLUMNS = [
  { id: 'date', label: 'Adm Date', align: 'center' },
  { id: 'ip_id', label: 'IP No.', align: 'center' },
  { id: 'patient_id', label: 'MR No.', align: 'center' },
  { id: 'bill_id', label: 'Bill No.', align: 'center' },
  { id: 'patient_name', label: 'Patient Name', align: 'center' },
  { id: 'no_of_tests', label: 'No.of Test', align: 'center' },
  { id: 'no_of_test_completed', label: 'No.of Tests Processed', align: 'center' },
  { id: 'no_of_test_cancelled', label: 'No.of Tests Cancelled', align: 'center' },
];

function PatientDetails(props) {
  const { patientDetails } = props;

  return (
    <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
      <CardContent>
        <TableView
          columns={COLUMNS}
          tableData={patientDetails ? [patientDetails] : []}
          loaded={true}
          displayPagination={false}
        />
      </CardContent>
    </Card>
  );
}

export default PatientDetails;
