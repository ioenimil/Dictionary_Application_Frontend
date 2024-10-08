import React from "react";
import playIcon from "../assets/play.svg";
import { WordResult } from "./SearchContent";
interface Props {
  results: WordResult[];
}
const Pronounce: React.FC<Props> = ({ results }) => {
  return (
    <>
      {results.map((meaning) => {
        return (
          <div className=" flex items-center justify-between">
            <div>
              <h2 className=" font-bold text-2xl text-[#2D2D2D]">
                {meaning.word}
              </h2>
              <p className=" text-blue-600">{meaning.phonetic}</p>
            </div>
            <div className="">
              <img
                className=" h-[60px] w-[60px]"
                src={playIcon}
                alt="play icon"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Pronounce;
