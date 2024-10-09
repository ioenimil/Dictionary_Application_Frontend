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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFontSelection = (fontValue: string, fontName: string): void => {
    setSelectedFont(fontName);
    document.querySelector("body")?.style.setProperty("font-family", fontValue);
    setIsOpen(false);
    localStorage.setItem("selectedFont", fontName);
    localStorage.setItem("fontValue", fontValue);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const storedFont = localStorage.getItem("selectedFont");
    const storeFontValue = localStorage.getItem("fontValue");
    if (storedFont && storeFontValue) {
      setSelectedFont(storedFont);
      document
        .querySelector("body")
        ?.style.setProperty("font-family", storeFontValue);
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
      <div
        className={`absolute left-0 right-0 mt-2 py-3 px-3 md:w-[150px] lg:w-[180px]  rounded-2xl bg-white dark:bg-darkBg shadow-lightMode dark:shadow-darkMode z-10 transform transition-all duration-300 ease-out 
        ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {fontOptions.map((font) => renderFontOption(font.value, font.name))}
      </div>
    </div>
  );
};

export default Dropdown;
