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
        <h1 className="mb-4 text-[64px] font-bold leading-[67.14px]">{word}</h1>
        <span className="text-primaryBlue h-[29] w-[96px] text-[24px] font-normal italic leading-[20.05px]">
          {phonetic}
        </span>
      </div>

      <AudioPlayer src={audioLink} />
    </div>
  );
};

export default WordWithAudio;
