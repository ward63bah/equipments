import React, { useContext } from 'react';
import { Route, Redirect, Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
// Components
import Blog from './pages/Blog';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import { AuthContext } from './Auth';

// ----------------------------------------------------------------------

export default function PrivateRouter() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          useRoutes([
            {
              path: '/equipments',
              element: <DashboardLayout />,
              children: [
                { path: '', element: <DashboardApp /> },
                // { path: 'equipments', element: <DashboardApp /> },
                // { path: ':sn', element: <DashboardApp /> },
                { path: 'sn=:sn', element: <DashboardApp /> },
                // { path: 'equipment', element: <DashboardApp /> },
                // { path: 'equipment', element: <Equipment equipments={equipments} /> },
                // { path: 'user', element: <User /> },
                { path: 'products', element: <Products /> },
                { path: 'blog', element: <Blog /> },
              ],
            },
            // {
            //   path: '/',
            //   element: <LogoOnlyLayout />,
            //   children: [
            //     { path: '/', element: <Navigate to="/material-kit-react/app" /> },
            //     { path: 'login', element: <Login /> },
            //     { path: 'register', element: <Register /> },
            //     { path: '404', element: <NotFound /> },
            //     { path: '*', element: <Navigate to="/404" /> },
            //   ],
            // },
            { path: '*', element: <Navigate to="/404" replace /> },
          ])
        ) : (
          <Redirect to={'/'} />
        )
      }
    />
  );
}
