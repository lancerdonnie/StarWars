import type { Character } from 'utils/types';

import { motion } from 'framer-motion';

const getGender = (gender: string) => {
  switch (gender) {
    case 'male':
      return <span className="material-icons text-blue-400">male</span>;
    case 'female':
      return <span className="material-icons text-pink-400">female</span>;
    case 'hermaphrodite':
      return (
        <span className="material-icons text-purple-400">transgender</span>
      );
    default:
      return <span>{gender}</span>;
  }
};

const variants = {
  init: { opacity: 0, y: 50, x: 50 },
  done: { opacity: 1, y: 0, x: 0 },
};

const CharacterRows = ({
  filteredSortedQueries,
}: {
  filteredSortedQueries: (Character | undefined)[];
}) => {
  return (
    <>
      {filteredSortedQueries.map((e) => (
        <motion.div
          variants={variants}
          key={e?.url}
          className="grid grid-cols-10 border-b p-4 border-alt-3 text-sm"
        >
          <div className="col-span-6">{e?.name}</div>
          <div className="col-start-7 col-end-9 text-center">
            {getGender(e?.gender ?? '')}
          </div>
          <div className="col-start-9 col-end-11 text-center">{e?.height}</div>
        </motion.div>
      ))}
    </>
  );
};

export default CharacterRows;
