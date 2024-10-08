import PartOfSpeech from "./PartOfSpeech";
import Pronounce from "./Pronounce";
import {  WordResult } from "./SearchContent";

interface Props {
  results: WordResult[];
 
}
const WordInfo: React.FC<Props> = ({ results}) => {
  return (
    <div className=" mt-5  max-h-[87%] overflow-y-auto ">
      <Pronounce results={results} />
      <PartOfSpeech   results={results} />
    </div>
  );
};

export default WordInfo;
