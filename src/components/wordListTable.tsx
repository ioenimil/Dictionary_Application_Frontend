import React, { useState, useEffect } from "react";
import AddWordModal from "./AddWordModal";
import WordListNavBar from "./WordListNavBar";
import WordListSearchComponent from "./WordListSearchComponent";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";

interface Word {
  word: string;
  partOfSpeech: string;
  synonyms: string[];
  link: string;
}

const WordListTable: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample words for initial display
  useEffect(() => {
    const sampleWords = [
      // sample words like 'run', 'beautiful', etc.
    ];
    setWords(sampleWords);
  }, []);

  const handleAddWord = (newWord: Word) => {
    setWords((prevWords) => [...prevWords, newWord]); // Add new word to the list
  };

  return (
    <div>
      {/* Navbar with "Add Word" button */}
      <WordListNavBar
        onSort={() => console.log("Sorting...")}
        onFilter={(filter) => console.log(`Filtering by: ${filter}`)}
      />

      {/* Table for displaying words */}
      <table className="mt-2 w-[1200px] divide-y divide-gray-500">
        <thead>{/* Table header */}</thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={index}>
              <td>{word.word}</td>
              <td>{word.partOfSpeech}</td>
              <td>{word.synonyms.join(", ")}</td>
              <td>
                <a href={word.link} target="_blank" rel="noopener noreferrer">
                  {word.link}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Word Modal */}
      {isModalOpen && (
        <AddWordModal
          onClose={() => setIsModalOpen(false)}
          onAddWord={handleAddWord}
        />
      )}

      {/* Add Word button */}
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setIsModalOpen(true)}
      >
        Add Word
      </button>
    </div>
  );
};

export default WordListTable;
