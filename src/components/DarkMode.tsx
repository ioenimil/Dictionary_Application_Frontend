import { useEffect, useState } from "react";
import lightModeSwitch from "../assets/lightModeSwitch.svg";
import darkModeSwitch from "../assets/darkModeSwitch.svg";
import darkModeMoon from "../assets/darkModeMoon.svg";
import lightModeMoon from "../assets/lightModeMoon.svg";

const DarkMode = () => {
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
      console.log(prefersLight);
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
    <div className=" hidden  w-[79.99px]  h-mobileHeight md:flex items-center md:gap-4 lg:gap-3">
      <img
        onClick={handleSwitchTheme}
        className="w-10 cursor-pointer h-mobileHeight"
        src={theme === "dark" ? darkModeSwitch : lightModeSwitch}
        alt={theme === "dark" ? "Switch to dark mode" : "Switch to light mode"}
      />
      <img
        className="w-[19.99px]  h-mobileHeight]"
        src={theme === "dark" ? darkModeMoon : lightModeMoon}
        alt={theme === "dark" ? "darkModeMoon" : "lightModeMoon"}
      />
    </div>
  );
};
export default DarkMode;
