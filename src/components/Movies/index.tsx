import React from 'react';
import { useQuery } from 'react-query';
import { BASE_URL } from 'utils/constants';

interface Result {
  characters: string[]; //url
  created: string; //datetime
  director: string;
  edited: string; //datetime
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string; //date
  species: string[]; //url
  starships: string[]; //url
  title: string;
  url: string;
  vehicles: string[]; //url
}

interface Movie {
  results: Result[];
}

export default function Movies() {
  const { data } = useQuery<Movie>(BASE_URL + 'films/');
  console.log(data?.results[0]);

  return <div className="choose__select h-full w-full bg-alt"></div>;
}
