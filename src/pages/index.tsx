import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import Movies from 'components/Movies';

export default function Index() {
  return (
    <div className="app relative h-full w-full flex justify-center items-center overflow-hidden">
      <Head>
        <title>Star Wars</title>
        <meta name="description" content="Star Wars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="logo flex flex-col text-alt font-meg text-9xl tracking-widest font-bold">
        <div>STAR</div>
        <div>WARS</div>
      </div>
      <Choose />
    </div>
  );
}

const variants = { show: { top: 0 } };

const Choose = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow((s) => !s);
  const show2 = show ? '' : 'hover:brightness-75';

  return (
    <motion.div
      variants={variants}
      animate={show ? 'show' : ''}
      className={`choose top-[calc(100vh-32px)] h-screen w-full fixed flex flex-col items-center`}
    >
      <div
        onClick={handleClick}
        className={`${show2} flex items-center px-2 py-1 cursor-pointer bg-alt filter transition duration-300 ease-in-out`}
      >
        <span>Choose a star wars movie</span>
        <span className="material-icons">arrow_drop_down</span>
      </div>
      <AnimatePresence>{show && <Movies />}</AnimatePresence>
    </motion.div>
  );
};
