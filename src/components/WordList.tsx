 

import WordListSearchComponent from './WordListSearchComponent';
import WordListNavBar from './WordListNavBar';
import WordListTable from './wordListTable';



const WordList = () => {
 

  return (
    <>
       <main className='w-[1201px] h-[1138px]  '>
        {/* <WordListSearchComponent/> */}
        {/* < WordListNavBar /> */}
        <WordListTable/>
        
       </main>
    </>
  );
};

export default WordList;