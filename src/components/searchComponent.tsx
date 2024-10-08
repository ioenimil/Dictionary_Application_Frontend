import { ChangeEvent, useState } from "react";
import blueSearchIcon from "../assets/blueSearchIcon.svg";
import { WordResult } from "./SearchContent";

interface Props {
  setResults: React.Dispatch<React.SetStateAction<WordResult[]>>;
}
const SearchComponent:React.FC<Props> = ({ setResults }) => {
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchedWord(e.target.value);
    if (error) setError("");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchedWord.trim() === "") {
      setError("Whoops, can't be empty...");
    } else {
      setError("");
      setSearchedWord("");
      const word = searchedWord.toLowerCase();
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      setResults(data);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" relative mb-1  w-[327px] h-[48px] lg:w-[736px] md:w-[689px] md:h-16 rounded-xl dark:bg-[#1F1F1F] bg-grayBg flex items-center "
      >
        <input
          value={searchedWord}
          onChange={handleSearchChange}
          className={`pl-5 w-full caret-global_blue   dark:caret-global_orange font-semibold rounded-xl h-full bg-transparent outline-none  placeholder:dark:text-[#FFFFFF]
            ${
              error
                ? "border-global_orange  border-[1px]"
                : " focus:border-global_blue focus:border-[1px]  dark:focus:border-global_orange"
            } focus:outline`}
          type="text"
          placeholder="Search for any word..."
        />
        <button className="absolute right-5 cursor-pointer" type="submit">
          <img src={blueSearchIcon} alt="searchIcon" />
        </button>
      </form>
      <span className=" text-global_red">{error}</span>
    </div>
  );
};
export default SearchComponent;
