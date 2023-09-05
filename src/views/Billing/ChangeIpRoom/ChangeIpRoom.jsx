import React from 'react';
import { Page, Header } from 'components';
import ChangeIpTable from './components/ChangeIpTable';

function ChangeIpRoom() {
  return (
    <Page title='All Patients'>
      <Header heading='BILLING' subHeading='Change IP Room' />
      <ChangeIpTable />
    </Page >
  );
}

export default ChangeIpRoom;