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
    <div className="mt-10 font-mont">
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
    </div>
  );
};

export default GenderSelect;
