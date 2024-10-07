import NavBar from "./NavBar";
import SearchContent from "./SearchContent";
const Hero = () => {
  return (
    <div className=" border-blue-600 border-[2px]   w-[329px] md:w-[689px]  lg:w-[739px] h-full  m-auto ">
      <NavBar />
      <SearchContent />
    </div>
  );
};

export default Hero;
