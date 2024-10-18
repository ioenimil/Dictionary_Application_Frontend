import darkPlayIcon from "@assets/Frame 427318345.svg";
import playIcon from "@assets/playIcon.svg";
import React, { useEffect, useRef, useState } from "react";
import { WordResult } from "types";

interface Props {
  results: WordResult[];
}

const PronounceWord: React.FC<Props> = ({ results }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const detectDarkMode = () => {
    const htmlElement = document.documentElement;
    const darkModeEnabled = htmlElement.classList.contains("dark");
    setIsDarkMode(darkModeEnabled);
  };

  useEffect(() => {
    detectDarkMode();

    const observer = new MutationObserver(() => {
      detectDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
    (phonetic) => phonetic.audio,
  );

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold capitalize text-[#2D2D2D] dark:text-white">
          {firstResult.word}
        </h2>
        <p className="font-semibold text-global_blue dark:text-global_orange">
          {firstResult.phonetic}
        </p>
      </div>
      <div>
        {phoneticWithAudio && (
          <>
            <img
              onClick={playAudio}
              className="h-[60px] w-[60px] cursor-pointer"
              src={isDarkMode ? darkPlayIcon : playIcon}
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
