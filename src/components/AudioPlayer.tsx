import React, { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface AudioPlayerProps {
  src: string;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, className = "" }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <audio ref={audioRef} src={src} onEnded={handleAudioEnd} />
      <button
        onClick={togglePlayPause}
        className={`flex h-[75px] w-[75px] items-center justify-center rounded-full text-white ${
          isPlaying ? "bg-primaryBlue" : "bg-[#7caae3a5]"
        }`}
      >
        {isPlaying ? (
          <FaPause className="h-5 w-5 justify-items-center text-white" />
        ) : (
          <FaPlay className="text-primaryBlue h-5 w-5 justify-items-center" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
