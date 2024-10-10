import { WordResult } from "@/types";
import PartOfSpeech from "./PartOfSpeech";

interface Props {
  results: WordResult[];
}

const WordInfo: React.FC<Props> = ({ results }) => {
  return (
    <div className="mt-8 max-h-[87%] overflow-y-auto custom-scrollbar">
      <PartOfSpeech results={results} />
    </div>
  );
};

export default WordInfo;
