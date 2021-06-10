import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Home from 'components/Home';
import Mov from 'components/Movie';
import useStore from 'utils/store';

export default function Index() {
  const isMovieOpen = useStore((state) => state.isMovieOpen);

  return (
    <div className="app h-full w-full flex justify-center items-center overflow-hidden">
      <Head>
        <title>Star Wars</title>
        <meta name="description" content="Star Wars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <AnimatePresence>{isMovieOpen && <Mov />}</AnimatePresence>
    </div>
  );
}
