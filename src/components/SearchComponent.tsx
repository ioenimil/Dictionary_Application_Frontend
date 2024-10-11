import { ChangeEvent, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { WordNotFoundError, WordResult } from "types";

interface Props {
  setResults: React.Dispatch<React.SetStateAction<WordResult[]>>;
  setWordNotFoundError: React.Dispatch<
    React.SetStateAction<WordNotFoundError | null>
  >;
}
const SearchComponent: React.FC<Props> = ({
  setResults,
  setWordNotFoundError,
}) => {
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchedWord(e.target.value);
    if (error) setError("");
    setWordNotFoundError(null);
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (searchedWord.trim() === "") {
      setError("Whoops, can't be empty...");
      return;
    } else {
      setError("");
      const word = searchedWord.toLowerCase();
      setSearchedWord("");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_DICTIONARY_API}/${word}`

        );
        if (!response.ok) {
          const errorData: WordNotFoundError = await response.json();
          setWordNotFoundError({
            title: errorData.title || "No Definitions Found",
            message: errorData.message || "Sorry, no definitions found.",
            resolution:
              errorData.resolution || "Try again later or check the web.",
          });
          return;
        }
        const data: WordResult[] = await response.json();
        setResults(data);
      } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Something went wrong. Please try again.";
        setWordNotFoundError({
          title: "Error",
          message: errorMessage,
          resolution: "",
        });
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" relative mb-1  w-[327px] h-[48px] lg:w-[736px] md:w-[689px] md:h-16 rounded-lg dark:bg-searchBgDarkMode bg-grayBg flex items-center "
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
          <IoSearchOutline className=" font-semibold dark:text-global_orange" />
        </button>
      </form>
      <span className=" text-global_red">{error}</span>
    </div>
  );
};
export default SearchComponent;