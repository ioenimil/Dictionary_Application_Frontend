import PartOfSpeech from "./PartOfSpeech";
import Pronounce from "./Pronounce";
import { WordResult } from "./SearchContent";

interface Props {
    results: WordResult[];
  }
const WordInfo:React.FC<Props> = ({ results }) => {
  
  return (
    <div className=" mt-8">
      <Pronounce results = {results} />
      <PartOfSpeech results = {results} />
    </div>
  );
};

export default WordInfo;
