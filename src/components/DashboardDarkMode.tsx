import { useEffect, useState } from "react";
import lightModeSwitch from "../assets/lightModeSwitch.svg";
import darkModeSwitch from "../assets/darkModeSwitch.svg";
import darkModeMoon from "../assets/darkModeMoon.svg";
import { MdOutlineLightMode } from "react-icons/md";
interface Props {
  isSidebarOpen: boolean;
}
const DashboardDarkMode = ({ isSidebarOpen }: Props) => {
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
        "(prefers-color-scheme: light)",
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
      className={`${isSidebarOpen ? `lg:flex lg:w-full lg:items-center lg:justify-start` : ``} h-mobileHeight items-center justify-between gap-4 md:flex md:w-[79.99px] md:justify-center md:gap-4 lg:gap-3`}
    >
      <img
        onClick={handleSwitchTheme}
        className="h-mobileHeight w-10 cursor-pointer"
        src={theme === "dark" ? darkModeSwitch : lightModeSwitch}
        alt={theme === "dark" ? "Switch to dark mode" : "Switch to light mode"}
      />
      {isSidebarOpen && <p>Dark Mode</p>}
      {isSidebarOpen &&
        (theme === "dark" ? (
          <img
            className="h-mobileHeight w-[19.99px]"
            src={darkModeMoon}
            alt="darkModeMoon"
          />
        ) : (
          <MdOutlineLightMode className="text-xl" />
        ))}
    </div>
  );
};
export default DashboardDarkMode;
