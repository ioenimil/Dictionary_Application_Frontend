import { WordNotFoundError } from "@/types";


interface Props {
  wordNotFoundError: WordNotFoundError;
}

const ErrorPage= ({ wordNotFoundError }:Props) => {
  return (
    <div className=" w-[736px] h-[204px] flex items-center justify-center border-red-500 border-[1px]">
        <h3>{wordNotFoundError.title}</h3>
      <p>{wordNotFoundError.message}</p>
      <p>{wordNotFoundError.resolution}</p>
     
    </div>
  );
};

export default ErrorPage;
