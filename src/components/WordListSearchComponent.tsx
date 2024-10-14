import searchIcon from "@assets/Vector.svg";
import React from "react";

interface WordListSearchComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const WordListSearchComponent: React.FC<WordListSearchComponentProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <main className="ml-[348px] mt-8 flex h-[33px] w-[550px] rounded-xl bg-grayBg pl-5">
      <img
        src={searchIcon}
        alt="searchIcon"
        className="ml-1 mt-2 h-4 w-4 items-center"
      />
      <input
        className="custom-placeholder w-full bg-transparent pl-3 outline-none"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </main>
  );
};

export default WordListSearchComponent;
