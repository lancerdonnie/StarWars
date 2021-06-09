import type { Result } from 'utils/types';

import { motion } from 'framer-motion';
import React from 'react';
import useStore from 'utils/store';

interface Props {
  result: Result;
}

const variants = {
  ab: { opacity: 0 },
  abc: { opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  abcd: { opacity: 0, transition: { y: { stiffness: 1000 } } },
};

const Option = ({ result }: Props) => {
  const setMovieOpen = useStore((state) => state.setMovieOpen);
  const setOptionsOpen = useStore((state) => state.setOptionsOpen);
  const setMovie = useStore((state) => state.setMovie);

  const handleClick = () => {
    setMovieOpen(true);
    setMovie(result);
    setOptionsOpen(false);
  };
  return (
    <motion.li
      onClick={handleClick}
      className="text-white cursor-pointer bg-alt-3 hover:bg-main transition duration-300 ease-in-out"
      variants={variants}
    >
      {result.title}
    </motion.li>
  );
};

export default Option;
