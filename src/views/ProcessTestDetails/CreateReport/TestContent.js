import _map from 'lodash/map';

export const TestContent = (columns, test_content) => {
    
  const body = [
    _map((columns), (col)=>{
      return { text: col.label, bold: true };
    }),
    ..._map(test_content, (test)=>{
      return [
        test.name,
        test.result? test.result: '',
        test.range,
        test.units,
        test.method ? test.method : '',
      ];
    })
  ];

  return {
    style: {
      fontSize: 9
    },
    layout: {
      hLineWidth: (i, node) => {
        // these are the conditions to draw horizontal lines for particular rows
        if (i === 0 || i === 1 || i === (node.table.body.length)) {
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
      body: body,
    },
    headerRows: 1,
    margin: [0, 10, 0, 0],
  };
};