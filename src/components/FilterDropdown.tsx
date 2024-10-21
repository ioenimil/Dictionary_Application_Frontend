import filterIcon from "@assets/ic_baseline-filter-list.svg";
import { useEffect, useRef, useState } from "react";

interface FilterDropdownProps {
  filter: string;
  handleFilterChange: (event: { target: { value: string } }) => void;
}

const options = [
  { value: "", label: "Filter" },
  { value: "noun", label: "Noun" },
  { value: "verb", label: "Verb" },
  { value: "adjective", label: "Adjective" },
];

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filter,
  handleFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(filter || "Filter");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: { value: string; label: string }) => {
    setSelected(option.label);
    handleFilterChange({ target: { value: option.value } });
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
        className="flex h-[33px] w-[111px] cursor-pointer items-center   rounded bg-grayBg px-3 py-1 dark:bg-textBlack dark:text-textGrey"
      >
        <img src={filterIcon} alt="filter-icon" className="h-4 w-4" />

        <span className="pl-1 text-sm font-medium text-textGrey">
          {selected}
        </span>
      </div>

      {isOpen && (
        <ul
          className={`dark:text-textWhite absolute shadow-md left-0 z-10 mt-1 rounded bg-white transition-opacity duration-300 ease-out dark:bg-black dark:shadow-darkMode opacity-${isOpen ? 100 : 0}`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="cursor-pointer text-sm px-4 py-2 hover:bg-grayBg dark:hover:bg-transparent dark:hover:text-orange"
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
