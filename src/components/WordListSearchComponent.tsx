import React from "react";
import { IoSearch } from "react-icons/io5";

interface WordListSearchComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const WordListSearchComponent: React.FC<WordListSearchComponentProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <main className="ml-[348px] flex h-[33px] w-[550px] rounded-xl bg-grayBg pl-5 dark:bg-textBlack dark:text-textGrey">
      <IoSearch className="ml-1 mt-2 h-4 w-4 items-center dark:text-orange" />
      <input
        className="dark:placeholder:text-textWhite w-full bg-transparent pl-3 outline-none placeholder:text-textBlack"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </main>
  );
};

export default WordListSearchComponent;
