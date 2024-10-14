import addIcon from "@assets/gg_add.svg";
import sortIcon from "@assets/Vector (1).svg";
import React, { useState } from "react";
import FilterDropdown from "./FilterDropdown";

interface WordListNavBarProps {
  onSort: () => void;
  onFilter: (filter: string) => void;
}

const WordListNavBar: React.FC<WordListNavBarProps> = ({
  onSort,
  onFilter,
}) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (filterValue: { target: { value: string } }) => {
    setFilter(filterValue.target.value);
    onFilter(filterValue.target.value);
  };

  return (
    <nav className="ml-[804px] mt-8 flex h-[34px] w-[380px] gap-2">
      <FilterDropdown filter={filter} handleFilterChange={handleFilterChange} />

      <button
        className="flex h-[33px] w-[111px] rounded bg-grayBg px-3 py-1"
        onClick={onSort}
      >
        <img src={sortIcon} alt="Sort" className="mt-1 h-[16px] w-[14px]" />
        <span className="pl-1 text-base font-medium text-textGrey">Sort</span>
      </button>

      <button className="flex h-[33px] w-[130px] rounded bg-blueBg px-3 py-1">
        <img src={addIcon} alt="Add" className="mt-[2px] h-5 w-5" />
        <span className="pl-1 text-base font-medium text-white">Add Word</span>
      </button>
    </nav>
  );
};

export default WordListNavBar;
