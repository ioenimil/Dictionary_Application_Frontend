import addIcon from "@assets/Group.svg";
import playIcon from "@assets/playIcon.svg";
import React, { ChangeEvent, useState } from "react";
import {SubmitHandler, useForm} from 'react-hook-form'
import { FaPlus } from "react-icons/fa";
import PartOfSpeechDropdown from "./PartOfSpeechDropdown";
import { GoDotFill } from "react-icons/go";
interface AddWordModalProps {
  setShowAddWord: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormInputs {
  word: string;
  scource?: string;
  pronunciation: string;
  partOfSpeech: string[];
}


const AddWordModal: React.FC<AddWordModalProps> = ({ setShowAddWord}) => {
  const [, setPartOfSpeech] = useState("");
  const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([""]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
  const handleAddPartOfSpeech = () => {
    setPartsOfSpeech([...partsOfSpeech, ""]);
  };

  const onSubmit: SubmitHandler<FormInputs> =  (data)=>{
      console.log(data)

      reset()
      setShowAddWord(false);
  }
  const [meaning, setMeaning] = useState<string>("");
  const [examples, setExamples] = useState<string[]>([""]);
  const [showAdditionalFields, setShowAdditionalFields] =
  useState<boolean>(false);
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
    <main className="fixed inset-0 ml-[54px] mt-[71px] h-[1138px] w-[1201px] bg-grayBg">
     <form onSubmit={ handleSubmit(onSubmit)} className="h-[810px] w-[1092px]">
      <nav className="mt-[54px] flex justify-end gap-2">
        <button
          onClick={() => setShowAddWord(false)}
          className="borderBtn h-[33px] w-[119px] rounded text-global_blue"
        >
          <span className="text-center text-base font-medium">Cancel</span>
        </button>
        <button
          type="submit"
          className="flex h-[33px] w-[119px] gap-1 rounded bg-global_blue px-4 py-1 text-white"
        >
          <img src={addIcon} alt="addIcon" className="mt-[6px] h-3 w-3" />
          <span className="text-center text-base font-medium">Add</span>
        </button>
      </nav>
      <span className="mb-4 text-xl font-bold">Word List / Add Word</span>
      <p className="py-4 text-textGrey">
        Fields marked with (<span className="required">*</span>) are required.
      </p>

      <div>
        <div className="flex h-[89px] w-[1092px] gap-2">
          <div className="mb-2 h-[89px] w-[540px] rounded-xl border bg-white pl-5 hover:border-global_blue">
            <label className="text-textGrey">
              Word to add<span className="required"> *</span>
            </label>
            <input
              type="text"
              {...register("word", { required: "Word is required" })}
              className="mt-3 w-full bg-transparent font-medium outline-none"
            />
            {errors.word && <p className="text-red-500">{errors.word.message}</p>}
          </div>
          <div className="mb-2 h-[89px] w-[540px] rounded-xl border bg-white pl-5 hover:border-global_blue">
            <label className="text-textGrey">Source</label>
            <input
              type="text"
              {...register("scource")}
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
            placeholder="Phonetics"
              type="text"
              {...register("pronunciation", { required: "Pronunciation is required" })}
              className="h-[42px] w-[540px] rounded-xl border border-grayBg bg-white p-2.5 text-sm text-textGrey outline-none"
            />
            <img src={playIcon} alt="soundImage" className="h-10 w-10" />
            {errors.pronunciation && <p className="text-red-500">{errors.pronunciation.message}</p>}
          </div>
        </div>
        {partsOfSpeech.map((part, index) => (
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
                    {examples.map((example, index) => { 
                      return(<>
                      <div key={index} className="ml-16 mt-2 flex items-center">
                        <GoDotFill className="mr-2 h-[10px] w-[10px] text-global_blue" />
                        <span>Example:</span>
                        <input
                          type="text"
                          value={example}
                          onChange={(e) => handleExamplesChange(index, e)}
                          className="h-[42px] w-full bg-transparent p-2.5 text-sm text-textGrey outline-none"
                        />
                      </div>
                        
                      </>)
                      
})}
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
                          <span>Example</span>
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
              placeholder="Synonym"
                type="text"
               
                onChange={(e) => setPartOfSpeech(e.target.value)}
                className="h-[60px] w-[500px] rounded-xl border border-[#979797] bg-white p-2.5 text-sm text-textGrey outline-none"
              />
              <input
               placeholder="Antonym"
                type="text"
               
                onChange={(e) => setPartOfSpeech(e.target.value)}
                className="h-[60px] w-[500px] rounded-xl border border-[#979797] bg-white p-2.5 text-sm text-textGrey outline-none"
              />
            </div>
          </div>
        </div>
        ))}

        <div className="my-3">
          <button
            type="button"
            onClick={handleAddPartOfSpeech}
            className="mb-4 h-[89px] w-[1092px] rounded-xl border-2 border-dashed border-black bg-grayBg p-2 outline-none"
          >
            + Add part of speech
          </button>
        </div>
      </div>
    </form>
    </main>
  );
};

export default AddWordModal;