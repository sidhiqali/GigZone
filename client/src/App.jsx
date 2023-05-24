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
} from './pages';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

function App() {
  const Layout = () => {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
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
