import { useEffect, useState } from "react";
import lightModeSwitch from "../assets/lightModeSwitch.svg";
import darkModeSwitch from "../assets/darkModeSwitch.svg";
import darkModeMoon from "../assets/darkModeMoon.svg";
import { MdOutlineLightMode } from "react-icons/md";

interface Props {
  showNav?: boolean;
  isSidebarOpen?:boolean;
}
const DarkMode = ({ showNav ,isSidebarOpen}: Props) => {
  const [theme, setTheme] = useState<string | null>(null);
  useEffect(() => {
    const applyTheme = (theme: string) => {
      setTheme(theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    };
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      applyTheme(storedTheme);
    } else {
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      const newTheme = prefersLight ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  }, []);
 
  const handleSwitchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };
  return (
    <div
    className={`${
      showNav ? "flex" : "hidden"
    } ${isSidebarOpen && ` lg:flex lg:items-center   lg:w-full lg:justify-start  `} md:w-[79.99px]   h-mobileHeight md:flex justify-between md:justify-center items-center gap-4 md:gap-4 lg:gap-3`}
  >
        {showNav ? (
        <>
          
            <p className=" font-semibold">Dark Mode</p>
          <img
            onClick={handleSwitchTheme}
            className="w-10 cursor-pointer h-mobileHeight"
            src={theme === "dark" ? darkModeSwitch : lightModeSwitch}
            alt={
              theme === "dark" ? "Switch to dark mode" : "Switch to light mode"
            }
          />   
        </>
      ) : (
        
        <>
  <img
    onClick={handleSwitchTheme}
    className="w-10 cursor-pointer h-mobileHeight"
    src={theme === "dark" ? darkModeSwitch : lightModeSwitch}
    alt={theme === "dark" ? "Switch to dark mode" : "Switch to light mode"}
  />
   

   {
    theme === "dark"?(<img
      className={ `   w-[19.99px] h-mobileHeight`}
      src={ darkModeMoon }
      alt={"darkModeMoon"}
    />):(<MdOutlineLightMode className=" text-xl" />)
   }

  
</>  
      )}
  </div>
  );
};
export default DarkMode;