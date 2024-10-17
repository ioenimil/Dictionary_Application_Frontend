import { useState } from "react";
import WordInfo from "./WordInfo";
import ErrorPage from "./ErrorPage";
import { WordNotFoundError, WordResult } from "types";
import SearchComponent from "./SearchComponent";
import Spinner from "./Spinner";

const SearchContent = () => {
  const [results, setResults] = useState<WordResult[]>([]);
  const [wordNotFoundError, setWordNotFoundError] =
    useState<WordNotFoundError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="w-[327px] md:w-[689px] md:h-[819px] h-full lg:h-[600px] lg:w-[737px] mt-5 md:mt-6">
    <SearchComponent
      setWordNotFoundError={setWordNotFoundError}
      setResults={setResults}
      setIsLoading={setIsLoading} // Pass the loading state setter
    />
    
    {/* Conditionally render components based on loading state, error, and results */}
    {isLoading ? (
      <Spinner />  
    ) : wordNotFoundError ? (
      <ErrorPage wordNotFoundError={wordNotFoundError} />  
    ) : (
      <WordInfo results={results} />  
    )}
  </div>
  );
};
export default SearchContent;