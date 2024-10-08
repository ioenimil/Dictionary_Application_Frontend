import React from "react";
import { WordResult } from "./SearchContent";

// Component to display parts of speech, meanings, synonyms, and source URLs
interface Props {
  results: WordResult[];
  
}

const PartOfSpeech: React.FC<Props> = ({ results}) => {
  return (
    <>
      {results.map((result) => {
        const { meanings, sourceUrls } = result;

        return (
          <div className=" " key={result.word}>
            {meanings.map((meaning, index) => (
              <div className="mt-3" key={index}>
                <div className="flex items-center text-lg font-bold">
                  <p>{meaning.partOfSpeech}</p>
                  <hr className="w-full ml-8" />
                </div>

                <p className="mt-1 text-[#757575] text-base">Meaning</p>
                <ul className="list-disc marker:text-global_blue px-10 text-sm space-y-2">
                  {meaning.definitions.map((definition, i) => (
                    <li key={i}>
                      {definition.definition}

                      {definition.example && (
                        <p className="mt-1 text-gray-500">
                          "{definition.example}"
                        </p>
                      )}
                    </li>
                  ))}
                </ul>

                {meaning.synonyms.length > 0 && (
                  <div className="mt-1 flex items-center flex-wrap gap-2">
                    <p className="text-[#757575] text-base">Synonyms:</p>
                    {meaning.synonyms.map((synonym) => (
                      <p key={synonym} className="text-blue-600">
                        {synonym}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {sourceUrls.length > 0 && (
              <div className="mt-5  flex items-center gap-5">
                <p className="text-[#757575] text-base">Source:</p>
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
