/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
// import { colors } from '@mui/material';
// // import BarChartIcon from '@mui/icons-material/BarChart';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import ChatIcon from '@mui/icons-material/ChatOutlined';
// import CodeIcon from '@mui/icons-material/Code';
// import DashboardIcon from '@mui/icons-material/DashboardOutlined';
// import ErrorIcon from '@mui/icons-material/ErrorOutline';
// import FolderIcon from '@mui/icons-material/FolderOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import LockOpenIcon from '@mui/icons-material/LockOpenOutlined';
// import MailIcon from '@mui/icons-material/MailOutlined';
// import PresentToAllIcon from '@mui/icons-material/PresentToAll';
// import PeopleIcon from '@mui/icons-material/PeopleOutlined';
// import PersonIcon from '@mui/icons-material/PersonOutlined';
import ReceiptIcon from '@mui/icons-material/ReceiptOutlined';
import LocalHospital from '@mui/icons-material/LocalHospital';
// import SettingsIcon from '@mui/icons-material/SettingsOutlined';
// import ViewModuleIcon from '@mui/icons-material/ViewModule';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
// import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
// import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

import { Label } from 'components';
import navigationConfig from 'compiled/navigationConfig';

export default [
  {
    title: 'Pages',
    pages: [
      {
        title: 'Home',
        href: '/home',
        icon: HomeIcon
      },
      {
        title: 'Patient Registration',
        href: '/patient_registration',
        icon: PermIdentityOutlinedIcon,
        children: [
          // {
          //   title: 'All Registrations',
          //   href: '/patient_registration'
          // },
          {
            title: 'New Registration',
            href: '/new_patient_registration'
          },
          {
            title: 'Today\'s Registrations',
            href: '/all_patient_registration'
          },
          {
            title: 'Current IP Patients',
            href: '/current_ip_patients'
          }
        ]
      },
      {
        title: 'Billing',
        href: '/invoices/1',
        icon: ReceiptIcon,
        children: [
          {
            title: 'Create IP/OP/Lab',
            href: '/create_ip_op_lab',
          },
          {
            title: 'Change IP Room',
            href: '/change_ip_room',
          },
          {
            title: 'Discount Requests',
            href: '/discount_requests',
          },
        ]
      },

      ...navigationConfig,
      {
        title: 'Investigations',
        href: '/investigations',
        icon: LocalHospital,
        children: [
          {
            title: 'Process Tests',
            href: '/Processtests',
          },
          {
            title: 'Cancelled Tests',
            href: '/Cancelledtests',
          },
          // { 
          //   title: 'Dihan Tests',
          //   href: '/cancelledInvestigations'
          // },

        ]
      },
      // {
      //   title: 'Reports',
      //   href: '/management',
      //   icon: FindInPageOutlinedIcon,
      //   children: [
      //     {
      //       title: 'Customers',
      //       href: '/management/customers'
      //     },
      //     {
      //       title: 'Customer Details',
      //       href: '/management/customers/1/summary'
      //     },
      //     {
      //       title: 'Projects',
      //       href: '/management/projects'
      //     },
      //     {
      //       title: 'Orders',
      //       href: '/management/orders'
      //     },
      //     {
      //       title: 'Order Details',
      //       href: '/management/orders/1'
      //     }
      //   ]
      // },
      // {
      //   title: 'Tasks',
      //   href: '/projects',
      //   icon: FolderIcon,
      //   children: [
      //     {
      //       title: 'Browse',
      //       href: '/projects'
      //     },
      //     {
      //       title: 'Create',
      //       href: '/projects/create'
      //     },
      //     {
      //       title: 'Overview',
      //       href: '/projects/1/overview'
      //     },
      //     {
      //       title: 'Files',
      //       href: '/projects/1/files'
      //     },
      //     {
      //       title: 'Activity',
      //       href: '/projects/1/activity'
      //     },
      //     {
      //       title: 'Subscribers',
      //       href: '/projects/1/subscribers'
      //     }
      //   ]
      // },
      // {
      //   title: 'Referrals',
      //   href: '/settings',
      //   icon: SettingsIcon,
      //   children: [
      //     {
      //       title: 'General',
      //       href: '/settings/general'
      //     },
      //     {
      //       title: 'Subscription',
      //       href: '/settings/subscription'
      //     },
      //     {
      //       title: 'Notifications',
      //       href: '/settings/notifications'
      //     },
      //     {
      //       title: 'Security',
      //       href: '/settings/security'
      //     }
      //   ]
      // },
      // {
      //   title: 'Pharmacy',
      //   href: '/calendar',
      //   icon: LocalHospitalOutlinedIcon,
      // },
      // {
      //   title: 'Calendar',
      //   href: '/calendar',
      //   icon: CalendarTodayIcon,
      //   label: () => <Label color={colors.green[500]}>New</Label>
      // },
      // {
      //   title: 'Kanban Board',
      //   href: '/kanban-board',
      //   icon: ListAltIcon
      // },
      // {
      //   title: 'Social Feed',
      //   href: '/social-feed',
      //   icon: PeopleIcon
      // },
      // {
      //   title: 'Mail',
      //   href: '/mail',
      //   icon: MailIcon,
      //   label: () => (
      //     <Label
      //       color={colors.red[500]}
      //       shape='rounded'
      //     >
      //       2
      //     </Label>
      //   )
      // },
      // {
      //   title: 'Chat',
      //   href: '/chat',
      //   icon: ChatIcon,
      //   label: () => (
      //     <Label
      //       color={colors.red[500]}
      //       shape='rounded'
      //     >
      //       4
      //     </Label>
      //   )
      // },
      // {
      //   title: 'Profile',
      //   href: '/profile',
      //   icon: PersonIcon,
      //   children: [
      //     {
      //       title: 'Timeline',
      //       href: '/profile/1/timeline'
      //     },
      //     {
      //       title: 'Connections',
      //       href: '/profile/1/connections'
      //     },
      //     {
      //       title: 'Projects',
      //       href: '/profile/1/projects'
      //     },
      //     {
      //       title: 'Reviews',
      //       href: '/profile/1/reviews'
      //     }
      //   ]
      // },
      // {
      //   title: 'Dashboards',
      //   href: '/dashboards',
      //   icon: DashboardIcon,
      //   children: [
      //     {
      //       title: 'Default',
      //       href: '/dashboards/default'
      //     },
      //     {
      //       title: 'Analytics',
      //       href: '/dashboards/analytics'
      //     }
      //   ]
      // },
      // {
      //   title: 'Authentication',
      //   href: '/auth',
      //   icon: LockOpenIcon,
      //   children: [
      //     {
      //       title: 'Login',
      //       href: '/auth/login'
      //     },
      //     {
      //       title: 'Register',
      //       href: '/auth/register'
      //     }
      //   ]
      // },
      // {
      //   title: 'Errors',
      //   href: '/errors',
      //   icon: ErrorIcon,
      //   children: [
      //     {
      //       title: 'Error 401',
      //       href: '/errors/error-401'
      //     },
      //     {
      //       title: 'Error 404',
      //       href: '/errors/error-404'
      //     },
      //     {
      //       title: 'Error 500',
      //       href: '/errors/error-500'
      //     }
      //   ]
      // }


    ]
  },
  // {
  //   title: 'Support',
  //   pages: [
  //     {
  //       title: 'Presentation',
  //       href: '/presentation',
  //       icon: PresentToAllIcon
  //     },
  //     {
  //       title: 'Getting started',
  //       href: '/getting-started',
  //       icon: CodeIcon
  //     },
  //     {
  //       title: 'Changelog',
  //       href: '/changelog',
  //       icon: ViewModuleIcon,
  //       label: () => <Label color={colors.blue['500']}>v1.2.0</Label>
  //     }
  //   ]
  // }
];
