import searchIcon from "@assets/search.svg";
const SearchComponent = () => {
  return (
    <div className="mt-5 flex h-[48px] w-[327px] items-center justify-between rounded-2xl bg-grayBg px-5 md:mt-10 md:h-16 md:w-[689px] lg:w-[736px] lg:h-[64px]">
      <input
        className="w-full bg-transparent outline-none"
        type="text"
        placeholder="Keyboard"
      />
      <img src={searchIcon} alt="searchIcon" />
    </div>
  );
};
export default SearchComponent;
