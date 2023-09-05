// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST

import React, { lazy } from 'react';

const routes = [
    {
        path: "/cancelledInvestigations",
        exact: true,
        component: lazy(() => import('compiled/CancelledTest/CancelledTest')),
    },
    {
        path: "/investigations",
        exact: true,
        component: lazy(() => import('compiled/ProcessTest/ProcessTest')),
    },
    {
        path: "/investigations2",
        exact: true,
        component: lazy(() => import('compiled/ProcessTest/ProcessTest')),
    },
    {
        path: "/notifications",
        exact: true,
        component: lazy(() => import('compiled/Notification/Notification')),
    },
    {
        path: "/notifications/add_patient",
        exact: true,
        component: lazy(() => import('compiled/NotificationAddPatient/NotificationAddPatient')),
    },
    {
        path: "/notifications/discharged_patient",
        exact: true,
        component: lazy(() => import('compiled/NotificationDischargedPatient/NotificationDischargedPatient')),
    },    
]

export default routes;