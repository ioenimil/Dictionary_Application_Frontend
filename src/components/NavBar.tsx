import bookIcon from "../assets/iconoir_book.svg";
import userIcon from "../assets/userIcon.svg";
import menuIcon from "../assets/menuIcon.svg";
import Dropdown from "./Dropdown";
import { useState } from "react";
import SideNav from "./SideNav";
import DarkMode from "./DarkMode";

const NavBar = () => {
  const [showNav, setShowNav] = useState<boolean>(false);

  const handleShowNav = () => {
    setShowNav(true);
  };

  return (
    <div className="relative mt-8 w-[326px] h-10 md:w-[689px] md:h-tabletHeight lg:w-[736.99px] flex items-center justify-between">
      <img
        className="w-[28.05px] h-[31.56px] md:w-[32px] md:h-tabletHeight"
        src={bookIcon}
        alt="book"
      />
      <div className="md:w-[275px] lg:w-[270px] h-8 flex items-center lg:justify-end md:gap-2">
        <div className="md:w-[120px] hidden md:block">
          <Dropdown />
        </div>
        <span className="w-[1px] md:mr-2 lg:mr-2 h-8 bg-grayBg block"></span>
        <DarkMode showNav={showNav} />

        <p className="hidden bg-[#D3E3F7] md:w-[40px] md:h-[40px] md:flex items-center justify-center rounded-full">
          <img
            className="hidden md:block md:w-[28.43px] md:h-[15.07px]"
            src={userIcon}
            alt="userIcon"
          />
        </p>

        {!showNav && (
          <img
            onClick={handleShowNav}
            className="md:hidden dark:text-white cursor-pointer w-[18px] h-[12px] text-[#000000]"
            src={menuIcon}
            alt="navMenuIcon"
          />
        )}
      </div>
      {showNav && <SideNav showNav={showNav} setShowNav={setShowNav} />}
    </div>
  );
};

export default NavBar;
