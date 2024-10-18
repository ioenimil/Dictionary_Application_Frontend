import { useEffect, useRef, useState } from "react";
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
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
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
      className={`cursor-pointer py-2 font-bold hover:text-blue-600 dark:hover:text-orange md:p-2 ${selectedFont === fontName ? "text-blue-600 dark:text-orange" : "text-black dark:text-white"}`}
    >
      {fontName}
    </div>
  );
  return (
    <div className="inline-block w-full md:relative" ref={dropdownRef}>
      <div
        className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-global_blue font-bold dark:border-global_orange md:border-none md:p-2"
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
        <div className="mt-2 transform p-0 transition-all duration-300 ease-out md:absolute md:left-0 md:right-0 md:z-10 md:w-[150px] md:rounded-2xl md:bg-white md:px-3 md:py-3 md:shadow-lightMode md:dark:bg-darkBg md:dark:shadow-darkMode lg:w-[180px]">
          {fontOptions.map((font) => renderFontOption(font.value, font.name))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
