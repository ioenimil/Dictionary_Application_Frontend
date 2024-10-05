import searchIcon from '../assets/search.svg'
const Search = () => {

  return (
    <div className="  w-[327px] h-[48px] lg:w-[736px] md:w-[689px] mt-5 md:mt-10 md:h-16 rounded-xl bg-grayBg px-5 flex items-center justify-between ">
        <input className=" bg-transparent outline-none w-full" type="text" placeholder="Keyboard" />
        <img src={searchIcon} alt="searchIcon" />
    </div>
  )
}
export default Search