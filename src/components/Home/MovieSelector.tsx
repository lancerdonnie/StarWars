import type { Movie } from 'utils/types';

import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { BASE_URL } from 'utils/constants';
import useStore from 'utils/store';
import Options from './Options';

const variants = { show: { top: 0 } };

const MovieSelector = () => {
  const setOptionsOpen = useStore((state) => state.setOptionsOpen);
  const isOptionsOpen = useStore((state) => state.isOptionsOpen);

  const handleClick = () => setOptionsOpen(!isOptionsOpen);
  const show2 = isOptionsOpen ? '' : 'hover:brightness-75';

  const { data, isLoading, error } = useQuery<Movie>(BASE_URL + 'films/', {
    select: (data) => {
      const x = { ...data };
      x.results.sort(
        (a, b) => +new Date(a.release_date) - +new Date(b.release_date)
      );
      return x;
    },
  });

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

export default MovieSelector;
