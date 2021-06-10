import { motion } from 'framer-motion';
import type { Result } from 'utils/types';
import Option from './Option';

const variants = {
  ab: {
    bottom: -100,
  },
  abc: {
    bottom: 32,
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1,
      // delayChildren: 1,
      // when: 'beforeChildren',
      // when: 'afterChildren',
    },
  },
  abcd: {
    bottom: -150,
    transition: { staggerChildren: 0.05, when: 'afterChildren' },
  },
};

const Options = ({ data }: { data: Result[] }) => {
  return (
    <motion.ul
      variants={variants}
      initial="ab"
      animate="abc"
      exit="abcd"
      className="z-[-1] absolute w-full text-center"
    >
      {data.map((e, i) => {
        return <Option key={i} result={e} />;
      })}
    </motion.ul>
  );
};

export default Options;
