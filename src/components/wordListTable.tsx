import React, { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal
import Dropdown from "./RenderDropdown";
import WordListNavBar from "./WordListNavBar";
import WordListSearchComponent from "./WordListSearchComponent";

interface Word {
  word: string;
  partOfSpeech: string;
  synonyms: string[];
  link: string;
}

const WordListTable: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterTerm, setFilterTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState<{
    [key: number]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal
  const [wordToDelete, setWordToDelete] = useState<number | null>(null); // Store word index for deletion

  const itemsPerPage = 7;

  useEffect(() => {
    const sampleWords: Word[] = [
      {
        word: "run",
        partOfSpeech: "verb",
        synonyms: ["sprint", "jog"],
        link: "https://example.com/run",
      },
      {
        word: "beautiful",
        partOfSpeech: "adjective",
        synonyms: ["gorgeous", "pretty"],
        link: "https://example.com/beautiful",
      },
      {
        word: "jump",
        partOfSpeech: "verb",
        synonyms: ["leap", "bounce"],
        link: "https://example.com/jump",
      },
      {
        word: "dance",
        partOfSpeech: "verb",
        synonyms: ["move", "sway"],
        link: "https://example.com/dance",
      },
      {
        word: "help",
        partOfSpeech: "verb",
        synonyms: ["assist", "aid"],
        link: "https://example.com/help",
      },
    ];

    setWords(sampleWords);
  }, []);

  const handleEdit = () => {};

  const handleDelete = (index: number) => {
    setWordToDelete(index);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (wordToDelete !== null) {
      setWords(words.filter((_, i) => i !== wordToDelete));
      setWordToDelete(null); // Reset the wordToDelete
    }
    setIsModalOpen(false); // Close the modal after deleting
  };

  const toggleDropdown = (index: number) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
              : "dark: bg-gray-200 text-white hover:bg-blue-200 dark:hover:bg-[#FF650073]"
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
    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-textGrey  ";
  const tableCellClasses = "whitespace-nowrap px-6 py-4 text-sm text-textGrey";

  return (
    <div className="flex h-full flex-col">
      <WordListSearchComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <WordListNavBar
        onFilter={(filter) => setFilterTerm(filter)}
        onSort={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      />

      {filteredWords.length === 0 ? (
        <div className="flex flex-grow items-center justify-center">
          <p className="text-center text-6xl text-textGrey">No words added.</p>
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
                    {dropdownVisible[index] && (
                      <Dropdown
                        index={index}
                        onEdit={handleEdit}
                        onDelete={() => handleDelete(index)}
                        onClose={() => setDropdownVisible({})}
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
    </div>
  );
};

export default WordListTable;
