import { getAppTheme } from '../lib/helper';
import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Slide, toast } from 'react-toastify';
import playIcon from "../assets/playIcon.svg";
import SelectPartOfSpeech from './SelectPartOfSpeech';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

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
interface setShowAddWord {
  setShowAddWord: React.Dispatch<React.SetStateAction<boolean>>
}

const AddWord = ({setShowAddWord}: setShowAddWord) => {
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

  // Handle change for Word input
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordData({ ...wordData, word: e.target.value });
  };

  // Add new part of speech
  const handleAddPartOfSpeech = () => {
    const newPartOfSpeech: Meaning = {
      partOfSpeech: 'noun',
      definitions: [{ definition: '', synonyms: [], antonyms: [], example: [''] }],
      synonyms: [],
      antonyms: []
    };
    setWordData({ ...wordData, meanings: [...wordData.meanings, newPartOfSpeech] });
  };

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
  const theme = getAppTheme()
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
          example: def.example,
        })),
        synonyms: meaning.synonyms,
        antonyms: meaning.antonyms,
      })),
      sourceUrls: wordData.sourceUrls,
    };
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_DICTIONARY_API}api/v1/add_word/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
  
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error, { 
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Slide,
        });
      } else {
        toast.success('Word added successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        
      });
    }
  };
  

  return (
    <div className=" w-full max-h-[88vh] overflow-y-auto px-3 ">
      <form className="space-y-4 py-2" onSubmit={handleSubmit}>

        <div className=' flex items-center  justify-between'>
        <div className=" flex items-center ">
          
          <span className=' text-sm text-textGrey'>Add Word</span> 
          <MdKeyboardArrowRight className=' text-textGrey'/>
          <span className=' text-sm font-semibold'>Add Word</span>
          </div>

        <div className="flex items-center space-x-4">
          <button
          onClick={() => setShowAddWord(false)}
            type="button"
            className="px-4 py-1 border text-sm border-gray-300 text-global_blue font-semibold rounded-md  hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-global_blue text-sm text-white rounded-md shadow-sm hover:bg-blue-500"
          >
            Add
          </button>
        </div>
        </div>
        <p className=" text-textGrey">
        Fields marked with (<span className="required">*</span>) are required.
      </p> 
      <div className="flex space-x-4">
          <div className="mb-2 h-[89px] w-[540px] rounded-xl border bg-white dark:bg-textBlack pl-5 hover:border-global_blue">
          <label className="text-textGrey">
              Word to add<span className="required"> *</span>
            </label>
            <input
              type="text"
              className="mt-3 w-full bg-transparent font-medium outline-none"              value={wordData.word}
              onChange={handleWordChange}
              required
            />
          </div>
          <div className="mb-2 h-[89px] w-[540px] rounded-xl border bg-white dark:bg-textBlack  pl-5 hover:border-global_blue">
          <label className="text-textGrey">Source</label>
            <input
              type="text"
              className="mt-3 w-full bg-transparent font-medium outline-none"
              
            />
          </div>
        </div>
        <div className="my-3 h-[89px] w-[1092px] rounded-xl border bg-white dark:bg-textBlack  pl-5 hover:border-global_blue">
        <label className="text-textGrey">
            Pronunciation<span className="required"> *</span>
          </label>
          <div className="flex items-center gap-3">
            <input
            placeholder="Phonetics"
              type="text"
              className="h-[42px] w-[540px]    rounded-xl border border-[#979797] bg-white dark:bg-textBlack  p-2.5 text-sm text-textGrey outline-none"
            />
            <img src={playIcon} alt="soundImage" className="h-10 w-10" />

          </div>
        </div>

        <div className="mt-6">
        {wordData.meanings.map((meaning, meaningIndex) => { 
          return (
            <div className=' bg-white dark:bg-textBlack mt-3  px-2 py-2 rounded-xl shadow-sm'>
            <div className=' flex items-center justify-between'>
            <SelectPartOfSpeech
              meaning={meaning}
              meaningIndex={meaningIndex}
              handlePartOfSpeechChange={handlePartOfSpeechChange}
            />
                          {wordData.meanings.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemovePartOfSpeech(meaningIndex)}
                            >
                              <FaMinus className='text-textGrey' />
                            </button>
                          )}
              </div>
                      <div key={meaningIndex} className="mt-4 border dark:border-textGrey p-4 rounded-md ">
                        <div className=' flex items-center mb-2 justify-between'>
                            <label className="block text-sm ">Add Meaning</label>
                             <div className='flex items-center gap-2 '>
                             {meaning.definitions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMeaning(meaningIndex, meaning.definitions.length - 1)}
                          >
                           <FaMinus className=' text-textGrey' />
                          </button>
                        )}
                         <FaPlus className='text-textGrey'  onClick={() => handleAddMeaning(meaningIndex)}/>
                             </div>
                            </div>
                        {meaning.definitions.map((definition, defIndex) => (
                            <div key={defIndex} className=" mt-3 ">
                            <div className=' bg-[#F4F4F4] dark:bg-[#2D2D2D] rounded-md shadow-sm px-2 py-2  '>
                              <div>
                              <span className=' text-sm'>Meaning:</span>
                              <div className=' w-[90%]  mx-auto  flex items-center gap-2 justify-center h-fit'>
                              <span className="w-2 h-2  bg-global_blue rounded-full "></span>
                              <input
                              value={definition.definition}
                              placeholder='Add word meaning'
                              onChange={(e) => handleDefinitionChange(meaningIndex, defIndex, e.target.value)}
                              className="mt-1 placeholder:text-sm bg-transparent  outline-none border-none block w-full"
                            />
                              </div>
                              </div>
                              <hr  className=' border-[#979797] dark:border-[#757575] mt-1'/>
                             <div className='flex items-center justify-between'>
                              <div  className=' flex-1'>
                              <span className=" mt-1 text-sm ">Examples:</span>
                             {definition.example.map((ex, exIndex) => {
                               return (
                                 <div  className=' flex items-center '>
                                 <div key={exIndex} className=" w-[90%]   mx-auto mt-1 flex items-center gap-2">
                                <p className=' flex items-center gap-2'>
                              <span className="w-2 h-2  bg-global_blue rounded-full "></span>
                              <span className=' text-sm text-textGrey'>Example:</span>
                              </p>
                                <input
                                  type="text"
                                  className=" w-full text-sm outline-none bg-transparent"
                                  placeholder="Example"
                                  value={ex}
                                  onChange={(e) => handleExampleChange(meaningIndex, defIndex, exIndex, e.target.value)}
                                />
                              </div>
                              <div className='flex items-center gap-2'>
                              {definition.example.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveExample(meaningIndex, defIndex, exIndex)}
                                  >
                                    <FaMinus className=' text-textGrey' />
                                  </button>
                                )}
                                <button onClick={()=>handleAddExample(meaningIndex, defIndex)}  type="button"  >
                                <FaPlus className=' text-textGrey cursor-pointer' />
                                </button>
                              </div>
                                 </div>
                               )
                    })}
                              </div>
                             </div>
                            </div>
                          </div>
                        ))}
                        <div className="flex space-x-4 mt-4">
                          <div className="w-1/2">
                            <input
                              type="text"
                              className="mt-1 placeholder:text-sm dark:border-[#757575] dark:bg-textBlack outline-none block w-full border border-[#979797] p-2 rounded-md shadow-sm"
                              placeholder="Synonyms "
                              onBlur={(e) => handleSynonymChange(meaningIndex, e.target.value)}
                            />
                          </div>
                          <div className="w-1/2 ">
                            <input
                              type="text"
                              className="mt-1 block placeholder:text-sm dark:bg-textBlack outline-none  w-full border border-[#979797] dark:border-[#757575] p-2 rounded-md shadow-sm"
                              placeholder="Antonyms "
                              onBlur={(e) => handleAntonymChange(meaningIndex, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                        </div>
           
        )
           
})}
        </div>
      
         
          <button
          type="button"
          onClick={handleAddPartOfSpeech}
          className=' w-full mt-2  border-black  h-[89px] border-[1px] border-dashed dark:border-[#757575] flex items-center rounded-md justify-center gap-2 cursor-pointer'
        >
           <FiPlus />
        Add Part of Speech
        </button>
        </form>
    </div>
  );
};

export default AddWord;
