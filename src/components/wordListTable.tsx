import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi'; // Importing the three-dot icon
import WordListSearchComponent from './WordListSearchComponent'; 
import WordListNavBar from './WordListNavBar';

interface Word {
  word: string;
  partOfSpeech: string;
  synonyms: string[];
  link: string;
}

const WordListTable: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 
  const [filterTerm, setFilterTerm] = useState(''); 
  const [dropdownVisible, setDropdownVisible] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const sampleWords = [
      {
        word: 'run',
        partOfSpeech: 'verb',
        synonyms: ['sprint', 'jog'],
        link: 'https://example.com/run',
      },
      {
        word: 'beautiful',
        partOfSpeech: 'adjective',
        synonyms: ['gorgeous', 'pretty'],
        link: 'https://example.com/beautiful',
      },
      {
        word: 'jump',
        partOfSpeech: 'verb',
        synonyms: ['leap', 'bounce'],
        link: 'https://example.com/jump',
      },
    ];

    setWords(sampleWords);
  }, []);

  const handleEdit = (index: number) => {
     
    console.log(`Editing word at index: ${index}`);
  };

  const handleDelete = (index: number) => {
    
    console.log(`Deleting word at index: ${index}`);
     
    setWords(words.filter((_, i) => i !== index));
  };

  const toggleDropdown = (index: number) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sortedWords = [...words].sort((a, b) => {
    return sortOrder === 'asc' ? a.word.localeCompare(b.word) : b.word.localeCompare(a.word);
  });

  const filteredWords = sortedWords.filter((word) =>
    word.partOfSpeech.toLowerCase().includes(filterTerm.toLowerCase()) &&
    word.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <WordListNavBar
        onSort={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        onFilter={(filter) => setFilterTerm(filter)}
      />
      <WordListSearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part of Speech</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Synonyms</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>  
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-x divide-gray-200">
          {filteredWords.map((word, index) => (
            <tr key={index} className="border-none">
              <td className="px-6 py-4 whitespace-nowrap text-sm   text-gray-900">{word.word}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{word.partOfSpeech}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{word.synonyms.join(' ')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                <a href={word.link} target="_blank" rel="noopener noreferrer">
                  {word.link}
                </a>
              </td>
              <td className="relative px-6 py-4 whitespace-nowrap text-sm font-medium">
                
                <button onClick={() => toggleDropdown(index)}>
                  <FiMoreVertical className="text-gray-500" />
                </button>

                 
                {dropdownVisible[index] && (
                  <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-md">
                    <button
                      onClick={() => handleEdit(index)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WordListTable;
