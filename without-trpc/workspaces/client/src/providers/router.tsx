import { createBrowserRouter, RouterProvider as RRProvider } from 'react-router-dom';
import IndexPage from '../pages/index-page';
import FindUserPage from '../pages/user/find-user';
import CreateUserPage from '../pages/user/create-user';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/find-user',
    element: <FindUserPage />,
  },
  {
    path: '/create-user',
    element: <CreateUserPage />
  }
]);

export default function RouterProvider() {
  return <RRProvider router={router} />;
}
