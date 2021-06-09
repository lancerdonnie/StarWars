import React from 'react';
import { useQuery } from 'react-query';
import { BASE_URL } from 'utils/constants';
import type { Movie } from 'utils/types';

export default function Movies() {
  const { data } = useQuery<Movie>(BASE_URL + 'films/');
  console.log(data?.results[0]);

  return <div className="choose__select h-full w-full bg-alt"></div>;
}
