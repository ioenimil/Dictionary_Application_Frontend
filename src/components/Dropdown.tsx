import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const fontOptions = [
  { name: "San Serif", value: "san-serif" },
  { name: "Cursive", value: "cursive" },
  { name: "Mono", value: "monospace" },
];

const Dropdown = () => {
  const [selectedFont, setSelectedFont] = useState<string>("Sans Serif");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  const handleFontSelection = (fontValue: string, fontName: string): void => {
    setSelectedFont(fontName);
    document.querySelector("body")?.style.setProperty("font-family", fontValue);
    setIsOpen(false);
  };

  // Function to handle clicks outside of the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside of the dropdown
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderFontOption = (fontValue: string, fontName: string) => (
    <div
      key={fontValue}
      onClick={() => handleFontSelection(fontValue, fontName)}
      className="p-2 font-bold dark:hover:text-orange hover:text-blue-600 cursor-pointer"
    >
      {fontName}
    </div>
  );

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div
        className="p-2 flex items-center justify-between border-none font-bold w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedFont}
        {isOpen ? (
          <IoIosArrowUp className="text-gray-500 dark:text-global_orange" />
        ) : (
          <IoIosArrowDown className="text-gray-500 dark:text-global_orange" />
        )}
      </div>

      {/* Dropdown with delay animation */}
      <div
        className={`absolute left-0 right-0 mt-2 py-3 px-3 lg:w-[180px] rounded-2xl bg-white dark:bg-darkBg shadow-lightMode dark:shadow-darkMode z-10 transform transition-all duration-300 ease-out 
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        {fontOptions.map((font) => renderFontOption(font.value, font.name))}
      </div>
    </div>
  );
};

export default Dropdown;
