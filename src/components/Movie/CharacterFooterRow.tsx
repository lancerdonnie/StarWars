import { motion } from 'framer-motion';

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

const variants = {
  init: { opacity: 0, y: 100 },
  done: {
    opacity: 0.6,
    y: 0,
    transition: { staggerChildren: 0.3, delayChildren: 1.3 },
  },
};

interface Props {
  characterCount: number;
  characterHeightSum: number;
}

const CharacterFooterRow = ({ characterCount, characterHeightSum }: Props) => {
  return (
    <motion.div
      variants={variants}
      className="grid grid-cols-10 border-b p-4 border-alt-3"
    >
      <div className="col-span-5">No of characters: {characterCount}</div>
      <div className="col-start-6 col-end-11 text-right">
        Total height: {getTotalHeight(characterHeightSum)}
      </div>
    </motion.div>
  );
};

export default CharacterFooterRow;
