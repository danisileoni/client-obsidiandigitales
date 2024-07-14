import { Footer } from '@/components/common/Footer';
import { AuthContext } from '@/hooks/useAuth';
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { NotFoundPage } from '@/pages/NotFoundPage';

type RouterContext = {
  authentication: AuthContext;
};

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
