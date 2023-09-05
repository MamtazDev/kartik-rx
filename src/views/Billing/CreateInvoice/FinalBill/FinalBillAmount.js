import _map from 'lodash/map';

export const FinalBillAmount  = (pendingAndAdvance) => {

  const {lab_and_services_bills, advance_bills} = pendingAndAdvance;
  let netBillAmount = 0, discountAmount = 0;

  _map(lab_and_services_bills, (bill, index) => {
    netBillAmount += bill.payments[0].amount;
    discountAmount += bill.discount.amount;
  });
  _map(advance_bills, (bill, index) => {
    netBillAmount += bill.payments[0].amount;
  });
  const grossAmount = netBillAmount + discountAmount;

  return {
    layout: {
      hLineWidth: (i, node) => {
        // these are the conditions to draw horizontal lines for particular rows
        if (i===0 || i === 3 || i === 5 || i === 6 || i === 7 || i === node.table.body.length) {
          return 1;
        }
        return 0;
      },
      vLineWidth: (i, node) => {
        return 0;
      }
    },
    table: {
      widths: ['30%', '20%'],
      body: [
        [{text: 'Gross Amount', alignment: 'start', style: 'subheader1'}, {text: grossAmount, alignment: 'start', style: 'subheader2'}],
        [{text: 'Discount Amount', alignment: 'start', style: 'subheader1'}, {text: discountAmount, alignment: 'start', style: 'subheader2'}],
        [{text: 'Total GST', alignment: 'start', style: 'subheader1'}, {text: 0, alignment: 'start', style: 'subheader2'}],
        [{text: 'Net Bill Amount', alignment: 'start', style: 'subheader1'}, {text: netBillAmount, alignment: 'start', style: 'subheader2'}],
        [{text: 'Less Advance', alignment: 'start', style: 'subheader1'}, {text: netBillAmount, alignment: 'start', style: 'subheader2'}],
        [{text: 'Net Payable', alignment: 'start', style: 'subheader1'}, {text: 0, alignment: 'start', style: 'subheader2'}],
        [{text: 'Current Balance', alignment: 'start', style: 'subheader1'}, {text: 0, alignment: 'start', style: 'subheader2'}],
      ],
      headerRows: 3,
      alignment: 'center',
    },
    margin: [0, 10, 0, 0],
  };
};