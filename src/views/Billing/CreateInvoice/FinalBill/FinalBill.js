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
import { FinalBillAmount } from './FinalBillAmount';
import {Services} from '../Services';
import { axiosInstance } from 'actions/helpers';
import _find from 'lodash/find';
import { BILL_TYPES } from '../../CreateIPOPLab/billTypes';

pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

const FinalBill =  ({handleCancel, hospitalInfo}) => {

  const {patientData, pendingAndAdvance} = useContext(BillContext);
  const finalBill = _find(pendingAndAdvance.lab_and_services_bills, { bill_type: BILL_TYPES.FINAL_BILL.identifier } );

  const printPdf = async () => {

    const {data} = await axiosInstance.get(`/billing/get_ip_bills_with_instances_and_payments/${patientData.ip.ipno}`, {});
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [20, 10, 20, 10],
      content: [      
        ...HospitalInfo(hospitalInfo),
        {
          text: 'Final Bill',
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 5],
        },
        PatientData(patientData, finalBill.id, finalBill.created_time),
        Services(data, BILL_TYPES.FINAL_BILL.identifier),
        BillData(pendingAndAdvance),
        FinalBillAmount(pendingAndAdvance),
        {
          columns: [
            {
              text: 'Bill Date: ' + timestampToAppDateTime(finalBill.created_time),
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

  return <ButtonGroup
    orientation='horizontal'
    sx= {{marginTop: '10px', width: '100%'}}
  >
    <Button
      variant='outlined'
      style={{ width: '100%' }}
      onClick={printPdf}
    >
    Download Final Bill
    </Button>
    <Button
      variant='outlined'
      style={{ width: '100%' }}
      onClick={handleCancel}
    >
    Cancel
    </Button>
  </ButtonGroup>;
};

export default FinalBill;