import type { AppProps /*, AppContext */ } from 'next/app';
import '../styles/animations.css';
import '../styles/globals.css';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  initial: { y: '100%' },
  animate: { y: 0 },
};

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
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
  );
}

export default MyApp;
