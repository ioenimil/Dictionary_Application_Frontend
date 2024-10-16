import addIcon from "@assets/Group.svg";
import React, { useState } from "react";

interface AddWordModalProps {
  onClose: () => void;
  onAddWord: (newWord: {
    word: string;
    partOfSpeech: string;
    synonyms: string[];
    link: string;
  }) => void;
}

const AddWordModal: React.FC<AddWordModalProps> = ({ onClose, onAddWord }) => {
  const [word, setWord] = useState("");
  const [scource,setScource] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [link, setLink] = useState("");

  const handleAdd = () => {
    if (word && partOfSpeech) {
      const newWord = {
        word,
        partOfSpeech,
        synonyms: synonyms.split(",").map((s) => s.trim()),
        link: link || "#",
      };
      onAddWord(newWord);
      onClose();
    }
  };

  return (
    <main className="fixed inset-0 ml-[54px] mt-[71px] h-[1138px] w-[1201px] bg-grayBg">
      <div className="h-[810px] w-[1092px]">
        <nav className="mt-[54px] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="borderBtn h-[33px] w-[119px] rounded text-global_blue"
          >
            <span className="text-center text-base font-medium">Cancel</span>
          </button>
          <button
            onClick={handleAdd}
            className="flex h-[33px] w-[119px] gap-1 rounded bg-global_blue px-4 py-1 text-white"
          >
            <img src={addIcon} alt="addIcon" className="mt-[6px] h-3 w-3" /> 

            <span className="text-center text-base font-medium">Add</span>
          </button>
        </nav>
        <span className="mb-4 text-xl font-bold"> word List / Add Word </span><br />
        <span>Fields marked with (*) are required.</span>

        <form action="">
            <div className="flex h-[89px] w-[1092px] gap-2">
              <div className=" mb-2 h-[89px] w-[540px] bg-white rounded-xl pl-5 border hover:border-global_blue  ">
                <label
                  className= "  "
                >
                  Word to add
                </label>
                <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  
                  className="bg-transparent w-full  outline-none font-medium  mt-3"
                />
                
              </div>
              <div className="mb-2 h-[89px] w-[540px] bg-white rounded-xl pl-5 border hover:border-global_blue">
                 <label
                  className= "  "
                >
                  Scource
                </label>
                <input
                type="text"
                value={scource}
                onChange={(e) => setScource(e.target.value)}
                 
                className="bg-transparent w-full  outline-none font-medium  mt-3 "
                />
              </div>
           
            </div>
          <div className="h-[89px] w-[1092px] bg-white rounded-xl pl-5 border hover:border-global_blue">
              <input
              type="text"
              value={partOfSpeech}
              onChange={(e) => setPartOfSpeech(e.target.value)}
              placeholder="Pronunciation"
              className=" bg-transparent w-full  outline-none font-medium  mt-3"
              />
          </div>

          <input
            type="text"
            value={synonyms}
            onChange={(e) => setSynonyms(e.target.value)}
            placeholder="noun"
            className="mb-5 h-[358px] w-[1092px] rounded-xl border focus:border-global_blue focus:outline-none"
          />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="+ Add part of speech"
            className="mb-4 h-[89px] w-[1092px] rounded-xl border-2 border-dashed border-black bg-grayBg p-2 outline-none placeholder:text-center placeholder:text-black"
          />
        </form>
      </div>
    </main>
  );
};

export default AddWordModal;
