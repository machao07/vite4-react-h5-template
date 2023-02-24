import { lazy } from "react";

const routes = [
    {
        path: '*',
        component: lazy(() => import("../pages/NotFound")),
        meta: { title: 'not found' }
    },
]

export default routes