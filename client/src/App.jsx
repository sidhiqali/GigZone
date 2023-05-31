import { useState } from 'react';
import { Header, Footer } from './components';
import {
  Gigs,
  Home,
  Add,
  Gig,
  Login,
  Message,
  Messages,
  MyGigs,
  Order,
  Register,
  Pay,
  Success,
} from './pages';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {
  const Layout = () => {
    return (
      <div className=''>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/gigs',
          element: <Gigs />,
        },
        {
          path: '/add',
          element: <Add />,
        },
        {
          path: '/gig/:id',
          element: <Gig />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/message/:id',
          element: <Message />,
        },
        {
          path: '/messages',
          element: <Messages />,
        },
        {
          path: '/mygigs',
          element: <MyGigs />,
        },
        {
          path: '/order',
          element: <Order />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/Payment/:id',
          element: <Pay />,
        },
        {
          path: '/success',
          element: <Success />,
        },
        {},
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
