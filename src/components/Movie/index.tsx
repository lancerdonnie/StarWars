import Image from 'next/image';

import { motion } from 'framer-motion';
import MovieTable from './MovieTable';
import useMovie from './useMovie';
import GenderSelect from './GenderSelect';

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
      animate={{ left: 0 }}
      exit={{ left: '100%' }}
      transition={{ duration: 0.4 }}
      className="h-full w-full bg-main text-white absolute inset-0 left-full "
    >
      <Image
        className="absolute inset-0 opacity-50"
        layout="fill"
        objectFit="cover"
        src="/moviebg2.jpg"
      />
      <div className="movie relative h-full overflow-auto flex flex-col">
        <div
          className="flex items-center p-3 cursor-pointer sticky top-0 bg-main opacity-70"
          onClick={() => setMovieOpen(false)}
        >
          <span className="material-icons">arrow_back_ios</span>
          Back
        </div>
        <div className="p-4">
          {isLoading ? (
            <div>loading</div>
          ) : error ? (
            <div>error</div>
          ) : (
            <>
              <div>
                <div className="text-4xl">{movie?.title}</div>
                <div className="mt-6 font-mont text-justify tracking-wide">
                  {movie?.opening_crawl}
                </div>
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
        </div>
      </div>
    </motion.div>
  );
}
