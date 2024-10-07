import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";

const WordWithAudio: React.FC = () => {
  const [word] = useState("Keyboard");
  const [phonetic] = useState("/ˈkiːbɔːrd/");
  const [audioLink] = useState(
    "https://ssl.gstatic.com/dictionary/static/sounds/20200429/key--_gb_1.mp3",
  );

  return (
    <div className="flex items-center justify-between py-7">
      <div>
        <h2 className="text-3xl font-bold">{word}</h2>
        <span className="text- italic">{phonetic}</span>
      </div>

      <AudioPlayer src={audioLink} />
    </div>
  );
};

export default WordWithAudio;
