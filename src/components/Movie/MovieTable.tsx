import type { SortColumn, SortState } from './useMovie';
import type { Character } from 'utils/types';

import CharacterHeaderRow from './CharacterHeaderRow';
import CharacterRows from './CharacterRows';
import CharacterFooterRow from './CharacterFooterRow';
import { motion } from 'framer-motion';

interface Props {
  filteredSortedQueries: (Character | undefined)[];
  characterCount: number;
  characterHeightSum: number;
  handleSort: (column: NonNullable<SortColumn>) => () => void;
  sortState: SortState;
  sortColumn: SortColumn;
}

const variants = {
  init: { opacity: 0, y: 100 },
  done: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.3, delayChildren: 1.3 },
  },
};

const MovieTable = ({
  handleSort,
  sortState,
  sortColumn,
  filteredSortedQueries,
  characterCount,
  characterHeightSum,
}: Props) => {
  return (
    <motion.div
      variants={variants}
      initial="init"
      animate="done"
      transition={{ delay: 1.2, duration: 0.8 }}
      className="mt-8 font-mont"
    >
      <CharacterHeaderRow
        handleSort={handleSort}
        sortState={sortState}
        sortColumn={sortColumn}
      />
      <CharacterRows filteredSortedQueries={filteredSortedQueries} />
      <CharacterFooterRow
        characterCount={characterCount}
        characterHeightSum={characterHeightSum}
      />
    </motion.div>
  );
};

export default MovieTable;
