import React, { useState } from 'react';
import filterIcon from '@assets/ic_baseline-filter-list.svg';
import sortIcon from '@assets/Vector (1).svg';
import addIcon from '@assets/gg_add.svg';

interface WordListNavBarProps {
  onSort: () => void;
  onFilter: (filter: string) => void;
}

const WordListNavBar: React.FC<WordListNavBarProps> = ({ onSort, onFilter }) => {
  const [filter, setFilter] = useState(''); // state to manage filter value

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value); // update the filter state
    onFilter(e.target.value);  // apply the filter
  };

  return (
    <nav className="w-[380px] h-[34px] flex gap-2 ml-[804px] mt-8">
      <button className="flex bg-grayBg w-[111px] h-[33px] rounded px-3 py-1" onClick={onSort}>
        <img src={sortIcon} alt="Sort" />
        <span className="pl-1">Sort</span>
      </button>

      {/* Dropdown for part of speech filter */}
      <select
        className="flex bg-grayBg w-[150px] h-[33px] rounded px-3 py-1"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="">All</option>
        <option value="noun">Noun</option>
        <option value="verb">Verb</option>
        <option value="adjective">Adjective</option>
        <option value="adverb">Adverb</option>
      </select>

      <button className="flex bg-blueBg w-[130px] h-[33px] rounded px-3 py-1">
        <img src={addIcon} alt="Add" />
        <span className="pl-1 text-white">Add Word</span>
      </button>
    </nav>
  );
};

export default WordListNavBar;
