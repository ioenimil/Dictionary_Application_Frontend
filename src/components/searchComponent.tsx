import { ChangeEvent, useState } from "react";
import { WordResult } from "./SearchContent";
import { IoSearchOutline } from "react-icons/io5";
import { WordNotFoundError } from "@/types";

interface Props {
  setResults: React.Dispatch<React.SetStateAction<WordResult[]>>;
  setWordNotFoundError: React.Dispatch<React.SetStateAction<WordNotFoundError | null>>;
  
}
const SearchComponent: React.FC<Props> = ({
  setResults,
  setWordNotFoundError,
}) => {
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  // const [wordNotFoundError, setWordNotFoundError] = useState<object>({});
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
      const word = searchedWord.toLowerCase();
      setSearchedWord("");
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `${errorData.title}: ${errorData.message} ${errorData.resolution}`
          );
        }
        const data = await response.json();
        setResults(data);
      } catch (error:any) {
        setWordNotFoundError(
          error.message || "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" relative mb-1  w-[327px] h-[48px] lg:w-[736px] md:w-[689px] md:h-16 rounded-lg dark:bg-[#1F1F1F] bg-grayBg flex items-center "
      >
        <input
          value={searchedWord}
          onChange={handleSearchChange}
          className={`pl-5 w-full caret-global_blue   dark:caret-global_orange font-semibold rounded-lg h-full bg-transparent outline-none  placeholder:dark:text-[#FFFFFF]
            ${
              error
                ? "border-global_orange  border-[1px]"
                : " focus:border-global_blue focus:border-[1px]  dark:focus:border-global_orange"
            } focus:outline`}
          type="text"
          placeholder="Search for any word..."
        />
        <button className="absolute right-5 cursor-pointer" type="submit">
          <IoSearchOutline className=" font-semibold" />
        </button>
      </form>
      <span className=" text-global_red">{error}</span>
    </div>
  );
};
export default SearchComponent;
