import type { AppProps /*, AppContext */ } from 'next/app';

import '../styles/globals.css';

import { QueryClientProvider } from 'react-query';
import { queryClient } from 'utils';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
