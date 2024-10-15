import addIcon from "@assets/gg_add.svg";
import sortIcon from "@assets/Vector (1).svg";
import React, { useState } from "react";

interface WordListNavBarProps {
  onSort: () => void;
  onFilter: (filter: string) => void;
}

const WordListNavBar: React.FC<WordListNavBarProps> = ({
  onSort,
  onFilter,
}) => {
  const [filter, setFilter] = useState(""); // state to manage filter value

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value); // update the filter state
    onFilter(e.target.value); // apply the filter
  };

  return (
    <nav className="ml-[804px] mt-8 flex h-[34px] w-[380px] gap-2">
      <button
        className="flex h-[33px] w-[111px] rounded bg-grayBg px-3 py-1"
        onClick={onSort}
      >
        <img src={sortIcon} alt="Sort" />
        <span className="pl-1">Sort</span>
      </button>

      {/* Dropdown for part of speech filter */}
      <select
        className="flex h-[33px] w-[150px] rounded bg-grayBg px-3 py-1"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="">All</option>
        <option value="noun">Noun</option>
        <option value="verb">Verb</option>
        <option value="adjective">Adjective</option>
        <option value="adverb">Adverb</option>
      </select>

      <button className="flex h-[33px] w-[130px] rounded bg-blueBg px-3 py-1">
        <img src={addIcon} alt="Add" />
        <span className="pl-1 text-white">Add Word</span>
      </button>
    </nav>
  );
};

export default WordListNavBar;
