import type { AppProps /*, AppContext */ } from 'next/app';
import type { QueryFunctionContext } from 'react-query';

import '../styles/animations.css';
import '../styles/globals.css';

import axios from 'axios';
import { QueryClientProvider, QueryClient } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';

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

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <AnimatePresence initial={false}>
        <motion.div
          key={router.pathname}
          className="h-screen w-screen overflow-hidden"
          variants={variants}
          initial="initial"
          animate="animate"
          exit={{ y: '-100%', position: 'absolute' }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default MyApp;
