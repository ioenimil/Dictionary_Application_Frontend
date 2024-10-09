import { IoClose } from "react-icons/io5";
import DarkMode from "./DarkMode";
import Dropdown from "./Dropdown";
import userIcon from "../assets/user.svg";

interface Props {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav = ({ setShowNav, showNav }: Props) => {
  return (
    <>
      {/* Backdrop Layer */}
      {showNav && (
        <div
          onClick={() => setShowNav(false)}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 rounded-tl-xl rounded-bl-xl h-screen w-[248px] z-20 bg-[#F4F4F4] dark:bg-[#3F3F3F] overflow-hidden py-0 px-0 
        transform transition-transform duration-300 ease-in-out
        ${showNav ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button */}
        <div className="w-full flex items-center justify-end p-4">
          <IoClose onClick={() => setShowNav(false)} className="cursor-pointer" />
        </div>

        {/* Content */}
        <div className="mt-20 flex flex-col gap-7 px-10">
          <DarkMode showNav={showNav} />
          <Dropdown />
          <div className="w-full flex items-center justify-between">
            <p className="font-semibold dark:text-white">Login</p>
            <img className="w-8" src={userIcon} alt="user icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
