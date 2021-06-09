import type { Character } from 'utils/types';
import CharacterHeaderRow from './CharacterHeaderRow';
import CharacterRows from './CharacterRows';
import type { SortColumn, SortState } from './useMovie';

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

interface Props {
  filteredSortedQueries: (Character | undefined)[];
  characterCount: number;
  characterHeightSum: number;
  handleSort: (column: NonNullable<SortColumn>) => any;
  sortState: SortState;
  sortColumn: SortColumn;
}

const MovieTable = ({
  handleSort,
  sortState,
  sortColumn,
  filteredSortedQueries,
  characterCount,
  characterHeightSum,
}: Props) => {
  return (
    <div className="mt-8 font-mont">
      <CharacterHeaderRow
        handleSort={handleSort}
        sortState={sortState}
        sortColumn={sortColumn}
      />
      <CharacterRows filteredSortedQueries={filteredSortedQueries} />
      <div className="grid grid-cols-10 border-b p-4 border-alt-3 opacity-60">
        <div className="col-span-5">No of characters: {characterCount}</div>
        <div className="col-start-6 col-end-11 text-right">
          Total height: {getTotalHeight(characterHeightSum)}
        </div>
      </div>
    </div>
  );
};

export default MovieTable;
