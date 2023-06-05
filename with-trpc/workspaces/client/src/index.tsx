import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterProvider from './providers/router';
import { TRPCProvider } from './providers/trpc';

async function renderRoot() {

  const RootComponent = (
    <StrictMode>
      <TRPCProvider>
        <RouterProvider />
      </TRPCProvider>
    </StrictMode>
  );

  const rootElement = document.getElementById('root') as HTMLElement;
  const root = createRoot(rootElement);
  root.render(RootComponent);
}

renderRoot();
