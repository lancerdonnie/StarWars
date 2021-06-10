import Image from 'next/image';
import MovieTable from './MovieTable';
import GenderSelect from './GenderSelect';
import useMovie from './useMovie';
import { AnimatePresence, motion } from 'framer-motion';

export default function Movie() {
  const {
    isLoading,
    error,
    filteredSortedQueries,
    handleSort,
    handleGenderFilterChange,
    characterCount,
    characterHeightSum,
    genders,
    setMovieOpen,
    movie,
    genderFilter,
    sortState,
    sortColumn,
  } = useMovie();

  return (
    <motion.div
      layout
      animate={{ left: 0 }}
      exit={{ left: '100%' }}
      transition={{ duration: 0.4 }}
      className="h-full w-full bg-main text-white absolute inset-0 left-full "
    >
      <Image
        className="absolute inset-0 opacity-50"
        layout="fill"
        objectFit="cover"
        src="/moviebg.jpg"
      />
      <div className="movie relative h-full overflow-auto overflow-x-hidden flex flex-col">
        <div
          className="flex items-center p-3 cursor-pointer sticky top-0 bg-main opacity-70"
          onClick={() => setMovieOpen(false)}
        >
          <span className="material-icons">arrow_back_ios</span>
          Back
        </div>
        <div className="p-4 h-full">
          <AnimatePresence>
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <ErrorComp />
            ) : (
              <>
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-3xl"
                  >
                    {movie?.title}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-6 font-mont text-justify tracking-wide"
                  >
                    {movie?.opening_crawl}
                  </motion.div>
                </div>
                <GenderSelect
                  genderFilter={genderFilter}
                  handleGenderFilterChange={handleGenderFilterChange}
                  genders={genders}
                />
                <MovieTable
                  handleSort={handleSort}
                  sortState={sortState}
                  sortColumn={sortColumn}
                  filteredSortedQueries={filteredSortedQueries}
                  characterCount={characterCount}
                  characterHeightSum={characterHeightSum}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const Spinner = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            transition: {
              repeat: Infinity,
              duration: 3,
              restDelta: 0.5,
            },
          }}
        >
          <Image src="/load.png" height="64" width="64" />
        </motion.div>
        <div className="absolute -bottom-16 w-screen text-center">
          Loading Interstellar data...
        </div>
      </div>
    </div>
  );
};

const ErrorComp = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Image src="/error.png" height="128" width="128" />
      <div className="mt-10">Oops.. error fetching data</div>
      <div>Darth Vadar has destroyed the Galactic Empire</div>
    </div>
  );
};
