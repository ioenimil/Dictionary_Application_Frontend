import { WordResult } from "types";
import PartOfSpeech from "./PartOfSpeech";
import PronounceWord from "./PronouceWord";

interface Props {
  results: WordResult[];
}

const WordInfo: React.FC<Props> = ({ results }) => {
  return (
    <div className="mt-6 bg-red-600 ">
      <PronounceWord results={results} />
      <PartOfSpeech results={results} />
    </div>
  );
};

export default WordInfo;
