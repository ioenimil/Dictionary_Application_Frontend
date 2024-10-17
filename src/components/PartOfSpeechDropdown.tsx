import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface PartOfSpeechDropdownProps {
  onSelect: (value: string) => void;
}

const PartOfSpeechDropdown: React.FC<PartOfSpeechDropdownProps> = ({
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Noun");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (value: string, label: string) => {
    setSelected(label);
    onSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-[111px]">
      <div
        onClick={toggleDropdown}
        className="flex h-[33px] w-[111px] cursor-pointer items-center rounded px-3 py-1"
      >
        <span className="pl-1 text-base text-textGrey">{selected}</span>
        <FaChevronDown className="h-[6px] w-3" />
      </div>

      {isOpen && (
        <ul
          className={`w-[114px]h-[352px] absolute left-0 z-10 mt-1 rounded-2xl bg-white shadow-lightMode transition-opacity duration-300 ease-out opacity-${isOpen ? 100 : 0}`}
        >
          <li
            className="cursor-pointer px-4 py-2 hover:text-global_blue"
            onClick={() => selectOption("noun", "Noun")}
          >
            Noun
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:text-global_blue"
            onClick={() => selectOption("verb", "Verb")}
          >
            Verb
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:text-global_blue"
            onClick={() => selectOption("adverb", "Adverb")}
          >
            Adverb
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:text-global_blue"
            onClick={() => selectOption("adjective", "Adjective")}
          >
            Adjective
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:text-global_blue"
            onClick={() => selectOption("preposition", "Preposition")}
          >
            Preposition
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:text-global_blue"
            onClick={() => selectOption("pronoun", "Pronoun")}
          >
            Pronoun
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:text-global_blue"
            onClick={() => selectOption("conjunction", "Conjunction")}
          >
            Conjunction
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:text-global_blue"
            onClick={() => selectOption("interjection", "Interjection")}
          >
            Interjection
          </li>
        </ul>
      )}
    </div>
  );
};

export default PartOfSpeechDropdown;
