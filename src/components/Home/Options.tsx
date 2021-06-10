import type { Result } from 'utils/types';

import Option from './Option';
import { motion } from 'framer-motion';

const variants = {
  start: {
    bottom: -100,
  },
  in: {
    bottom: 32,
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1,
    },
  },
  end: {
    bottom: -150,
    transition: { staggerChildren: 0.05, when: 'afterChildren' },
  },
};

const Options = ({ data }: { data: Result[] }) => {
  return (
    <motion.ul
      variants={variants}
      initial="start"
      animate="in"
      exit="end"
      className="absolute w-full text-center"
    >
      {data.map((e, i) => {
        return <Option key={i} result={e} />;
      })}
    </motion.ul>
  );
};

export default Options;
