import type { Character } from 'utils/types';
import { ChangeEventHandler, useEffect } from 'react';

import { motion } from 'framer-motion';
import { useQueries } from 'react-query';
import useStore from 'utils/store';
import { useState } from 'react';

type SortColumn = 'name' | 'gender' | 'height' | null;
type SortState = 'asc' | 'desc' | null;

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

const sortAlgo = (
  data: (Character | undefined)[],
  column: SortColumn,
  state: SortState
): (Character | undefined)[] => {
  if (data.some((e) => e === undefined) || column === null) return data;
  const temp = [...data] as Character[];
  if (column === 'height') {
    if (state === 'asc') {
      return temp.sort((a, b) => parseInt(a[column]) - parseInt(b[column]));
    }
    if (state === 'desc') {
      return temp.sort((a, b) => parseInt(b[column]) - parseInt(a[column]));
    }
    return temp;
  }
  // console.log(column, state);
  if (state === 'asc') {
    return temp.sort((a, b) => (a[column] > b[column] ? 1 : -1));
  }
  if (state === 'desc') {
    return temp.sort((a, b) => (a[column] < b[column] ? 1 : -1));
  }
  return temp;
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
  const setMovieOpen = useStore((state) => state.setMovieOpen);
  const movie = useStore((state) => state.movie);

  const [genderFilter, setGenderFilter] = useState('All');
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortState, setSortState] = useState<SortState>(null);

  // useEffect(() => {
  //   if (sortColumn !== null) setSortState('asc');
  // }, [sortColumn]);

  const queries = useQueries(
    (movie?.characters ?? []).map((user) => ({ queryKey: [user] }))
  );

  const isLoading = queries.some((e) => e.isLoading);
  const error = queries.some((e) => e.error);
  const genders = [
    ...new Set(queries.map((e) => (e.data as Character)?.gender)),
  ];

  let filteredQueries = queries
    .map((e) => e.data as Character | undefined)
    .filter((e) => genderFilter === 'All' || e?.gender === genderFilter);

  const characterCount = filteredQueries.length;
  const characterHeightSum = filteredQueries.reduce((a, e) => {
    a = a + parseInt(e?.height ?? '0');
    return a;
  }, 0);

  const handleGenderFilterChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setGenderFilter(e.target.value);
  };

  const handleSort = (column: NonNullable<SortColumn>) => () => {
    if (column === sortColumn && sortState === 'desc') {
      setSortColumn(null);
      setSortState(null);
      return;
    }
    if (column === sortColumn && sortState === 'asc')
      return setSortState('desc');
    if (column === sortColumn) return setSortState('asc');
    setSortColumn(column);
    setSortState('asc');
  };

  let filteredSortedQueries = sortAlgo(filteredQueries, sortColumn, sortState);

  return (
    <motion.div
      animate={{ left: 0 }}
      exit={{ left: '100%' }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen bg-main text-white absolute inset-0 left-full overflow-hidden flex flex-col"
    >
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
