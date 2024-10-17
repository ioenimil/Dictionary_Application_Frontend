import NavBar from "./NavBar";
 
import Search from "./SearchComponent";
import WordList from "./WordList";
const HeroComponent = () => {
  return (
    <div className="m-auto h-full w-[329px] md:w-[689px] lg:w-[739px]">
      <NavBar />
 
      <Search />
      <WordList />
      <SearchContent />
 
    </div>
  );
};
export default HeroComponent;
