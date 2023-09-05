import { BILL_TYPES } from '../CreateIPOPLab/billTypes';
import { BillItemTypes } from '../CreateIPOPLab/BillItemTypes';
import _map from 'lodash/map';
import _keys from 'lodash/keys';

export const Services = (bills, billType) => {

  let totalServicesAmount = 0;
  const serviceTotals = {};
  
  if (billType === BILL_TYPES.FINAL_BILL.identifier) {
    _map(bills, bill => {
      if (bill.bill_type !== BILL_TYPES.ADVANCE_BILL.identifier) {
        _map(bill.instances, service => {
          if (service.instance_type !== BillItemTypes.PAYMENT) {
            const { description, info: { rate, quantity } } = service;
            if (serviceTotals[description]) {
              serviceTotals[description].quantity += quantity;
            }
            else {
              serviceTotals[description] = { quantity, rate };
            }
          }
        });
      }
    });
  }
  else {
    _map(bills, bill => {
      _map(bill.instances, service => {
        if (service.instance_type !== BillItemTypes.PAYMENT) {
          const { description, info: { rate, quantity } } = service;
          if (serviceTotals[description]) {
            serviceTotals[description].quantity += quantity;
          }
          else {
            serviceTotals[description] = { quantity, rate };
          }
        }
      });
    });
  }
  
  const servicesList = [
    [
      { text: 'Description of Services', bold: true, colSpan: 2 }, '',
      { text: 'Rate', bold: true },
      { text: 'Qty', bold: true },
      { text: 'Total', bold: true },
      { text: 'Amount', bold: true },
    ],
    ..._map(_keys(serviceTotals),
      service => {
        const amount = serviceTotals[service].rate ? serviceTotals[service].rate * serviceTotals[service].quantity : serviceTotals[service].amount;
        totalServicesAmount += amount;
        return [
          { text: service, colSpan: 2, bold: true },
          '',
          serviceTotals[service].rate ? serviceTotals[service].rate : '',
          serviceTotals[service].quantity ? serviceTotals[service].quantity : '',
          amount,
          { text: amount, bold: true },
        ];
      }
    ),
    ['', '', '', '', { text: 'Total', bold: true }, { text: totalServicesAmount, bold: true }],
  ];

  return {
    style: {
      fontSize: 9
    },
    layout: {
      hLineWidth: (i, node) => {
        // these are the conditions to draw horizontal lines for particular rows
        if (i === 0 || i === 1 || i === (node.table.body.length - 1)) {
          return 1;
        }
        return 0;
      },
      vLineWidth: (i, node) => {
        return 0;
      }
    },
    alignment: 'left',
    table: {
      widths: ['*', '*', '*', '*', '*', '*'],
      body: servicesList,
    },
    headerRows: 1,
    margin: [0, 10, 0, 0],
  };
};