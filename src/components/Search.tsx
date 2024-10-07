import { ChangeEvent, useState } from "react";
import blueSearchIcon from "../assets/blueSearchIcon.svg";
const Search = () => {
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchedWord(e.target.value);
    if (error) setError("");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchedWord.trim() === "") {
      setError("Whoops, can't be empty...");
    } else {
      setError("");
      console.log(searchedWord);

      setSearchedWord("");
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
          className={`pl-5 w-full caret-[#5090DD]   dark:caret-[#FF6500] font-semibold rounded-xl h-full bg-transparent outline-none border-[1px] placeholder:dark:text-[#FFFFFF] 
            ${
              error ? "border-[#FF5252]" : "focus:border-[#5090DD] dark:focus:border-[#FF6500]"
            } focus:outline`}
          type="text"
          placeholder="Search for any word..."
        />
        <button className="absolute right-5 cursor-pointer" type="submit">
          <img src={blueSearchIcon} alt="searchIcon" />
        </button>
      </form>
      <span className="  text-[#FF5252]">{error}</span>
    </div>
  );
};
export default Search;
