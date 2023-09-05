import mock from 'utils/mock';


mock.onGet('/api/billingList/1234').reply(200, {
  billsList: [
    {id:'100',date : '1/jan/2021', type:'advance', paid_amount:'3000',pending_amount:'1200'},
    {id:'101',date : '1/jan/2021', type:'pharmacy', paid_amount:'7000',pending_amount:'1200'},
    {id:'102',date : '1/jan/2021', type:'advance', paid_amount:'12000',pending_amount:'1200'},
    {id:'103',date : '1/jan/2021', type:'advance', paid_amount:'4000',pending_amount:'1200'}
  ]
});

