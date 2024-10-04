import { useEffect, useState } from "react";

const DarkMode = () => {
  // Initialize the theme state with null, will later be set to "light" or "dark".
  const [theme, setTheme] = useState<string | null>(null);

  // useEffect to detect system theme preference on initial load.
  useEffect(() => {
    // If system prefers light mode, set theme to "light", otherwise "dark".
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark"); // Persist the dark theme to localStorage.
    }
  }, []); // Empty dependency array ensures this runs once on mount.

  // useEffect to check theme from localStorage and apply corresponding class to <html>.
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]); // This runs whenever the theme state changes.

  // Function to toggle between dark and light themes.
  const handleSwitchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark"); // Remove dark class for light mode.
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark"); // Add dark class for dark mode.
    }
  };

  return (
    <div className="w-[79.99px] h-[20px] flex items-center gap-5">
      {/* Toggle between dark and light mode icons based on theme state */}
      {theme === "dark" ? (
        <img
          onClick={handleSwitchTheme}
          className="w-[40px] cursor-pointer h-[20px]"
          src="/darkModeSwitch.svg"
          alt="Switch to light mode"
        />
      ) : (
        <img
          onClick={handleSwitchTheme}
          className="w-[40px] cursor-pointer h-[20px]"
          src="/lightModeSwitch.svg"
          alt="Switch to dark mode"
        />
      )}
      {/* Display respective moon icon based on theme */}
      {theme === "dark" ? (
        <img
          onClick={handleSwitchTheme}
          className="w-[19.99px] cursor-pointer h-[20px]"
          src="/darkModeMoon.svg"
          alt="darkModeMoon"
        />
      ) : (
        <img
          onClick={handleSwitchTheme}
          className="w-[19.99px] cursor-pointer h-[20px]"
          src="/lightModeMoon.svg"
          alt="lightModeMoon"
        />
      )}
    </div>
  );
};

export default DarkMode;
