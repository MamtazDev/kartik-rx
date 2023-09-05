import _map from 'lodash/map';

export const Services = (bills) => {

  let totalServicesAmount = 0;
  const serviceTotals = {};

  _map(bills, bill => {
    _map(bill.instances, service => {
      const { description, amount } = service;
      serviceTotals[description] = { amount };
    });
  });
  
  const servicesList = [
    [
      { text: 'Description of Services', bold: true, colSpan: 2 }, '',
      { text: '', bold: true },
      { text: '', bold: true },
      { text: 'Total', bold: true },
      { text: 'Amount', bold: true },
    ],
    ..._map(Object.keys(serviceTotals),
      service => {
        const amount = serviceTotals[service].amount;
        totalServicesAmount += amount;
        return [
          { text: `Payment Amount (Mode: ${service.split(' ')[0]})`, colSpan: 2, bold: true },
          '',
          '',
          '',
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