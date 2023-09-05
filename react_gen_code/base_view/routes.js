// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST

import React, { lazy } from 'react';

const routes = [
    {%- for route in routes %}
    {
        path: "{{route.path}}",
        exact: {{route.exact}},
        component: lazy(() => import('{{route.import_path}}')),
    },
    {%- endfor %}    
]

export default routes;