import React from 'react';
import searchIcon from "@assets/Vector.svg";

interface WordListSearchComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const WordListSearchComponent: React.FC<WordListSearchComponentProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <main className="ml-[348px] mt-8 flex h-[33px] pl-5 w-[550px] rounded-xl bg-grayBg">
      <img
        src={searchIcon}
        alt="searchIcon"
        className="ml-1 mt-2 h-4 w-4 items-center "
      />
      <input
        className="w-full bg-transparent outline-none custom-placeholder pl-3"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </main>
  );
};

export default WordListSearchComponent;