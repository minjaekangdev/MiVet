import { lazy } from "react";
const AnalyticsDashboards = lazy(() =>
  import("../components/dashboard/analytics/Analytics")
);

const dashboardRoutes = [
   {
      path: "/dashboard",
      name: "Dashboards",
      icon: "uil-home-alt",
      header: "Navigation",
      children: [
         {
            path: "/dashboard/analytics",
            name: "Analytics",
            element: AnalyticsDashboards,
            roles: ["Admin"],
            exact: true,
            isAnonymous: false,
         },
      ],
   },
];



const errorRoutes = [
   {
      path: "*",
      name: "Error - 404",
      element: PageNotFound,
      roles: [],
      exact: true,
      isAnonymous: false,
   },
];



const allRoutes = [
  ...dashboardRoutes,
  ...errorRoutes,
];

export default allRoutes;
