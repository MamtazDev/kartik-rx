import React, { useContext } from 'react';
import pdfMake from 'pdfmake';
import {timestampToAppDateTime} from 'utils/time';
import { BillContext } from '../../CreateIPOPLab/commons';
import { HospitalInfo } from '../HospitalInfo';
import { PatientData } from '../PatientData';
import { BillData } from '../Bills';
import moment from 'moment';
import { Button, ButtonGroup } from '@mui/material';
import {styles} from '../styles';
import {Services} from './Services';
import _find from 'lodash/find';
import { IpOpBillAmount } from '../IpOpBill/IpOpBillAmount';

pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

const AdvanceBill =  ({ billdata, hospitalInfo }) => {

  const {patientData} = useContext(BillContext);

  const printPdf = () => {

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [20, 10, 20, 10],
      content: [ 
        ...HospitalInfo(hospitalInfo),
        {
          text: 'IP Advance',
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

  return<Button
    variant='outlined'
    style={{ width: '100%' }}
    onClick={printPdf}
    color='secondary'
  >
    Print Bill
  </Button>;
};

export default AdvanceBill;