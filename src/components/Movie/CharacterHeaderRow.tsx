import { motion } from 'framer-motion';
import type { SortColumn, SortState } from './useMovie';

interface CharacterHeaderRowProps {
  handleSort: (column: NonNullable<SortColumn>) => any;
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

const CharacterHeaderRow = ({
  handleSort,
  sortState,
  sortColumn,
}: CharacterHeaderRowProps) => {
  return (
    <motion.div
      variants={variants}
      className="grid grid-cols-10 border-b p-4 border-alt-3 cursor-pointer opacity-60 font-orb"
    >
      <div
        onClick={handleSort('name')}
        className="col-span-6 flex items-center"
      >
        <div className="material-icons mr-2">sort</div>
        <span>NAME</span>
        {sortState && sortColumn === 'name' && (
          <span className="material-icons">
            arrow_drop_{sortState === 'asc' ? 'up' : 'down'}
          </span>
        )}
      </div>
      <div
        onClick={handleSort('gender')}
        className="col-start-7 col-end-9  flex items-center justify-center"
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
        className="col-start-9 col-end-11  flex items-center justify-center"
      >
        <span>HEIGHT (CM)</span>
        {sortState && sortColumn === 'height' && (
          <span className="material-icons">
            arrow_drop_{sortState === 'asc' ? 'up' : 'down'}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default CharacterHeaderRow;
