import type { Result, StoreState } from './types';
import create from 'zustand';

const useStore = create<StoreState>((set) => ({
  isMovieOpen: false,
  setMovieOpen: (x: boolean) => set({ isMovieOpen: x }),
  isOptionsOpen: false,
  setOptionsOpen: (x: boolean) => set({ isOptionsOpen: x }),
  movie: null,
  setMovie: (x: Result) => set({ movie: x }),
}));

export default useStore;
