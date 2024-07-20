import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { isLoggedIn } from 'src/utils/auth';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const MapPage = lazy(() => import('src/pages/map'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const UploadPage = lazy(() => import('src/pages/upload'));
export const UploadLicensePage = lazy(() => import('src/pages/upload license'));
export const PaymentPage = lazy(() => import('src/pages/payment'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const loggedIn = isLoggedIn();
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: loggedIn ? <IndexPage /> : <Navigate to="/login" replace />, index: true },
        { path: 'order', element: loggedIn ? <OrderPage /> : <Navigate to="/login" replace /> },
      ],
    },
    {
      path: 'login',
      element: loggedIn ? <Navigate to="/" replace /> : <LoginPage />,
    },
    {
      path: 'map-view',
      element: loggedIn ? <MapPage /> : <Navigate to="/login" replace />,
    },
    {
      path: 'register',
      element: loggedIn ? <Navigate to="/" replace /> : <RegisterPage />,
    },
    {
      path: 'upload',
      element: loggedIn ? <UploadPage /> : <Navigate to="/login" replace />,
    },
    {
      path: 'upload-license',
      element: loggedIn ? <UploadLicensePage /> : <Navigate to="/login" replace />,
    },
    {
      path: 'payment',
      element: loggedIn ? <PaymentPage /> : <Navigate to="/login" replace />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
