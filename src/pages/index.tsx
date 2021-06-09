import type { Movie } from 'utils/types';

import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Mov from 'components/Movie';
import Options from 'components/Options';
import { useQuery } from 'react-query';
import { BASE_URL } from 'utils/constants';
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
      <motion.div className="h-full relative flex justify-center items-center">
        <div className="logo flex flex-col text-alt font-meg text-9xl tracking-widest font-bold">
          <div>STAR</div>
          <div>WARS</div>
        </div>
        <Choose />
      </motion.div>
      <AnimatePresence>{isMovieOpen && <Mov />}</AnimatePresence>
    </div>
  );
}

const variants = { show: { top: 0 } };

const Choose = () => {
  const setOptionsOpen = useStore((state) => state.setOptionsOpen);
  const isOptionsOpen = useStore((state) => state.isOptionsOpen);

  const handleClick = () => setOptionsOpen(!isOptionsOpen);
  const show2 = isOptionsOpen ? '' : 'hover:brightness-75';

  const { data, isLoading, error } = useQuery<Movie>(BASE_URL + 'films/');

  return (
    <motion.div
      variants={variants}
      className={`choose bottom-0 absolute flex items-center`}
    >
      <div
        onClick={handleClick}
        className={`${show2} flex items-center px-2 py-1 cursor-pointer bg-alt filter transition duration-300 ease-in-out`}
      >
        {isLoading ? (
          'Loading movies...'
        ) : error ? (
          'Error loading  movies'
        ) : (
          <>
            <span>Choose a star wars movie</span>
            <span className="material-icons">arrow_drop_down</span>
          </>
        )}
      </div>
      <AnimatePresence>
        {isOptionsOpen && data && <Options data={data.results} />}
      </AnimatePresence>
    </motion.div>
  );
};
