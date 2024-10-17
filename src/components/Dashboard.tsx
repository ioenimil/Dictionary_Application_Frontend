import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import bookIcon from '../assets/iconoir_book.svg'
import { useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { FiEdit, FiSettings } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
const Dashboard = () => {
    const navData = [
        {title:"Home",icon: <HiOutlineHome/>, path:"/dashboard/home"},
        {title:"Word List",icon: <IoText/>, path:"/dashboard/wordlist"},
        {title:"Users",icon: <FiEdit/>, path:"/dashboard/users"},
        {title:"Organization",icon: <CgOrganisation/>, path:"/dashboard/organizations"},
    ]

    const [open,setOpen] = useState(true);
  return (
    <div className="flex h-screen ">
    
      <aside className={` ${open ? `w-64`:`w-20`} h-full    -5 pt-8 duration-300 relative bg-grayBg flex flex-col p-4`}>
      <MdKeyboardArrowLeft onClick={()=>setOpen(!open)}  className=" text-white absolute cursor-pointer bg-global_blue rounded-full -right-3 bottom-[35%] w-5 h-5 border-2" />
      <MdKeyboardArrowRight onClick={()=>setOpen(true)} className=" text-white absolute cursor-pointer bg-global_blue rounded-full -right-3 bottom-[45%] h-5 w-5 border-2" />
      <div className="px-3 ">    
        <img  className="  w-[30.14px]" src={bookIcon} alt="bookIcon" />
      </div>
        <div className=" mt-10">
        <ul className="pt-6">
            {
                navData.map((data,index)=>(
                    <li key={index} className="  hover:bg-global_blue hover:text-white  rounded-md flex items-center   gap-x-4 px-3 py-3">
            <span className={`text-2xl`}>{data.icon}</span>
             <Link to={data.path} className={`${!open && `hidden`} origin-left duration-200`}>
            {data.title}
          </Link>
                    </li>
                ))
            }
           
        </ul>
        </div>

        <div className=" absolute bottom-16 flex mt-10 items-center gap-x-4 px-3 py-3">
            <FiSettings className=" text-2xl"/>
            <span className={`${!open && `hidden`} origin-left duration-200`} >Settings</span>
        </div>
      </aside>
      <div className="flex-1 bg-gray-100 p-8">
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
