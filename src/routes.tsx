import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from './components/layout';
import App from './App';
import LoginPage from './auth/login';
// import User from './pages/User';
import NotFound from './components/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      // {
      //   path: 'users/:id',
      //   element: <User />,
      // },
      {
        path: 'auth/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
