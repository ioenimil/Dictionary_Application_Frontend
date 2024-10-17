import addIcon from "@assets/Group.svg";
import playIcon from "@assets/playIcon.svg";
import React, { useState } from "react";
import AdminAddPartOfSpeechSection from "./AdminAddPartOfSpeech";

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
  const [scource, setScource] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [link, setLink] = useState("");
  const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([""]);

  const handleAddPartOfSpeech = () => {
    setPartsOfSpeech([...partsOfSpeech, ""]);
  };

  const handlePartOfSpeechChange = (index: number, value: string) => {
    const newPartsOfSpeech = [...partsOfSpeech];
    newPartsOfSpeech[index] = value;
    setPartsOfSpeech(newPartsOfSpeech);
  };

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
        <span className="mb-4 text-xl font-bold"> word List / Add Word </span>
        <br />
        <p className="py-4 text-textGrey">
          Fields marked with (<span className="required">*</span>) are required.
        </p>

        <form action="">
          <div className="flex h-[89px] w-[1092px] gap-2">
            <div className="mb-2 h-[89px] w-[540px] rounded-xl border bg-white pl-5 hover:border-global_blue">
              <label className="text-textGrey">
                Word to add<span className="required"> *</span>
              </label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="mt-3 w-full bg-transparent font-medium outline-none"
              />
            </div>
            <div className="mb-2 h-[89px] w-[540px] rounded-xl border bg-white pl-5 hover:border-global_blue">
              <label className="text-textGrey">Scource</label>
              <input
                type="text"
                value={scource}
                onChange={(e) => setScource(e.target.value)}
                className="mt-3 w-full bg-transparent font-medium outline-none"
              />
            </div>
          </div>
          <div className="my-3 h-[89px] w-[1092px] rounded-xl border bg-white pl-5 hover:border-global_blue">
            <label className="text-textGrey">
              Pronunciation<span className="required"> *</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
                className="h-[42px] w-[540px] rounded-xl border border-grayBg bg-white p-2.5 text-sm text-textGrey outline-none"
              />
              <img src={playIcon} alt="soundImage" className="h-10 w-10" />
            </div>
          </div>

          {partsOfSpeech.map((part, index) => (
            <AdminAddPartOfSpeechSection
              key={index}
              partOfSpeech={part}
              setPartOfSpeech={(value) =>
                handlePartOfSpeechChange(index, value)
              }
            />
          ))}

          <div className="my-3">
            <button
              type="button"
              onClick={handleAddPartOfSpeech}
              className="mb-4 h-[89px] w-[1092px] rounded-xl border-2 border-dashed border-black bg-grayBg p-2 outline-none placeholder:text-center placeholder:text-black"
            >
              + Add part of speech
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddWordModal;
