import DarkMode from "./DarkMode"
const Nav = () => {
  return (
    <div className=" h-[36px] flex items-center justify-between">
        <img className="w-[28.05px]  h-[31.56px] md:w-[32px] md:h-[36px]" src="iconoir_book.svg" alt="book" />
        <div className=" w-[248.99px] h-[32px] flex items-center   gap-5">
        <div>Drop Down</div>
        <span className="w-[1px] h-[32px] bg-[#E9E9E9] block"></span>
        <DarkMode/>
        </div>
    </div>
  )
}

export default Nav