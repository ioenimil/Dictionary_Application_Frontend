import addIcon from "@assets/gg_add.svg";
import sortIcon from "@assets/Vector (1).svg";
import React, { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import AddWord from "./AddWord";
interface WordListNavBarProps {
  onSort: () => void;
  onFilter: (filter: string) => void;
  setShowAddWord: React.Dispatch<React.SetStateAction<boolean>>;
}
const WordListNavBar: React.FC<WordListNavBarProps> = ({
  onSort,
  onFilter,
  setShowAddWord
}) => {
  const [filter, setFilter] = useState<string>("");
  const handleFilterChange = (event: { target: { value: string } }) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilter(selectedFilter);
  };
  

  const handleAddWordClick = () => {
    setShowAddWord(true); // Show AddWord page
  };
  return (
    <div className="flex items-center justify-end px-3">
     
        <nav className=" mt-3  flex h-[34px] w-[380px] gap-2">
          <FilterDropdown
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
          <button 
            className="flex h-[33px] items-center w-[111px] rounded bg-grayBg px-3 py-1 dark:bg-textBlack dark:text-textGrey"
            onClick={onSort}
          >
            <img src={sortIcon} alt="Sort" className="h- mt-1 h-4 w-[14px]" />
            <span className="pl-1 text-sm">Sort</span>
          </button>
          <button
            className="flex h-[33px] items-center w-[130px] rounded bg-blueBg px-1 py-1 dark:bg-global_orange"
            onClick={handleAddWordClick} // Trigger page switch on click
          >
            <img src={addIcon} alt="Add"  />
            <span className="pl-1 text-sm text-white">Add Word</span>
          </button>
        </nav>
    </div>
  );
};
export default WordListNavBar;
