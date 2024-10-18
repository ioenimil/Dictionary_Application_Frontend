import React, { useState } from 'react';

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

const AddWord: React.FC = () => {
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    
    console.log(payload);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <h1 className="text-xl font-semibold mb-4">Add Word</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Word to add *</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
              value={wordData.word}
              onChange={handleWordChange}
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Source</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
              placeholder="Source (Optional)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pronunciation</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            placeholder="Phonetic"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium">Parts of Speech</h3>
          {wordData.meanings.map((meaning, meaningIndex) => (
            <div key={meaningIndex} className="mt-4 border p-4 rounded-md bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Part of Speech *</label>
                  <select
                    value={meaning.partOfSpeech}
                    onChange={(e) => handlePartOfSpeechChange(meaningIndex, e.target.value)}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="noun">Noun</option>
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
              </div>

              {meaning.definitions.map((definition, defIndex) => (
                <div key={defIndex} className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Meaning</label>
                  <textarea
                    value={definition.definition}
                    onChange={(e) => handleDefinitionChange(meaningIndex, defIndex, e.target.value)}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                    rows={2}
                  ></textarea>

                  <label className="block mt-4 text-sm font-medium text-gray-700">Examples</label>
                  {definition.example.map((ex, exIndex) => (
                    <div key={exIndex} className="mt-1 flex space-x-2">
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

        <div className="mt-6 flex justify-end space-x-4">
          <button
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
      </form>
    </div>
  );
};

export default AddWord;
