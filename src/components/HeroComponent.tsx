import AddWordModal from "./AddWord";
import NavBar from "./NavBar";
import SearchContent from "./SearchContent";
const HeroComponent = () => {
  return (
    <div className="m-auto h-full w-[329px] md:w-[689px] lg:w-[739px]">
      <NavBar />
      <SearchContent />
      <AddWordModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onAddWord={function (newWord: {
          word: string;
          partOfSpeech: string;
          synonyms: string[];
          link: string;
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};
export default HeroComponent;
