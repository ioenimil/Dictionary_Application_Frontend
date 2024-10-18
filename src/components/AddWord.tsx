<<<<<<< HEAD
import addIcon from "@assets/Group.svg";
import playIcon from "@assets/playIcon.svg";
import React, { ChangeEvent, useState } from "react";
import {SubmitHandler, useForm} from 'react-hook-form'
import { FaPlus } from "react-icons/fa";
import PartOfSpeechDropdown from "./PartOfSpeechDropdown";
import { GoDotFill } from "react-icons/go";
=======
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import playIcon from '../assets/playIcon.svg';
// Interfaces for the word data structure
interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

interface WordData {
  word: string;
  phonetics: string[];
  meanings: Meaning[];
  sourceUrls: string[];
}
>>>>>>> f9b4a76 (refactor)
interface AddWordModalProps {
  setShowAddWord: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddWordModal = ({setShowAddWord}:AddWordModalProps) => {
  const [wordData, setWordData] = useState<WordData>({
    word: '',
    phonetics: [],
    meanings: [
      {
        partOfSpeech: 'noun',
        definitions: [
          { definition: '', synonyms: [], antonyms: [], example: [''] } // Default one definition with one example
        ],
        synonyms: [],
        antonyms: []
      }
    ],
    sourceUrls: []
  });

<<<<<<< HEAD
const AddWordModal: React.FC<AddWordModalProps> = ({ setShowAddWord}) => {
  const [, setPartOfSpeech] = useState("");
  const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([""]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
=======
  // Handle change for Word input
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordData({ ...wordData, word: e.target.value });
  };

  // Add new part of speech
>>>>>>> f9b4a76 (refactor)
  const handleAddPartOfSpeech = () => {
    const newPartOfSpeech: Meaning = {
      partOfSpeech: 'noun',
      definitions: [{ definition: '', synonyms: [], antonyms: [], example: [''] }],
      synonyms: [],
      antonyms: []
    };
    setWordData({ ...wordData, meanings: [...wordData.meanings, newPartOfSpeech] });
  };

<<<<<<< HEAD
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
=======
  // Remove part of speech
  const handleRemovePartOfSpeech = (index: number) => {
    if (wordData.meanings.length > 1) {
      const updatedMeanings = wordData.meanings.filter((_, i) => i !== index);
      setWordData({ ...wordData, meanings: updatedMeanings });
    }
  };

  // Update part of speech
  const handlePartOfSpeechChange = (index: number, value: string) => {
    const updatedMeanings = [...wordData.meanings];
    updatedMeanings[index].partOfSpeech = value;
    setWordData({ ...wordData, meanings: updatedMeanings });
>>>>>>> f9b4a76 (refactor)
  };

  // Add new meaning within a part of speech
  const handleAddMeaning = (meaningIndex: number) => {
    const updatedMeanings = [...wordData.meanings];
    const newDefinition: Definition = { definition: '', synonyms: [], antonyms: [], example: [''] };
    updatedMeanings[meaningIndex].definitions.push(newDefinition);
    setWordData({ ...wordData, meanings: updatedMeanings });
  };

  // Remove meaning
  const handleRemoveMeaning = (meaningIndex: number, defIndex: number) => {
    if (wordData.meanings[meaningIndex].definitions.length > 1) {
      const updatedMeanings = [...wordData.meanings];
      updatedMeanings[meaningIndex].definitions = updatedMeanings[meaningIndex].definitions.filter(
        (_, i) => i !== defIndex
      );
      setWordData({ ...wordData, meanings: updatedMeanings });
    }
  };

  // Update definition
  const handleDefinitionChange = (meaningIndex: number, defIndex: number, value: string) => {
    const updatedMeanings = [...wordData.meanings];
    updatedMeanings[meaningIndex].definitions[defIndex].definition = value;
    setWordData({ ...wordData, meanings: updatedMeanings });
  };

  // Add example to a meaning
  const handleAddExample = (meaningIndex: number, defIndex: number) => {
    const updatedMeanings = [...wordData.meanings];
    updatedMeanings[meaningIndex].definitions[defIndex].example.push('');
    setWordData({ ...wordData, meanings: updatedMeanings });
  };

  // Remove example
  const handleRemoveExample = (meaningIndex: number, defIndex: number, exIndex: number) => {
    if (wordData.meanings[meaningIndex].definitions[defIndex].example.length > 1) {
      const updatedMeanings = [...wordData.meanings];
      updatedMeanings[meaningIndex].definitions[defIndex].example = updatedMeanings[meaningIndex].definitions[defIndex].example.filter(
        (_, i) => i !== exIndex
      );
      setWordData({ ...wordData, meanings: updatedMeanings });
    }
  };

  // Update example
  const handleExampleChange = (meaningIndex: number, defIndex: number, exIndex: number, value: string) => {
    const updatedMeanings = [...wordData.meanings];
    updatedMeanings[meaningIndex].definitions[defIndex].example[exIndex] = value;
    setWordData({ ...wordData, meanings: updatedMeanings });
  };

  // Update synonyms or antonyms
  const handleSynonymChange = (meaningIndex: number, value: string) => {
    const updatedMeanings = [...wordData.meanings];
    updatedMeanings[meaningIndex].synonyms = value.split(',').map(s => s.trim());
    setWordData({ ...wordData, meanings: updatedMeanings });
  };

  const handleAntonymChange = (meaningIndex: number, value: string) => {
    const updatedMeanings = [...wordData.meanings];
    updatedMeanings[meaningIndex].antonyms = value.split(',').map(s => s.trim());
    setWordData({ ...wordData, meanings: updatedMeanings });
  };

  // Handle form submit (log payload to console)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      word: wordData.word,
      phonetics: wordData.phonetics,
      meanings: wordData.meanings.map(meaning => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map(def => ({
          definition: def.definition,
          synonyms: def.synonyms,
          antonyms: def.antonyms,
          example: def.example
        })),
        synonyms: meaning.synonyms,
        antonyms: meaning.antonyms
      })),
      sourceUrls: wordData.sourceUrls
    };
   
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_DICTIONARY_API}api/v1/add_word/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
      toast.success('Word created successfully!', { position: 'top-right', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    } catch (error) {
      
    }
   
  };

  return (
    <main className="fixed inset-0 ml-[54px] mt-[71px] h-[1138px] w-[1201px] bg-grayBg">
     
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className='  flex items-center justify-between'>
        <h3 className="text-xl font-semibold ">Word list  <span className=' font-semibold text-sm'> Add Word</span></h3>
        <div className="mt-6 flex justify-end space-x-4">
          <button
          onClick={()=>setShowAddWord(false)}
            type="button"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500"
          >
            Add
          </button>
        </div>
        </div>
        <p className="py-4 text-textGrey">
        Fields marked with (<span className="required">*</span>) are required.
      </p>        <div className="flex space-x-4">
          <div className="mb-2 h-[89px] w-[540px] rounded-xl border bg-white pl-5 hover:border-global_blue">
          <label className="text-textGrey">
              Word to add<span className="required"> *</span>
            </label>            <input
              type="text"
              className="mt-3 w-full bg-transparent font-medium outline-none"              value={wordData.word}
              onChange={handleWordChange}
              required
            />
          </div>
          <div className="mb-2 h-[89px] w-[540px] rounded-xl border bg-white pl-5 hover:border-global_blue">
          <label className="text-textGrey">Source</label>
            <input
              type="text"
              className="mt-3 w-full bg-transparent font-medium outline-none"
              
            />
          </div>
        </div>

        <div className="my-3 h-[89px] w-[1092px] rounded-xl border bg-white pl-5 hover:border-global_blue">
        <label className="text-textGrey">
            Pronunciation<span className="required"> *</span>
          </label>
          <div className="flex items-center gap-3">
<<<<<<< HEAD
            <input
            placeholder="Phonetics"
              type="text"
              {...register("pronunciation", { required: "Pronunciation is required" })}
              className="h-[42px] w-[540px] rounded-xl border border-grayBg bg-white p-2.5 text-sm text-textGrey outline-none"
            />
            <img src={playIcon} alt="soundImage" className="h-10 w-10" />
            {errors.pronunciation && <p className="text-red-500">{errors.pronunciation.message}</p>}
=======
          <input
           placeholder="Phonetics"
            type="text"
            
            className="h-[42px] w-[540px] rounded-xl border border-grayBg bg-white p-2.5 text-sm text-textGrey outline-none"            
          />
           <img src={playIcon} alt="soundImage" className="h-10 w-10" />
>>>>>>> f9b4a76 (refactor)
          </div>
         
        </div>
<<<<<<< HEAD
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
=======

        <div  className="border-lightGrey mb-2 h-auto w-[1092px] rounded-xl border bg-white pl-5 hover:border-global_blue">
         
          {wordData.meanings.map((meaning, meaningIndex) => (
            <div key={meaningIndex} className="mt-4 border p-4 rounded-md bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="w-30">
                  <select
                    value={meaning.partOfSpeech}
                    onChange={(e) => handlePartOfSpeechChange(meaningIndex, e.target.value)}
                    className=" text-sm block outline-none w-full  "
                    required
                  >
                    <option value="">Select...</option>
                    <option value="noun">Noun </option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                  </select>
                </div>
                {wordData.meanings.length > 1 && (
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => handleRemovePartOfSpeech(meaningIndex)}
                  >
                    Remove
                  </button>
                )}
>>>>>>> f9b4a76 (refactor)
              </div>

              {meaning.definitions.map((definition, defIndex) => (
                <div key={defIndex}  className="mx-4 rounded-xl border border-textGrey p-2">
                  <span className="text-textGrey text-sm">Add Meaning</span>
                  <div  className="bg-lightGrey mt-6 rounded p-3">
                  <label className="text-textGrey">Meaning : </label>
                  <textarea
                    value={definition.definition}
                    onChange={(e) => handleDefinitionChange(meaningIndex, defIndex, e.target.value)}
                    className="h-[42px] ml-20 w-full bg-transparent p-2.5 text-sm text-textGrey outline-none"                    rows={2}
                  ></textarea>
                  </div>
<<<<<<< HEAD
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
=======
                  

                  <label className="block mt-4 text-sm font-medium text-gray-700">Examples</label>
                  {definition.example.map((ex, exIndex) => (
                    <div key={exIndex} className="mt-1 flex space-x-2">
>>>>>>> f9b4a76 (refactor)
                      <input
                        type="text"
                        className="block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                        placeholder="Example"
                        value={ex}
                        onChange={(e) => handleExampleChange(meaningIndex, defIndex, exIndex, e.target.value)}
                      />
                      {definition.example.length > 1 && (
                        <button
                          type="button"
                          className="text-red-600"
                          onClick={() => handleRemoveExample(meaningIndex, defIndex, exIndex)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
<<<<<<< HEAD
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
=======
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddExample(meaningIndex, defIndex)}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    + Add Example
                  </button>
                </div>
              ))}
>>>>>>> f9b4a76 (refactor)

              {meaning.definitions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMeaning(meaningIndex, meaning.definitions.length - 1)}
                  className="mt-4 text-red-600"
                >
                  Remove Meaning
                </button>
              )}
              <button
                type="button"
                onClick={() => handleAddMeaning(meaningIndex)}
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                + Add Meaning
              </button>

              <div className="flex space-x-4 mt-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Synonyms</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                    placeholder="Synonyms (comma separated)"
                    onBlur={(e) => handleSynonymChange(meaningIndex, e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Antonyms</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                    placeholder="Antonyms (comma separated)"
                    onBlur={(e) => handleAntonymChange(meaningIndex, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddPartOfSpeech}
          className="mt-4 inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700"
        >
          + Add Part of Speech
        </button>

        
      </form>
    </main>
  );
};

export default AddWordModal;