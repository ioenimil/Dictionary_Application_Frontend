import React, { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import PartOfSpeechDropdown from "./PartOfSpeechDropdown";

interface AdminAddPartOfSpeechSectionProps {
  partOfSpeech: string;
  setPartOfSpeech: (value: string) => void;
}

const AdminAddPartOfSpeechSection: React.FC<
  AdminAddPartOfSpeechSectionProps
> = ({ partOfSpeech, setPartOfSpeech }) => {
  const [showAdditionalFields, setShowAdditionalFields] =
    useState<boolean>(false);
  const [meaning, setMeaning] = useState<string>("");
  const [examples, setExamples] = useState<string[]>([""]);

  const handleAddFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };

  const handleMeaningChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMeaning(e.target.value);
  };

  const handleExamplesChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newExamples = [...examples];
    newExamples[index] = e.target.value;
    setExamples(newExamples);
  };

  const handleAddExample = () => {
    setExamples([...examples, ""]);
  };

  const handlePartOfSpeechSelect = (value: string) => {
    setPartOfSpeech(value);
  };

  return (
    <div
      className="border-lightGrey mb-2 h-auto w-[1092px] rounded-xl border bg-white pl-5 hover:border-global_blue"
    >
      <div className="mb-5">
        <PartOfSpeechDropdown onSelect={handlePartOfSpeechSelect} />
        <div className="mx-4 rounded-xl border border-textGrey p-2">
          <div
            className="mt-3 flex cursor-pointer items-center justify-between"
            onClick={handleAddFields}
          >
            <span className="text-textGrey">Add Meaning</span>
            <FaPlus className="h-4 w-4 text-textGrey" />
          </div>

          <div className="bg-lightGrey mt-6 rounded p-3">
            <div className="mb-3">
              <label className="text-textGrey">Meaning : </label>
              <div className="ml-16 flex items-center">
                <GoDotFill className="h-[10px] w-[10px] text-global_blue" />
                <input
                  type="text"
                  value={meaning}
                  onChange={handleMeaningChange}
                  className="h-[42px] w-full bg-transparent p-2.5 text-sm text-textGrey outline-none"
                />
              </div>
              <hr className="bg-textGrey" />
            </div>
            <div className="mb-3 flex justify-between">
              <div>
                <label className="text-textGrey">Examples :</label>
                {examples.map((example, index) => (
                  <div key={index} className="ml-16 mt-2 flex items-center">
                    <GoDotFill className="mr-2 h-[10px] w-[10px] text-global_blue" />
                    <input
                      type="text"
                      value={example}
                      onChange={(e) => handleExamplesChange(index, e)}
                      className="h-[42px] w-full bg-transparent p-2.5 text-sm text-textGrey outline-none"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div
                  className="mt-3 flex cursor-pointer items-center justify-between"
                  onClick={handleAddExample}
                >
                  <FaPlus className="h-4 w-4 text-textGrey" />
                </div>
              </div>
            </div>
          </div>
          {showAdditionalFields && (
            <div className="bg-lightGrey mt-5 p-2">
              <div className="mb-3">
                <label className="text-textGrey">Meaning : </label>
                <div className="ml-16 flex items-center">
                  <GoDotFill className="text-global_blue" />
                  <input
                    type="text"
                    value={meaning}
                    onChange={handleMeaningChange}
                    className="h-[42px] w-full bg-transparent p-2.5 text-sm text-textGrey outline-none"
                  />
                </div>
              </div>
              <hr className="bg-textGrey" />
              <div className="mb-3 flex justify-between">
                <div>
                  <label className="text-textGrey">Examples :</label>
                  {examples.map((example, index) => (
                    <div key={index} className="ml-16 mt-2 flex items-center">
                      <GoDotFill className="mr-2 text-global_blue" />
                      <input
                        type="text"
                        value={example}
                        onChange={(e) => handleExamplesChange(index, e)}
                        className="h-[42px] w-full bg-transparent p-2.5 text-sm text-textGrey outline-none"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div
                    className="mt-3 flex cursor-pointer items-center justify-between"
                    onClick={handleAddExample}
                  >
                    <FaPlus className="h-4 w-4 text-textGrey" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[1035px]h-[80px] ml-3 mt-3 flex items-center gap-10">
          <input
            type="text"
            value={partOfSpeech}
            onChange={(e) => setPartOfSpeech(e.target.value)}
            className="h-[60px] w-[500px] rounded-xl border border-[#979797] bg-white p-2.5 text-sm text-textGrey outline-none"
          />
          <input
            type="text"
            value={partOfSpeech}
            onChange={(e) => setPartOfSpeech(e.target.value)}
            className="h-[60px] w-[500px] rounded-xl border border-[#979797] bg-white p-2.5 text-sm text-textGrey outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAddPartOfSpeechSection;
