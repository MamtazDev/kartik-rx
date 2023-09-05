import React from 'react';

import TableView from 'components/Table/Table';

import { useHistory } from 'react-router-dom';

const COLUMNS = [
  { id: 'date', label: 'Adm Date', align: 'center' },
  { id: 'ip_id', label: 'IP No.', align: 'center' },
  { id: 'patient_id', label: 'MR No.', align: 'center' },
  { id: 'bill_id', label: 'Bill No.', align: 'center' },
  { id: 'patient_name', label: 'Patient Name', align: 'center' },
  { id: 'no_of_tests', label: 'No.of Test', align: 'center' },
  { id: 'no_of_test_completed', label: 'No.of Tests Processed', align: 'center' },
];

function ProcessTestTable(props) {
  const history = useHistory();

  const { labReports } = props;

  const handleProcessClick = (editObj) => {
    let data = labReports.find((element) => element.id === editObj.id);
    history.push({
      pathname: `/Processtests/details/${editObj.id}`,
      state: data,
    });
  };

  const getActionButtons = () => {
    return [
      {
        label: 'Process',
        onClick: handleProcessClick,
        variant: 'contained',
        color: 'primary',
      },
    ];
  };

  return (
    <>
      <TableView
        columns={COLUMNS}
        tableData={labReports}
        loaded={!(labReports.length === 0)}
        pageTitle={'Process Tests'}
        displayPagination={true}
        actionButtons={getActionButtons()}
      />
    </>
  );
}

export default ProcessTestTable;
