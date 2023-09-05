/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import DashboardAnalyticsView from './views/DashboardAnalytics';
import DashboardDefaultView from './views/DashboardDefault';
import OverviewView from './views/Overview';
import HomeView from './views/Home';
// import PatientRegistrationView from './views/PatientRegistration';
import PresentationView from './views/Presentation';
import compiledRoutes from 'compiled/routes';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/home' />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('views/Login'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('views/Register'))
      },
      {
        component: () => <Redirect to='/errors/error-404' />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('views/Error500'))
      },
      {
        component: () => <Redirect to='/errors/error-404' />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      ...compiledRoutes,
      {
        path: '/home',
        exact: true,
        component: HomeView,
      },
      {
        path: '/patient_registration',
        exact: true,
        component: lazy(() => import('views/PatientRegistration')),
      },
      {
        path: '/new_patient_registration',
        exact: true,
        component: lazy(() => import('views/NewPatientRegistration')),
      },
      {
        path: '/all_patient_registration',
        exact: true,
        component: lazy(() => import('views/AllPatientRegistration')),
      },
      {
        path: '/current_ip_patients',
        exact: true,
        component: lazy(() => import('views/CurrentIP')),
      },
      {
        path: '/create_ip_op_lab',
        exact: true,
        component: lazy(() => import('views/Billing/CreateIPOPLab')),
      },
      {
        path: '/create_final_bill',
        exact: true,
        component: lazy(() => import('views/Billing/CreateFinalBill')),
      },
      {
        path: '/create_advance_bill',
        exact: true,
        component: lazy(() => import('views/Billing/CreateAdvanceBill')),
      },
      {
        path: '/change_ip_room',
        exact: true,
        component: lazy(() => import('views/Billing/ChangeIpRoom')),
      },
      {
        path: '/discount_requests',
        exact: true,
        component: lazy(() => import('views/Billing/DiscountRequests')),
      },
      {
        path: '/calendar',
        exact: true,
        component: lazy(() => import('views/Calendar'))
      },
      {
        path: '/chat',
        exact: true,
        component: lazy(() => import('views/Chat'))
      },
      {
        path: '/chat/:id',
        exact: true,
        component: lazy(() => import('views/Chat'))
      },
      {
        path: '/dashboards/analytics',
        exact: true,
        component: DashboardAnalyticsView
      },
      {
        path: '/dashboards/default',
        exact: true,
        component: DashboardDefaultView
      },
      {
        path: '/invoices/:id',
        exact: true,
        component: lazy(() => import('views/InvoiceDetails'))
      },
      {
        path: '/kanban-board',
        exact: true,
        component: lazy(() => import('views/KanbanBoard'))
      },
      {
        path: '/management/customers',
        exact: true,
        component: lazy(() => import('views/CustomerManagementList'))
      },
      {
        path: '/management/customers/:id',
        exact: true,
        component: lazy(() => import('views/CustomerManagementDetails'))
      },
      {
        path: '/management/customers/:id/:tab',
        exact: true,
        component: lazy(() => import('views/CustomerManagementDetails'))
      },
      {
        path: '/management/projects',
        exact: true,
        component: lazy(() => import('views/ProjectManagementList'))
      },
      {
        path: '/management/orders',
        exact: true,
        component: lazy(() => import('views/OrderManagementList'))
      },
      {
        path: '/management/orders/:id',
        exact: true,
        component: lazy(() => import('views/OrderManagementDetails'))
      },
      {
        path: '/overview',
        exact: true,
        component: OverviewView
      },
      {
        path: '/presentation',
        exact: true,
        component: PresentationView
      },
      {
        path: '/profile/:id',
        exact: true,
        component: lazy(() => import('views/Profile'))
      },
      {
        path: '/profile/:id/:tab',
        exact: true,
        component: lazy(() => import('views/Profile'))
      },
      {
        path: '/projects/create',
        exact: true,
        component: lazy(() => import('views/ProjectCreate'))
      },
      {
        path: '/projects/:id',
        exact: true,
        component: lazy(() => import('views/ProjectDetails'))
      },
      {
        path: '/projects/:id/:tab',
        exact: true,
        component: lazy(() => import('views/ProjectDetails'))
      },
      {
        path: '/projects',
        exact: true,
        component: lazy(() => import('views/ProjectList'))
      },
      {
        path: '/settings',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/settings/:tab',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/social-feed',
        exact: true,
        component: lazy(() => import('views/SocialFeed'))
      },
      {
        path: '/Processtests',
        exact: true,
        component: lazy(() => import('views/Investigations/ProcessTest'))
      },
      {
        path: '/Processtests/details/:id',
        exact: true,
        component: lazy(() => import('views/ProcessTestDetails'))
      },
      {
        path: '/Cancelledtests',
        exact: true,
        component: lazy(() => import('views/InvestigationsCancelled/CancelledTest'))
      },
      {
        component: () => <Redirect to='/errors/error-404' />
      },
    ]
  }
];

export default routes;
