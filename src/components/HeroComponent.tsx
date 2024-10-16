import NavBar from "./NavBar";
import SearchContent from "./SearchContent";
const HeroComponent = () => {
  return (
    <div className="m-auto h-full w-[329px] md:w-[689px] lg:w-[739px]">
      <NavBar />
      <SearchContent />
    </div>
  );
};
export default HeroComponent;
