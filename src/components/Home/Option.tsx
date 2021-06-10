import type { Result } from 'utils/types';

import { motion } from 'framer-motion';
import useStore from 'utils/store';

interface Props {
  result: Result;
}

const variants = {
  start: { opacity: 0 },
  in: { opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  end: { opacity: 0, transition: { y: { stiffness: 1000 } } },
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
      className="text-white py-2 cursor-pointer bg-alt-3 hover:bg-main transition duration-300 ease-in-out"
      variants={variants}
    >
      {result.title}
    </motion.li>
  );
};

export default Option;
