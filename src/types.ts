
export interface WordNotFoundError {
    title: string;
    message: string;
    resolution: string;
  }
  export interface Phonetic {
    text: string;
    audio: string;
  }
  
  export interface Meaning {
    partOfSpeech: string;
    definitions: { definition: string; example: string }[];
    synonyms: string[];
    sourceUrls: string[];
  }
  export interface WordResult {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: { name: string; url: string };
    sourceUrls: string[];
  }