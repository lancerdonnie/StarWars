import MovieSelector from './MovieSelector';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="h-full relative flex justify-center items-center">
      <div className="logo flex flex-col text-alt font-meg text-9xl sm:text-8xl tracking-widest font-bold">
        {/* <Title text="STAR" from="left" /> */}
        <motion.div
          initial={{ x: '0px', position: 'relative' }}
          animate={{ x: '100px', position: 'relative' }}
          // transition={{ delay: 10 }}
          // transition={{ duration: 5 }}
          className="text-center "
        >
          star
        </motion.div>
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
  init: { x: -500 },
  init2: { x: 500 },
  ent: { x: 300 },
};

const Title = ({ text, from }: TitleProps) => {
  return (
    <motion.div
      // variants={variants}
      // initial={from === 'left' ? 'init' : 'init2'}
      // initial={'init'}
      // animate="ent"
      // initial={true}
      // style={{ x: 100 }}
      // animate={{ x: 300 }}
      // transition={{ duration: 5 }}
      className="text-center"
    >
      {text}
    </motion.div>
  );
};

export default Home;
