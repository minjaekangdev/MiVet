import { lazy } from "react";
const Landing = lazy(() => import("../components/landing/Landing"));
const PageNotFound = lazy(() => import("../components/error/Error404"));
const SignUp = lazy(() => import("../components/users/Register.jsx"));
const SignIn = lazy(() => import("../components/users/Login.jsx"));
const Confirm = lazy(() => import("../components/users/Confirm.jsx"));
const ChangePassword = lazy(() => import("components/users/ChangePassword"));

const routes = [
  {
    path: "/",
    name: "Landing",
    exact: true,
    element: Landing,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/users/login",
    name: "Sign In",
    exact: true,
    element: SignIn,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/users/register",
    name: "Sign Up",
    exact: true,
    element: SignUp,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/users/confirm",
    name: "Account Confirmation",
    exact: true,
    element: Confirm,
    roles: [],
    isAnonymous: true,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

var allRoutes = [...routes, ...errorRoutes];

export default allRoutes;
