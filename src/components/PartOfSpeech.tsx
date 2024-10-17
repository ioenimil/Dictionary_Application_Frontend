import React from "react";
import { PartOfSpeechType } from "types";

const PartOfSpeech: React.FC<PartOfSpeechType> = ({ results }) => {
  return (
    <>
      {results.map((result) => {
        const { meanings, sourceUrls } = result;
        return (
          <div
            className="max-h-[60vh] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-300"
            key={result.word}
          >
            {meanings.map((meaning, index) => (
              <div className="mt-3" key={index}>
                <div className="flex items-center text-lg font-bold">
                  <span>{meaning.partOfSpeech}</span>
                  <hr className="w-full ml-8" />
                </div>
                <p className="mt-3 text-[#757575] text-sm">Meaning</p>
                <ul className="list-disc dark:marker:text-global_orange marker:text-global_blue px-10 text-sm space-y-2">
                  {meaning.definitions.map((definition, i) => (
                    <li key={i}>
                      {definition.definition}
                      {definition.example && (
                        <p className="mt-3 text-gray-500">
                          "{definition.example}"
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                {meaning.synonyms.length > 0 && (
                  <div className="mt-3 flex items-center flex-wrap gap-2">
                    <p className="text-[#757575] text-sm">Synonyms:</p>
                    {meaning.synonyms.map((synonym) => (
                      <p
                        key={synonym}
                        className="text-blue-600 dark:text-global_orange"
                      >
                        {synonym}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {sourceUrls.length > 0 && (
              <div className="mt-5 flex items-center gap-5">
                <p className="text-[#757575] text-sm">Source:</p>
                {sourceUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-global_blue text-sm"
                  >
                    {url}
                  </a>
                ))}
              </div>
            )}
            </div>
        );
      })}
    </>
  );
};
export default PartOfSpeech;
