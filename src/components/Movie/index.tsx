import { motion } from 'framer-motion';
import useMovie from './useMovie';

const feetDivisible = 30.48;
const inchDivisible = 2.54;

const cmToFeet = (cmValue: number) => {
  return (cmValue / feetDivisible).toFixed(2);
};

const cmToInches = (cmValue: number) => {
  return (cmValue / inchDivisible).toFixed(2);
};

const getTotalHeight = (cmValue: number) => {
  const inches = cmToInches(cmValue);
  const feet = cmToFeet(cmValue);
  return `${cmValue} cm (${feet}ft/${inches}in)`;
};

const getGender = (gender: string) => {
  switch (gender) {
    case 'male':
      return <span className="material-icons">male</span>;
    case 'female':
      return <span className="material-icons">female</span>;
    case 'hermaphrodite':
      return <span className="material-icons">transgender</span>;
    default:
      return <span>{gender}</span>;
  }
};

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
      transition={{ duration: 0.5 }}
      // style={{ backgroundImage: `url("/moviebg.jpg")` }}
      className="h-screen w-screen z-0 bg-main text-white absolute inset-0 left-full overflow-hidden flex flex-col"
    >
      {/* <img src="/moviebg.jpg" /> */}
      {/* <Image
        className="absolute inset-0 z-[-1]"
        layout="fill"
        objectFit="cover"
        src="/moviebg.jpg"
      /> */}
      <div
        className="flex items-center p-3 cursor-pointer"
        onClick={() => setMovieOpen(false)}
      >
        <span className="material-icons">arrow_back_ios</span>
        Back
      </div>
      <div className="overflow-auto p-4">
        {isLoading ? (
          <div>loading</div>
        ) : error ? (
          <div>error</div>
        ) : (
          <>
            <div>
              <div>{movie?.title}</div>
              <div>{movie?.opening_crawl}</div>
            </div>
            <div>
              <select
                className="bg-blue-400"
                value={genderFilter}
                onChange={handleGenderFilterChange}
              >
                <option value="All">All</option>
                {genders.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-8">
              <div className="material-icons">sort</div>
              <div className="grid grid-cols-10 border-b p-4 border-alt-3 cursor-pointer">
                <div
                  onClick={handleSort('name')}
                  className="col-span-6 flex items-center"
                >
                  <span>NAME</span>
                  {sortState && sortColumn === 'name' && (
                    <span className="material-icons">
                      arrow_drop_{sortState === 'asc' ? 'up' : 'down'}
                    </span>
                  )}
                </div>
                <div
                  onClick={handleSort('gender')}
                  className="col-start-7 col-end-9  flex items-center text-center"
                >
                  <span>GENDER</span>
                  {sortState && sortColumn === 'gender' && (
                    <span className="material-icons">
                      arrow_drop_{sortState === 'asc' ? 'up' : 'down'}
                    </span>
                  )}
                </div>
                <div
                  onClick={handleSort('height')}
                  className="col-start-9 col-end-11  flex items-center text-center"
                >
                  <span>HEIGHT (CM)</span>
                  {sortState && sortColumn === 'height' && (
                    <span className="material-icons">
                      arrow_drop_{sortState === 'asc' ? 'up' : 'down'}
                    </span>
                  )}
                </div>
              </div>
              {filteredSortedQueries.map((e) => (
                <div
                  key={e?.url}
                  className="grid grid-cols-10 border-b p-4 border-alt-3"
                >
                  <div className="col-span-6">{e?.name}</div>
                  <div className="col-start-7 col-end-9 text-center">
                    {getGender(e?.gender ?? '')}
                  </div>
                  <div className="col-start-9 col-end-11 text-center">
                    {e?.height}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-10 border-b p-4 border-alt-3">
                <div className="col-span-6">
                  No of characters: {characterCount}
                </div>
                <div className="col-start-7 col-end-11 text-center">
                  Total height: {getTotalHeight(characterHeightSum)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
