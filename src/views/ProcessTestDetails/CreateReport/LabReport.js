import React from 'react';
import pdfMake from 'pdfmake';
import {timestampToAppDateTime} from 'utils/time';
import moment from 'moment';
import _find from 'lodash/find';
import { HospitalInfo } from 'views/Billing/CreateInvoice/HospitalInfo';
import { Button } from '@mui/material';
import { styles } from 'views/Billing/CreateInvoice/styles';
import { PatientData } from 'views/Billing/CreateInvoice/PatientData';
import { TestContent } from './TestContent';
import _map from 'lodash/map';

pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

const LabReport =  (props) => {

  const {text,patientData, patientDetails, tableData, columns, hospitalInfo} = props;
  const printPdf = () => {

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [20, 10, 20, 10],
      content: [      
        ...HospitalInfo(hospitalInfo),
        PatientData(patientData, patientDetails.bill_id, patientDetails.created_time),
        ..._map(tableData, (test_content) =>{
          return [
            {
              text: test_content.subheader,
              style: 'header',
              alignment: 'start',
              margin: [0, 10, 0, 0],
            },
            TestContent(columns, test_content.rows)
          ];
        },),
        {
          columns: [
            {
              text: 'Bill Date: ' + timestampToAppDateTime(patientDetails.created_time),
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
          text: '***** END OF THE REPORT *****',
          style: 'header',
          alignment: 'center',
          margin: [0, 20, 0, 0],
        },
      ],
      defaultStyle: {
        font: 'Roboto'
      },
      styles: styles,
    };

    pdfMake.createPdf(docDefinition).open();
  };

  return<Button onClick={printPdf} variant='contained' color='secondary'>
    {text}
  </Button>;
};

export default LabReport;