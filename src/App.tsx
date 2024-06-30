import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useAuth } from './hooks/useAuth';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  context: { authentication: undefined! },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuth();
  return (
    <>
      <RouterProvider router={router} context={{ authentication: auth }} />
    </>
  );
}

export default App;
