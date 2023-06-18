import { lazy, Suspense } from 'react';
import { Header, Footer, Loader } from './components';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Lazy load the page components

const Home = lazy(() => import('./pages/Home'));
const Gigs = lazy(() => import('./pages/Gigs'));
const Add = lazy(() => import('./pages/Add'));
const Gig = lazy(() => import('./pages/Gig'));
const Login = lazy(() => import('./pages/Login'));
const Message = lazy(() => import('./pages/Message'));
const Messages = lazy(() => import('./pages/Messages'));
const MyGigs = lazy(() => import('./pages/MyGigs'));
const Order = lazy(() => import('./pages/Order'));
const Register = lazy(() => import('./pages/Register'));
const Pay = lazy(() => import('./pages/Pay'));
const Success = lazy(() => import('./pages/Success'));

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

  const FallbackLoading = () => {
    return (
      <div className='flex justify-center items-center'>
        <Loader />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<FallbackLoading />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: '/gigs',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Gigs />
            </Suspense>
          ),
        },
        {
          path: '/add',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Add />
            </Suspense>
          ),
        },
        {
          path: '/edit/:id',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Add />
            </Suspense>
          ),
        },
        {
          path: '/gig/:id',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Gig />
            </Suspense>
          ),
        },
        {
          path: '/login',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: '/message/:id',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Message />
            </Suspense>
          ),
        },
        {
          path: '/messages',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Messages />
            </Suspense>
          ),
        },
        {
          path: '/mygigs',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <MyGigs />
            </Suspense>
          ),
        },
        {
          path: '/order',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Order />
            </Suspense>
          ),
        },
        {
          path: '/register',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: '/Payment/:id',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Pay />
            </Suspense>
          ),
        },
        {
          path: '/success',
          element: (
            <Suspense fallback={<FallbackLoading />}>
              <Success />
            </Suspense>
          ),
        },
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
