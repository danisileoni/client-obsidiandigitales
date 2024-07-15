import { Footer } from '@/components/common/Footer';
import { AuthContext } from '@/hooks/useAuth';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import '../index.css';
import { NotFoundPage } from '@/pages/NotFoundPage';
import React from 'react';

type RouterContext = {
  authentication: AuthContext;
};

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div id="root">
        <main>
          <Outlet />
          <TanStackRouterDevtools />
        </main>
        <Footer />
      </div>
    </>
  ),
  notFoundComponent: () => <NotFoundPage />,
});
