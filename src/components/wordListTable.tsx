import React, { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal
import RenderDropdown from "./RenderDropdown"; // Import RenderDropdown component
import WordListNavBar from "./WordListNavBar";
import WordListSearchComponent from "./WordListSearchComponent";
import AddWord from "./AddWord";


interface Definition {
  id: number;
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example: string[];
}

interface Meaning {
  id: number;
  partOfSpeech: string;
  synonyms: string[];
  antonyms: string[];
  definitions: Definition[];
}

interface ApiResponseItem {
  id: number;
  word: string;
  phonetics: any[]; // Adjust the type based on actual phonetic structure
  meanings: Meaning[];
  license: null | string; // Change to appropriate type if needed
  source_urls: string[];
}

// Example usage with an array of items
type ApiResponse = ApiResponseItem[];

const WordListTable: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterTerm, setFilterTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal
  const [wordToDelete, setWordToDelete] = useState<number | null>(null); // Store word index for deletion
  const [showAddWord, setShowAddWord] = useState(false);
  const itemsPerPage = 7;

  interface Word {
    id: number;
    word: string;
    partOfSpeech: string;
    synonyms: string[];
    link: string;
  }

  useEffect(() => {
    const runEffect = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_DICTIONARY_API}api/v1/words/`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const apiResponse: ApiResponse = await response.json();

        // Transform the API response to fit the Word interface
        const sampleWords: Word[] = apiResponse.flatMap((item) =>
          item.meanings.map((meaning) => ({
            id: item.id,
            word: item.word,
            partOfSpeech: meaning.partOfSpeech,
            synonyms: meaning.synonyms,
            link: item.source_urls[0] || "", // Use the first source URL or an empty string
          })),
        );

       

        setWords(sampleWords);
      } catch (error) {
        console.error("Failed to fetch words:", error);
      }
    };

    runEffect();
  }, []);

  const handleEdit = () => {
    // Edit logic here
  };

  const handleDelete = (index: number) => {
    setWordToDelete(index);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (wordToDelete !== null) {
      // Remove the word from the list using filter
      try {
        fetch(
          `${import.meta.env.VITE_APP_DICTIONARY_API}api/v1/delete_word/${wordToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        toast.success("Word deleted successfully");
      } catch (error) {
        toast.error(`Failed to delete word: ${error}`);
      }
      const updatedWords = words.filter((word) => word.id !== wordToDelete);
      setWords(updatedWords);
      setWordToDelete(null);
      setIsModalOpen(false);
    }
  };

  const toggleDropdown = (index: number) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  const sortedWords = [...words].sort((a, b) =>
    sortOrder === "asc"
      ? a.word.localeCompare(b.word)
      : b.word.localeCompare(a.word),
  );

  const filteredWords = sortedWords.filter(
    (word) =>
      word.partOfSpeech.toLowerCase().includes(filterTerm.toLowerCase()) &&
      word.word.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWords.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderPagination = () => (
    <div className="ml-[403px] mt-4 flex h-[50px] w-[395px] items-center justify-center gap-[10px] rounded-3xl bg-white dark:bg-textBlack">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`rounded-full px-2 py-1 ${currentPage === 1 ? "text-textGrey" : "text-black"}`}
      >
        <FiChevronLeft size={24} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`h-8 w-8 rounded-full px-3 py-1 transition-colors duration-200 ${
            pageNumber === currentPage
              ? "bg-blueBg text-white dark:bg-global_orange"
              : "text-white hover:bg-blue-200 dark:bg-gray-200 dark:hover:bg-[#FF650073]"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`rounded-full px-11 py-1 ${currentPage === totalPages ? "text-textGrey" : "text-black"}`}
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );

  const tableHeaderClasses =
    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-textGrey";
  const tableCellClasses = "  px-6 py-4 text-sm text-textGrey";

  return showAddWord? ( <AddWord setShowAddWord={setShowAddWord}/>):(  <div className="flex    flex-col">
   
    <div className=" w-full flex items-center justify-center">
    <WordListSearchComponent
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
    </div>
    <WordListNavBar
    setShowAddWord={setShowAddWord}
      onFilter={(filter) => setFilterTerm(filter)}
      onSort={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
    />

    {filteredWords.length === 0 ? (
      <div className="flex flex-grow items-center justify-center">
        <p className="text-center text-2  xl text-textGrey">No words added.</p>
      </div>
    ) : (
      <>
        <table className="mt-2 w-full divide-y divide-gray-500">
          <thead className="h-[75px] bg-white dark:bg-[] dark:bg-textBlack dark:text-white">
            <tr>
              <th className={tableHeaderClasses}>Word</th>
              <th className={tableHeaderClasses}>Part of Speech</th>
              <th className={tableHeaderClasses}>Synonyms</th>
              <th className={tableHeaderClasses}>Link</th>
              <th className={tableHeaderClasses}></th>
            </tr>
          </thead>
          <tbody className="h-[75px] divide-y divide-gray-200 bg-white dark:divide-textGrey dark:bg-[#404040] dark:text-darkGrey">
            {currentItems.map((word, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-textGrey"
              >
                <td className={tableCellClasses}>{word.word}</td>
                <td className={tableCellClasses}>{word.partOfSpeech}</td>
                <td className={tableCellClasses}>
                  {word.synonyms.join(" ")}
                </td>
                <td className={`${tableCellClasses} underline`}>
                  <a
                    href={word.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {word.link}
                  </a>
                </td>
                <td className="relative whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <button onClick={() => toggleDropdown(index)}>
                    <FiMoreHorizontal className="text-textGrey" />
                  </button>
                  {dropdownVisible === index && (
                    <RenderDropdown
                      key={index}
                      index={index}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(word.id)}
                      onClose={() => setDropdownVisible(null)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredWords.length > 7 && renderPagination()}
      </>
    )}

    <DeleteConfirmationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={confirmDelete}
    />
  </div>)
      
  
  
};

export default WordListTable;
