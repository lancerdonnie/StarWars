import MovieSelector from './MovieSelector';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="h-screen w-full relative flex justify-center items-center">
      <div className="flex flex-col text-alt font-meg text-9xl sm:text-8xl tracking-widest font-bold">
        <Title text="STAR" from="left" />
        <Title text="WARS" from="right" />
      </div>
      <MovieSelector />
    </div>
  );
};

interface TitleProps {
  text: string;
  from: 'left' | 'right';
}

const variants = {
  init: { x: '-100%' },
  init2: { x: '100%' },
  enter: { x: 0 },
};

const Title = ({ text, from }: TitleProps) => {
  return (
    <motion.div
      variants={variants}
      initial={from === 'left' ? 'init' : 'init2'}
      animate="enter"
      transition={{ duration: 1 }}
      className="text-center"
    >
      {text}
    </motion.div>
  );
};

export default Home;
