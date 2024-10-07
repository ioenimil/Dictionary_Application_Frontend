import bookIcon from "@assets/iconoir_book.svg";
import navMenuIcon from "@assets/navMenuIcon.svg";
import userIcon from "@assets/userIcon.svg";
import DarkMode from "./DarkMode";
const NavBar = () => {
  return (
    <div className="flex h-8 w-[326px] items-center justify-between gap-2 md:h-tabletHeight md:w-[689px] lg:w-[736.99px]">
      <img
        className="h-[31.56px] w-[28.05px] md:h-tabletHeight md:w-[32px]"
        src={bookIcon}
        alt="book"
      />
      <div className="flex h-8 items-center justify-between md:w-[250px] md:gap-2 lg:w-[267.99px] lg:gap-5">
        <div className="hidden md:block">Drop Down</div>
        <span className="block h-8 w-[1px] bg-grayBg"></span>
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
