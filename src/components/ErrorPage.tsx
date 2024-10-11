import { WordNotFoundError } from "types";

interface Props {
  wordNotFoundError: WordNotFoundError;
}
const ErrorPage: React.FC<Props> = ({ wordNotFoundError }) => {
  return (
    <div className=" w-full md:w-[736px]   md:h-[204px] flex flex-col items-center justify-center ">
        <p className=" mb-3 mt-5 text-center ">😉</p>
      <h2 className=" font-bold text-sm text-[#2D2D2D] dark:text-white">
        {wordNotFoundError.title}
      </h2>
      <p className=" text-center   md:px-16 mt-3 text-sm font-normal text-[#757575] leading-6">
        {wordNotFoundError.message} {wordNotFoundError.resolution}
      </p>
    </div>
  );
};
export default ErrorPage;