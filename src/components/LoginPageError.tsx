import { IoMdArrowBack, IoMdMenu } from "react-icons/io";

interface Props {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPageError = ({ setShowNav }: Props) => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-white dark:bg-darkBg flex flex-col items-center justify-center z-50">
      <div className="absolute top-10 px-5 w-full flex items-center justify-between">
        <span
          onClick={() => setShowNav(false)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CDCDCD80] dark:bg-[#3F3F3F] cursor-pointer"
        >
          <IoMdArrowBack />
        </span>

        <IoMdMenu className="text-2xl cursor-pointer" />
      </div>

      <div className="px-3 w-full flex flex-col items-center justify-center">
        <p className="mb-3 mt-5 text-center">😕</p>
        <h2 className="font-bold text-xl text-blackText dark:text-white">
          Oooops
        </h2>
        <p className="text-center px-10 mt-3 text-sm font-normal text-grayText leading-6">
          Admin mode is not available on mobile. Please log in on PC.
        </p>
      </div>
    </div>
  );
};

export default LoginPageError;
