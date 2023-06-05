import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterProvider from './providers/router';
import { QueryProvider } from './providers/query';

async function renderRoot() {

  const RootComponent = (
    <StrictMode>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </StrictMode>
  );

  const rootElement = document.getElementById('root') as HTMLElement;
  const root = createRoot(rootElement);
  root.render(RootComponent);
}

renderRoot();
