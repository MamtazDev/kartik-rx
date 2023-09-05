export const HospitalInfo  = (hospitalInfo) => [
  {
    text: hospitalInfo.name,
    style: 'header',
    alignment: 'center'
  },
  {
    text: hospitalInfo.address,
    style: 'subheader2',
    alignment: 'center'
  },
  {
    text: hospitalInfo.contactno,
    style: 'subheader2',
    alignment: 'center'
  },
  {
    text: hospitalInfo.gstno,
    style: 'subheader1',
    alignment: 'center',
    margin: [0, 0, 0, 5],
  },
];