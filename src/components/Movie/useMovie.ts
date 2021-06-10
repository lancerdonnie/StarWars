import type { Character } from 'utils/types';
import type { ChangeEventHandler } from 'react';

import { useState } from 'react';
import { useQueries } from 'react-query';
import useStore from 'utils/store';

export type SortColumn = 'name' | 'gender' | 'height' | null;
export type SortState = 'asc' | 'desc' | null;

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
  if (state === 'asc') {
    return temp.sort((a, b) => (a[column] > b[column] ? 1 : -1));
  }
  if (state === 'desc') {
    return temp.sort((a, b) => (a[column] < b[column] ? 1 : -1));
  }
  return temp;
};

const useMovie = () => {
  const setMovieOpen = useStore((state) => state.setMovieOpen);
  const movie = useStore((state) => state.movie);

  const [genderFilter, setGenderFilter] = useState('Select');
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortState, setSortState] = useState<SortState>(null);

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
    .filter(
      (e) =>
        genderFilter === 'All' ||
        genderFilter === 'Select' ||
        e?.gender === genderFilter
    );

  const characterCount = filteredQueries.length;
  const characterHeightSum = filteredQueries.reduce((a, e) => {
    a = a + (!isNaN(e?.height as unknown as number) ? parseInt(e!.height) : 0);
    return a;
  }, 0);

  const handleGenderFilterChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setGenderFilter(e.target.value);
  };

  const handleSort = (column: NonNullable<SortColumn>) => () => {
    if (column === sortColumn && sortState === 'asc')
      return setSortState('desc');
    if (column === sortColumn && sortState === 'desc') {
      setSortColumn(null);
      setSortState(null);
      return;
    }
    if (column === sortColumn) return setSortState('asc');
    setSortColumn(column);
    setSortState('asc');
  };

  let filteredSortedQueries = sortAlgo(filteredQueries, sortColumn, sortState);

  return {
    filteredSortedQueries,
    handleSort,
    handleGenderFilterChange,
    characterCount,
    characterHeightSum,
    isLoading,
    error,
    genders,
    setMovieOpen,
    movie,
    genderFilter,
    sortState,
    sortColumn,
  };
};

export default useMovie;
