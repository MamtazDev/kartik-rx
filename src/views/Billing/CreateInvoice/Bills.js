import { timestampToAppDateTime } from 'utils/time';
import _map from 'lodash/map';

export const BillData = (pendingAndAdvance) => {

  const { advance_bills, lab_and_services_bills } = pendingAndAdvance;
  let srno = 0, grandTotal = 0;

  advance_bills.sort((a,b) => a.id - b.id);
  lab_and_services_bills.sort((a,b) => a.id - b.id);

  const _bills = (bills) => _map(bills, (bill) => {
    grandTotal += bill.payments[0].amount;
    return [
      ++srno,
      timestampToAppDateTime(bill.created_time),
      bill.id,
      bill.payments[0]?.info?.payment_mode,
      bill.payments[0].amount,
    ];
  });

  return {
    style: {
      fontSize: 9,
    },
    layout: {
      hLineWidth: (i, node) => {
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
      widths: ['*', '*', '*', '*', '*'],
      body: [
        [{ text: 'Sr.No', bold: true }, { text: 'Record Date', bold: true }, { text: 'Receipt No', bold: true }, { text: 'Payment Mode', bold: true }, { text: 'Amount', bold: true }],
        ...((advance_bills.length > 0) ? [[{ text: 'IP Advance', colSpan: 5, alignment: 'start', color: 'blue', bold: true }]] : []),
        ..._bills(advance_bills),
        [{ text: 'IP Billing', colSpan: 5, alignment: 'start', color: 'blue', bold: true }],
        ..._bills(lab_and_services_bills),
        ['', '', '', { text: 'Grand Total', style: 'subheader1', bold: true }, { text: grandTotal, style: 'subheader2', bold: true }],
      ]
    },
    headerRows: 1,
    margin: [0, 10, 0, 0],
  };
};