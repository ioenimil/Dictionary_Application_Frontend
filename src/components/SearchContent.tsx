import { useState } from "react";
import SearchComponent from "./searchComponent";
import WordInfo from "./WordInfo";
import ErrorPage from "./ErrorPage";
import { WordNotFoundError, WordResult } from "@/types";

const SearchContent = () => {
  const [results, setResults] = useState<WordResult[]>([]);
  const [wordNotFoundError, setWordNotFoundError] =
    useState<WordNotFoundError | null>(null);
  return (
    <div className=" w-[327px]  md:w-[689px] md:h-[819px] lg:h-[525px] lg:w-[737px] mt-5 md:mt-6">
      <SearchComponent
        setWordNotFoundError={setWordNotFoundError}
        setResults={setResults}
      />
      {wordNotFoundError ? (
        <ErrorPage wordNotFoundError={wordNotFoundError} />
      ) : (
        <WordInfo results={results} />
      )}
    </div>
  );
};
export default SearchContent;
