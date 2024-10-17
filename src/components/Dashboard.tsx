import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { FiEdit, FiLogOut, FiSettings } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import DarkMode from "./DarkMode";
import bookIcon from '../assets/iconoir_book.svg';
import DashboardDarkMode from "./DashboardDarkMode";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const location = useLocation();
  
  const navItems = [
    { title: "Home", icon: <HiOutlineHome />, path: "/dashboard/home" },
    { title: "Word List", icon: <IoText />, path: "/dashboard/wordlist" },
    { title: "Users", icon: <FiEdit />, path: "/dashboard/users" },
    { title: "Organization", icon: <CgOrganisation />, path: "/dashboard/organizations" },
  ];
  const ArrowIcon = isSidebarOpen ? MdKeyboardArrowLeft : MdKeyboardArrowRight;
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={`relative flex flex-col h-full p-4 pt-8 bg-grayBg dark:bg-black transition-width duration-300 ${isSidebarOpen ? 'w-60' : 'w-20'}`}>
      <ArrowIcon
  onClick={() => setSidebarOpen(!isSidebarOpen)}
  className="absolute bottom-1/3 -right-2 w-5 h-5 cursor-pointer text-white bg-global_blue dark:bg-global_orange rounded-full"
/>
        <div className="px-3">
          <img className="w-[30.14px]" src={bookIcon} alt="bookIcon" />
        </div>
        <ul className="mt-10">
          {navItems.map((item, index) => (
            <li 
              key={index} 
              className={`rounded-md hover:bg-global_blue dark:hover:bg-global_orange hover:text-white dark:text-white 
              ${location.pathname === item.path && 'bg-global_blue dark:bg-global_orange text-white'}`}
            >
              <Link to={item.path} className="flex items-center gap-4 mt-2 px-3 py-3">
                <span className="text-2xl">{item.icon}</span>
                <span className={`duration-200 origin-left ${!isSidebarOpen && 'hidden'}`}>
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col   mt-2 items-center justify-center px-3 py-3 rounded-md hover:bg-global_blue dark:hover:bg-transparent">
          <DashboardDarkMode isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="absolute bottom-16 rounded-md">
          <Link to="/dashboard/settings" className="flex items-center gap-4 px-3 py-3">
            <FiSettings className="text-2xl" />
            <span className={`duration-200 origin-left ${!isSidebarOpen && 'hidden'}`}>
              Settings
            </span>
          </Link>
        </div>
      </aside>

      <div className="  flex-1 overflow-hidden">
        <nav className="  flex items-center justify-end gap-3 py-4 pr-10 bg-grayBg dark:bg-black">
          <div className="w-10 h-10 cursor-pointer flex items-center justify-center text-xl bg-faded_global_blue dark:bg-global_orange text-blueBg dark:text-white rounded-full">
            <FaUser onClick={() => setShowLogoutModal(!showLogoutModal)} />
          </div>
          {
            showLogoutModal && ( <div className=" px-3 py-2  rounded-sm dark:text-white dark:border-none shadow-lg border-[1px] border-gray-300 bg-white dark:bg-darkBg ">

              <button className="flex items-center gap-1 text-sm font-semibold"> <FiLogOut className="text-lg " /> LogOut</button>
            </div>)
          }
        </nav>
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
