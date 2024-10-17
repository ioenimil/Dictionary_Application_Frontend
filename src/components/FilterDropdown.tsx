import filterIcon from "@assets/ic_baseline-filter-list.svg";
import { useEffect, useRef, useState } from "react";

interface FilterDropdownProps {
  filter: string;
  handleFilterChange: (event: { target: { value: string } }) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filter,
  handleFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(filter || "Filter");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (value: string, label: string) => {
    setSelected(label);
    handleFilterChange({ target: { value } });
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
        className="flex h-[33px] w-[111px] cursor-pointer items-center rounded bg-grayBg px-3 py-1"
      >
        <img src={filterIcon} alt="filter-icon" className="h-4 w-4" />

        <span className="pl-1 text-base font-medium text-textGrey">
          {selected}
        </span>
      </div>

      {isOpen && (
        <ul
          className={`absolute left-0 z-10 mt-1 rounded bg-white shadow-logInShadow transition-opacity duration-300 ease-out opacity-${isOpen ? 100 : 0}`}
        >
          <li
            className="cursor-pointer px-4 py-2 hover:bg-grayBg"
            onClick={() => selectOption("", "Filter")}
          >
            All
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:bg-grayBg"
            onClick={() => selectOption("noun", "Noun")}
          >
            Noun
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:bg-grayBg"
            onClick={() => selectOption("verb", "Verb")}
          >
            Verb
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:bg-grayBg"
            onClick={() => selectOption("adjective", "Adjective")}
          >
            Adjective
          </li>
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
