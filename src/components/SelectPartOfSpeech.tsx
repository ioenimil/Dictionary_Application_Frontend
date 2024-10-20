import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface Meaning {
    partOfSpeech: string;
  }
  
  interface PartOfSpeechDropdownProps {
    meaning: Meaning; // meaning is of type 'Meaning'
    meaningIndex: number;
    handlePartOfSpeechChange: (index: number, value: string) => void;
  }
const SelectPartOfSpeech : React.FC<PartOfSpeechDropdownProps> = ({ meaning,
    meaningIndex,
    handlePartOfSpeechChange,}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["noun", "verb", "adjective", "adverb","adjective","preposition","pronoun","conjuction","interjuction"];

  const handleOptionClick = (value: string) => {
    handlePartOfSpeechChange(meaningIndex, value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-1/2">
     
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 flex items-center gap-1 cursor-pointer"
      >
        <span className="text-textGrey"> {meaning.partOfSpeech || "Select..."}</span>
        <span className="text-textGrey">{!isOpen ? <FaAngleDown /> : <FaAngleUp />}</span>
       
      </div>
      {isOpen && (
  <ul
    className="absolute px-1 mt-1 bg-white shadow-lightMode dark:shadow-[0px_0px_10px_2px_#FF6500] dark:bg-darkBg rounded-md z-10 transition-all duration-300 ease-in-out transform"
    style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}
  >
    {options.map((option) => (
      <li
        key={option}
        onClick={() => handleOptionClick(option)}
        className="p-2 text-sm hover:text-global_orange  cursor-pointer"
      >
        {option.charAt(0).toUpperCase() + option.slice(1)}
      </li>
    ))}
  </ul>
)}

    </div>
  );
};

export default SelectPartOfSpeech;
