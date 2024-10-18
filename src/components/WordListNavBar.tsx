import addIcon from "@assets/gg_add.svg";
import sortIcon from "@assets/Vector (1).svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import FilterDropdown from "./FilterDropdown";

interface WordListNavBarProps {
  onSort: () => void;
  onFilter: (filter: string) => void;
}

const WordListNavBar: React.FC<WordListNavBarProps> = ({
  onSort,
  onFilter,
}) => {
  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleFilterChange = (event: { target: { value: string } }) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilter(selectedFilter);
  };

  const handleAddWordClick = () => {
    navigate("/addword"); // Navigate to AddWordModal page when clicked
  };

  return (
    <nav className="ml-[804px] mt-8 flex h-[34px] w-[380px] gap-2">
      <FilterDropdown filter={filter} handleFilterChange={handleFilterChange} />
      <button
        className="flex h-[33px] w-[111px] rounded bg-grayBg px-3 py-1 dark:bg-textBlack dark:text-textGrey"
        onClick={onSort}
      >
        <img src={sortIcon} alt="Sort" className="mt-1 h-4 w-[14px]" />
        <span className="pl-1">Sort</span>
      </button>
      <button
        className="flex h-[33px] w-[130px] rounded bg-blueBg px-3 py-1 dark:bg-global_orange"
        onClick={handleAddWordClick} // Navigate to AddWordModal on click
      >
        <img src={addIcon} alt="Add" />
        <span className="pl-1 text-white">Add Word</span>
      </button>
    </nav>
  );
};

export default WordListNavBar;
