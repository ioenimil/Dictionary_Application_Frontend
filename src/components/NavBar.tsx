import DarkMode from "./DarkMode";
import bookIcon from "../assets/iconoir_book.svg";
import userIcon from "../assets/userIcon.svg";
import navMenuIcon from "../assets/navMenuIcon.svg";
const NavBar = () => {
  return (
    <div className="  w-[326px] h-[32px]     md:w-[689px]  md:h-[36px] lg:w-[736.99px] flex items-center justify-between">
      <img
        className="w-[28.05px]  h-[31.56px] md:w-[32px] md:h-[36px]"
        src={bookIcon}
        alt="book"
      />
      <div className="    md:w-[250px] lg:w-[267.99px] h-[32px] flex items-center justify-between  md:gap-2  lg:gap-5">
        <div className=" hidden md:block">Drop Down</div>
        <span className="w-[1px] h-[32px] bg-[#E9E9E9] block"></span>
        <DarkMode />

        <p className=" hidden bg-[#D3E3F7] md:w-[40px] md:h-[40px] md:flex items-center justify-center rounded-full">
          <img
            className=" hidden md:block md:w-[28.43px] md:h-[15.07px]"
            src={userIcon}
            alt="userIcon"
          />
        </p>
        <img
          className=" md:hidden h-[18.68px] text-[#000000]"
          src={navMenuIcon}
          alt="navMenuIcon"
        />
      </div>
    </div>
  );
};
export default NavBar;
