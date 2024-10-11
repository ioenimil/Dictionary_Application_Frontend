import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";

const WordWithAudio: React.FC = () => {
  const [word] = useState("Keyboard");
  const [phonetic] = useState("/ˈkiːbɔːd/");
  const [audioLink] = useState(
    "https://ssl.gstatic.com/dictionary/static/sounds/20200429/key--_gb_1.mp3",
  );

  return (
    <div className="flex items-center justify-between md:mt-10 md:w-[689px] lg:w-[736px]">
      <div>
        <h1 className="mb-4 text-6xl font-bold leading-[67.14px]">{word}</h1>
        <span className="h-[29] w-24 text-2xl font-normal italic leading-[20.05px] text-primaryBlue">
          {phonetic}
        </span>
      </div>

      <AudioPlayer src={audioLink} />
    </div>
  );
};

export default WordWithAudio;
