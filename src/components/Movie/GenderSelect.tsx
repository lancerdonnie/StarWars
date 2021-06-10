import { motion } from 'framer-motion';
import type { ChangeEventHandler } from 'react';

interface GenderSelectProps {
  genderFilter: string;
  handleGenderFilterChange: ChangeEventHandler<HTMLSelectElement>;
  genders: string[];
}
const GenderSelect = ({
  genderFilter,
  handleGenderFilterChange,
  genders,
}: GenderSelectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="mt-10 font-mont"
    >
      <select
        className="bg-[#DBDB00] text-main uppercase p-2 px-4 cursor-pointer"
        value={genderFilter}
        onChange={handleGenderFilterChange}
      >
        <option disabled value="Select">
          Filter by gender
        </option>
        <option value="All">All</option>
        {genders.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

export default GenderSelect;
