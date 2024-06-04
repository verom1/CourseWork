import { Outlet, createBrowserRouter, RouteObject } from "react-router-dom";

import { AuthenticatedGuard, UnauthenticatedGuard } from "./guards";
import {
  UnauthenticatedAuthLayout,
  AuthenticatedLayout,
} from "../components/layout";
import { navigationLinks } from "./links";
import { LoginPage, RegisterPage } from "@/modules/auth/pages";
import { BudgetPage } from "@/modules/budget/pages";

const authorizedRoutes: RouteObject[] = [
  {
    element: <AuthenticatedGuard />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          {
            path: navigationLinks.budget,
            element: <BudgetPage />,
          },
        ],
      },
    ],
  },
];

const unauthorizedRoutes: RouteObject[] = [
  {
    element: <UnauthenticatedGuard />,
    children: [
      {
        element: <UnauthenticatedAuthLayout />,
        children: [
          {
            path: navigationLinks.login,
            element: <LoginPage />,
          },
          {
            path: navigationLinks.register,
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [...authorizedRoutes, ...unauthorizedRoutes],
  },
]);
