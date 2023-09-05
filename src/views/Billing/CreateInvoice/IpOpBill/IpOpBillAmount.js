import _map from 'lodash/map';

export const IpOpBillAmount  = (billData) => {

  const discountAmount = billData.discount.amount, grossAmount = billData.amount;
  const netBillAmount = grossAmount - discountAmount;
  const currentBalance = billData.payments.length === 0 ? netBillAmount : 0;
  const netPayable = billData.payments.length === 0 ? netBillAmount: 0;    
    
  return {
    layout: {
      hLineWidth: (i, node) => {
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
        [{text: 'Net Payable', alignment: 'start', style: 'subheader1'}, {text: netPayable, alignment: 'start', style: 'subheader2'}],
        [{text: 'Current Balance', alignment: 'start', style: 'subheader1'}, {text: currentBalance, alignment: 'start', style: 'subheader2'}],
      ],
      headerRows: 3,
      alignment: 'center',
    },
    margin: [0, 10, 0, 0],
  };
};