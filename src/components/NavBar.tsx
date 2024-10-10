import bookIcon from "@assets/iconoir_book.svg";
import navMenuIcon from "@assets/navMenuIcon.svg";
import userIcon from "@assets/userIcon.svg";
import DarkMode from "./DarkMode";
import Dropdown from "./Dropdown";
const NavBar = () => {
  return (
    <div className=" mt-8  w-[326px] h-10     md:w-[689px] md:h-tabletHeight lg:w-[736.99px] flex items-center justify-between">
      <img
        className="h-[31.56px] w-[28.05px] md:h-tabletHeight md:w-[32px]"
        src={bookIcon}
        alt="book"
      />
      <div className="flex h-8 items-center md:w-[275px] md:gap-2 lg:w-[270px] lg:justify-end">
        <div className="hidden md:block lg:w-[120px]">
          <Dropdown />
        </div>
        <span className="block h-8 w-[1px] bg-grayBg md:mr-2 lg:mr-2"></span>
        <DarkMode />

        <p className="hidden items-center justify-center rounded-full bg-[#D3E3F7] md:flex md:h-[40px] md:w-[40px]">
          <img
            className="hidden md:block md:h-[15.07px] md:w-[28.43px]"
            src={userIcon}
            alt="userIcon"
          />
        </p>
        <img
          className="h-[18.68px] text-[#000000] md:hidden"
          src={navMenuIcon}
          alt="navMenuIcon"
        />
      </div>
    </div>
  );
};
export default NavBar;
