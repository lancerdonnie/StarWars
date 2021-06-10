import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Home from 'components/Home';
import Movie from 'components/Movie';
import useStore from 'utils/store';

export default function Index() {
  const isMovieOpen = useStore((state) => state.isMovieOpen);

  return (
    <div className="app h-full w-full flex justify-center items-center overflow-hidden">
      <Head>
        <title>Star Wars Sage</title>
        <meta
          name="description"
          content="
          Star Wars Sage is an app that lists the names of
          Star Wars movies in a dropdown along with a list of the characters that appear in that
          movie. By Adedeji Babajide, lancerdonnie"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <AnimatePresence>{isMovieOpen && <Movie />}</AnimatePresence>
    </div>
  );
}
