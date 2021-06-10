import { motion } from 'framer-motion';
import MovieSelector from './MovieSelector';

const index = () => {
  return (
    <motion.div className="h-full relative flex justify-center items-center">
      <div className="logo flex flex-col text-alt font-meg text-9xl tracking-widest font-bold">
        <div className="text-center ">STAR</div>
        <div className="text-center">WARS</div>
      </div>
      <MovieSelector />
    </motion.div>
  );
};

export default index;
