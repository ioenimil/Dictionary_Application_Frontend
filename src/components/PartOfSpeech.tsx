import React from "react";
import { WordResult } from "./SearchContent";

interface Props {
  results: WordResult[];
}
const PartOfSpeech: React.FC<Props> = ({ results }) => {
  //   const { meanings, phonetic } = results;
  console.log(results);
  return (
    <>
      {results.map((result) => {
        const { meanings} = result;
        return (
          <>
            {meanings.map((meaning) => {
              return (
                <div className=" mt-5">
                  <div className=" flex items-center text-lg font-bold">
                    <p>{meaning.partOfSpeech}</p>
                    <hr className=" w-full ml-8" />
                  </div>
                  <p className="mt-3 text-[#757575] text-xl">Meaning</p>
                  <ul className=" list-disc px-10 text-gray-800 text-sm space-y-2">
                    {meaning.definitions.map((definition) => (
                      <li>
                        {definition.definition}
                        <p>"{definition.example}"</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-10">
                    <p className="text-[#757575]">Synonyms</p>
                    {meaning.synonyms.map((synonym) => (
                      <p className=" text-blue-600">{synonym}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default PartOfSpeech;
