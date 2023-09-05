// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import LocalHospital from '@mui/icons-material/LocalHospital';


const navigations = [
  {
    title: 'Notifications',
    href: '/notifications',
    icon: NotificationsActiveOutlinedIcon,
    children:[
      { title: 'IP Notifications', href: '/notifications'},
      { title: 'Add Patient', href: '/notifications/add_patient'},
      { title: 'Discharged Patient', href: '/notifications/discharged_patient'},
    ],
  },
  {
    title: 'Investigations2',
    href: '/investigations',
    icon: LocalHospital,
    children:[
      { title: 'Process Tests', href: '/investigations'},
      { title: 'Cancelled Tests', href: '/cancelledInvestigations'},
     
    ],
  },    
];


export default navigations;