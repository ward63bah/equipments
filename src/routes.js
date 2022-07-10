import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import Equipment from './pages/Equipment';
import { equipments } from './_mock/equipment';
import EquipmentTypes from './pages/EquipmentTypes';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      // element: <DashboardLayout />,
      children: [{ path: '', element: <Login /> }],
    },
    {
      path: '/register',
      // element: <DashboardLayout />,
      children: [{ path: '', element: <Register /> }],
    },
    {
      path: '/reset',
      // element: <DashboardLayout />,
      children: [{ path: '', element: <Reset /> }],
    },

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
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/material-kit-react/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
