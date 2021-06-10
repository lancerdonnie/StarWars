import type { AppProps /*, AppContext */ } from 'next/app';
import type { QueryFunctionContext } from 'react-query';

import '../styles/globals.css';

import axios from 'axios';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }: QueryFunctionContext) => {
        const { data } = await axios.get(`${queryKey[0]}`);
        return data;
      },
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    },
  },
});

const variants = {
  initial: { y: '100%' },
  animate: { y: 0 },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
