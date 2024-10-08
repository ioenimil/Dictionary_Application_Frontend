import { useState } from "react";
import SearchComponent from "./searchComponent";
import WordInfo from "./WordInfo";




interface Phonetic {
  text: string;
  audio: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: { definition: string; example: string }[];
  synonyms: string[];
  sourceUrls: string[];
}

export interface WordResult {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: { name: string; url: string };
  sourceUrls: string[];
}
const SearchContent = () => {
  const [results, setResults] = useState<WordResult[]>([]);
  return (
    <div className="w-[327px] h-[86%] md:w-[689px] md:h-[819px] lg:h-[550px] lg:w-[737px] mt-5 md:mt-8">
      <SearchComponent setResults={setResults} />
      
       <WordInfo results={results}/>
    </div>
  );
};
export default SearchContent;
