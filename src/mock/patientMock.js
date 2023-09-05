import mock from 'utils/mock';

mock.onPost('/api/patients/new').reply(200, {
  message: 'New registration done!',
});

mock.onGet('/api/patientSearch').reply(200, {
  registeredPatients: [
    { name: 'Arnold', MrNo: 1234 },
    { name: 'jason', MrNo: 1235 },
    { name: 'mohan', MrNo: 1236 },
  ],
});

mock.onGet('/api/patient/1235').reply(200, {
  Patient: { name: 'Arnold', MrNo: 1234 },
});

mock.onGet('/api/consultationDoctor').reply(200, {
  doctors: [
    { name: 'Arnold' },
    { name: 'jason' },
    { name: 'mohan' },
    { name: 'Kartik' },
  ],
});

mock.onGet('/api/rooms').reply(200, {
  result: [
    { name: 'single room', available_rooms: [101, 102, 201], price: 3000 },
    { name: 'double room', available_rooms: [103, 104, 202], price: 4000 },
  ],
});

mock.onGet('api/patient/todays_registrations').reply(200, {
  result: [
    {
      date: '18/04/2021',
      mrNo: '1234',
      ipNo: '2345',
      patientName: 'dinu',
      sex: 'M',
      phNo: '123456789',
      activity: 'OP Assigned',
      assign: { op: true, ip: false },
      createBill: { op: true, ip: false, p: true },
    },
    {
      date: '18/04/2021',
      mrNo: '1235',
      ipNo: '2346',
      patientName: 'jinu',
      sex: 'F',
      phNo: '123456789',
      activity: 'admission date:20/04/21 \n status:not discharged',
      assign: { op: false, ip: false },
      createBill: { op: true, ip: false, p: false },
    },
  ],
});

mock.onGet('api/patient/currentIP').reply(200, {
  result: [
    {
      date: '18/04/2021',
      mrNo: '1234',
      ipNo: '2345',
      patientName: 'dinu',
      sex: 'M',
      phNo: '123456789',
      status: 'Currently Admitted',
      days: '15 days',
      createBill: { op: true, ip: false, p: true },
    },
    {
      date: '18/04/2021',
      mrNo: '1235',
      ipNo: '2346',
      patientName: 'jinu',
      sex: 'F',
      phNo: '123456789',
      status: 'Currently Admitted',
      days: '1 day',
      createBill: { op: true, ip: false, p: false },
    },
  ],
});

mock.onGet('api/patient/ip/search_with/mrNo?mrNo=1234').reply(200, {
  result: [
    {
      date: '18/04/2021',
      mrNo: '1234',
      ipNo: '2345',
      patientName: 'searchPressed',
      sex: 'M',
      phNo: '123456789',
      status: 'Currently Admitted',
      days: '15 days',
      createBill: { op: true, ip: false, p: true },
    },
    {
      date: '18/04/2021',
      mrNo: '1235',
      ipNo: '2346',
      patientName: 'jinu',
      sex: 'F',
      phNo: '123456789',
      status: 'Currently Admitted',
      days: '1 day',
      createBill: { op: true, ip: false, p: false },
    },
  ],
});


mock.onGet('api/patient/search_with/mrNo?mrNo=1234').reply(200, {
  result: [
    {
      date: '18/04/2021',
      mrNo: '1234',
      ipNo: '2345',
      patientName: 'for MrNo',
      sex: 'M',
      phNo: '123456789',
      activity: 'OP Assigned',
      assign: { op: true, ip: false },
      createBill: { op: true, ip: false, p: true },
    },
    {
      date: '18/04/2021',
      mrNo: '1235',
      ipNo: '2346',
      patientName: 'jinu',
      sex: 'F',
      phNo: '123456789',
      activity: 'admission date:20/04/21 \n status:not discharged',
      assign: { op: false, ip: false },
      createBill: { op: true, ip: false, p: false },
    },
  ],
});
