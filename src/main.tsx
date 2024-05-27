import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/global.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootRouter } from './router/RootRouter';
import initMocks from '@/mocks/index.js';
import { Toaster } from 'react-hot-toast';

/**
 * 개발환경에서만 실행해줍니다.
 */
if (import.meta.env.DEV) {
  // await initMocks();
}

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          duration: 1000,
          success: {
            style: {
              color: '#67B472',
            },
          },
          error: {
            style: {
              color: '#ff6969',
            },
          },
          loading: {
            style: {
              color: '#7879F1',
            },
          },
        }}
      />
      <RootRouter />
    </QueryClientProvider>
  </React.StrictMode>
);
