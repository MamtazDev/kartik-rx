import React, { useContext } from 'react';
import pdfMake from 'pdfmake';
import { timestampToAppDateTime } from 'utils/time';
import { BillContext } from '../../CreateIPOPLab/commons';
import { HospitalInfo } from '../HospitalInfo';
import { PatientData } from '../PatientData';
import moment from 'moment';
import { Button, ButtonGroup } from '@mui/material';
import { styles } from '../styles';
import { Services } from '../Services';
import _find from 'lodash/find';
import { IpOpBillAmount } from './IpOpBillAmount';
import { PATIENT_TYPE } from 'utils/patient';

pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

const IpOpBill = ({ billdata }) => {

  const { patientData } = useContext(BillContext);
  const { op } = patientData;

  const hospitalInfo = {
    name: 'SRI KRISHNA CHILDREN HOSPITAL',
    address: '(A unit of Bhavitha Healthcare Pvt Ltd) 2-7-730, CENTRAL EXCISE COLONY, OPP. SUBEDARI P.S, SUBEDARI, WARANGAL-506001',
    contactno: '0870-2447291,2447292',
    gstno: 'GST No :36AACCB7112M1Z0',
  };
  const printPdf = () => {

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [20, 10, 20, 10],
      content: [
        ...HospitalInfo(hospitalInfo),
        {
          text: `${op ? PATIENT_TYPE.OP : PATIENT_TYPE.IP} Bill`,
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 5],
        },
        PatientData(patientData, billdata.id, billdata.created_time),
        Services([billdata], billdata.bill_type),
        IpOpBillAmount(billdata),
        {
          columns: [
            {
              text: 'Bill Date: ' + timestampToAppDateTime(billdata.created_time),
              style: 'subheader2',
              alignment: 'center',
              margin: [0, 10, 0, 10],
            },
            {
              text: 'Printed on: ' + moment().format('DD/MM/YYYY hh:mm A'),
              style: 'subheader2',
              alignment: 'center',
              margin: [0, 10, 0, 10],
            },
          ],
        },
        {
          text: 'Thank You',
          style: 'header',
          alignment: 'center'
        },
      ],
      defaultStyle: {
        font: 'Roboto'
      },
      styles: styles,
    };

    pdfMake.createPdf(docDefinition).open();
  };

  return <Button
    variant='outlined'
    style={{ width: '100%' }}
    onClick={printPdf}
    color='secondary'
  >
    Print Bill
  </Button>;
};

export default IpOpBill;