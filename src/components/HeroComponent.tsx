import NavBar from "./NavBar";
import Search from "./SearchComponent";
import WordWithAudio from "./WordWithAudio";

const HeroComponent = () => {
  return (
    <div className="m-auto h-full w-[326.99px] pt-8 md:w-[689px] md:pt-[58px] lg:w-[736.99px]">
      <NavBar />
      <Search />
      <WordWithAudio />
    </div>
  );
};

export default HeroComponent;
