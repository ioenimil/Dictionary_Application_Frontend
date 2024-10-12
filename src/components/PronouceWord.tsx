import React, { useRef } from "react";
import playIcon from "../assets/playIcon.svg";
import { WordResult } from "types";

interface Props {
  results: WordResult[];
}
const PronounceWord: React.FC<Props> = ({ results }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const firstResult = results[0];
  if (!firstResult) {
    return null;
  }
  const phoneticWithAudio = firstResult.phonetics.find(
    (phonetic) => phonetic.audio
  );
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-bold text-3xl capitalize text-[#2D2D2D]">
          {firstResult.word}
        </h2>
        <p className="text-global_blue font-semibold">{firstResult.phonetic}</p>
      </div>
      <div>
        {phoneticWithAudio && (
          <>
            <img
              onClick={playAudio}
              className="h-[60px] w-[60px] cursor-pointer"
              src={playIcon}
              alt="play icon"
            />
            <audio
              ref={audioRef}
              className="hidden"
              src={phoneticWithAudio.audio}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default PronounceWord;