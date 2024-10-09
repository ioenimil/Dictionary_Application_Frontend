import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const fontOptions = [
  { name: "San Serif", value: "san-serif" },
  { name: "Cursive", value: "cursive" },
  { name: "Mono", value: "monospace" },
];

const Dropdown = () => {
  const [selectedFont, setSelectedFont] = useState<string>("San Serif");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFontSelection = (fontValue: string, fontName: string): void => {
    setSelectedFont(fontName);
    document.body.style.setProperty("font-family", fontValue);
    setIsOpen(false);
    localStorage.setItem("selectedFont", fontName);
    localStorage.setItem("fontValue", fontValue);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const storedFont = localStorage.getItem("selectedFont");
    const storedFontValue = localStorage.getItem("fontValue");

    if (storedFont && storedFontValue) {
      setSelectedFont(storedFont);
      document.body.style.setProperty("font-family", storedFontValue);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderFontOption = (fontValue: string, fontName: string) => (
    <div
      key={fontValue}
      onClick={() => handleFontSelection(fontValue, fontName)}
      className="py-2 md:p-2 font-bold dark:hover:text-orange hover:text-blue-600 cursor-pointer"
    >
      {fontName}
    </div>
  );

  return (
    <div className="md:relative inline-block w-full" ref={dropdownRef}>
      <div
        className="md:p-2 border-global_blue dark:border-global_orange border-b-[1px] md:border-none flex items-center justify-between font-bold w-full cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedFont}
        {isOpen ? (
          <IoIosArrowUp className="text-gray-500 dark:text-global_orange" />
        ) : (
          <IoIosArrowDown className="text-gray-500 dark:text-global_orange" />
        )}
      </div>
      {isOpen && ( 
        <div
          className="md:absolute p-0 md:left-0 md:right-0 mt-2 md:py-3 md:px-3 md:w-[150px] lg:w-[180px] md:rounded-2xl md:bg-white md:dark:bg-darkBg md:shadow-lightMode md:dark:shadow-darkMode md:z-10 transform transition-all duration-300 ease-out"
        >
          {fontOptions.map((font) => renderFontOption(font.value, font.name))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
