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
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import Equipment from './pages/Equipment';
import { equipments } from './_mock/equipment';
import EquipmentTypes from './pages/EquipmentTypes';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/material-kit-react',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <DashboardApp /> },
        // { path: ':sn', element: <DashboardApp /> },
        { path: 'sn/:sn', element: <DashboardApp /> },
        { path: 'equipment', element: <DashboardApp /> },
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
