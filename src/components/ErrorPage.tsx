import { WordNotFoundError } from "@/types";
import errorIcon from "../assets/errorIcon.png";
interface Props {
  wordNotFoundError: WordNotFoundError;
}
const ErrorPage: React.FC<Props> = ({ wordNotFoundError }) => {
  return (
    <div className=" w-[736px]  h-[204px] flex flex-col items-center justify-center ">
      <img className=" mb-5 w-[64px]" src={errorIcon} alt="error icon" />
      <h2 className=" font-bold text-sm text-[#2D2D2D] dark:text-white">
        {wordNotFoundError.title}
      </h2>
      <p className=" text-center  px-16 mt-3 text-sm font-normal text-[#757575] leading-6">
        {wordNotFoundError.message} {wordNotFoundError.resolution}
      </p>
    </div>
  );
};

export default ErrorPage;
