import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { FiEdit, FiLogOut, FiSettings } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import bookIcon from "../assets/iconoir_book.svg";
import DashboardDarkMode from "./DashboardDarkMode";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // remove cookies
    Cookies.remove("token");

    //redirect to login page
    navigate("/");
  };

  const navItems = [
    { title: "Home", icon: <HiOutlineHome />, path: "/dashboard" },
    { title: "Word List", icon: <IoText />, path: "/dashboard/wordlist" },
    { title: "Users", icon: <FiEdit />, path: "/dashboard/users" },
    {
      title: "Organization",
      icon: <CgOrganisation />,
      path: "/dashboard/organizations",
    },
  ];
  const ArrowIcon = isSidebarOpen ? MdKeyboardArrowLeft : MdKeyboardArrowRight;

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`transition-width relative flex h-full flex-col bg-grayBg p-4 pt-8 duration-300 dark:bg-black ${isSidebarOpen ? "w-60" : "w-20"}`}
      >
        <ArrowIcon
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute -right-2 bottom-1/3 h-5 w-5 cursor-pointer rounded-full bg-global_blue text-white dark:bg-global_orange"
        />
        <div className="px-3">
          <img className="w-[30.14px]" src={bookIcon} alt="bookIcon" />
        </div>
        <ul className="mt-10">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`rounded-md hover:bg-global_blue hover:text-white dark:text-white dark:hover:bg-global_orange ${location.pathname === item.path && "bg-global_blue text-white dark:bg-global_orange"}`}
            >
              <Link
                to={item.path}
                className="mt-2 flex items-center gap-4 px-3 py-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <span
                  className={`origin-left duration-200 ${!isSidebarOpen && "hidden"}`}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex flex-col items-center justify-center rounded-md px-3 py-3 hover:bg-global_blue dark:hover:bg-transparent">
          <DashboardDarkMode isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="absolute bottom-16 rounded-md">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-4 px-3 py-3"
          >
            <FiSettings className="text-2xl" />
            <span
              className={`origin-left duration-200 ${!isSidebarOpen && "hidden"}`}
            >
              Settings
            </span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 overflow-hidden">
        <nav className="flex items-center justify-end gap-3 bg-grayBg py-4 pr-10 dark:bg-black">
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-faded_global_blue text-xl text-blueBg dark:bg-global_orange dark:text-white">
            <FaUser onClick={() => setShowLogoutModal(!showLogoutModal)} />
          </div>
          {showLogoutModal && (
            <div className="rounded-sm border-[1px] border-gray-300 bg-white px-3 py-2 shadow-lg dark:border-none dark:bg-darkBg dark:text-white">
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm font-semibold"
              >
                {" "}
                <FiLogOut className="text-lg" /> LogOut
              </button>
            </div>
          )}
        </nav>
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
