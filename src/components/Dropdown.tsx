import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const fontOptions = [
  { name: "San Serif", value: "San Serif" },
  { name: "Serif", value: "Serif" },
  { name: "Mono", value: "Mono" },
];

const Dropdown = () => {
  const [selectedFont, setSelectedFont] = useState("San Serif");
  const [isOpen, setIsOpen] = useState(false);

  const handleFontSelection = (font: string): void => {
    setSelectedFont(font);
    document.querySelector("body")?.style.setProperty("font-family", font);
    setIsOpen(false);
  };

  const renderFontOption = (font: string) => (
    <div
      key={font}
      onClick={() => handleFontSelection(font)}
      className="p-2 font-semibold dark:hover:text-[#FF6500] hover:text-blue-600 cursor-pointer"
    >
      {font}
    </div>
  );
  
  return (
    <div className="relative inline-block w-full">
      <div
        className="p-2 flex items-center justify-between border-none font-bold w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedFont}
        {isOpen ? (
          <IoIosArrowUp className="text-gray-500" />
        ) : (
          <IoIosArrowDown className="text-gray-500" />
        )}
      </div>

      {isOpen && (
        <div className="absolute lg:w-[183px] left-0 right-0 mt-2 py-3 px-3 rounded-2xl bg-white dark:bg-darkBg shadow-lightMode dark:shadow-darkMode z-10">
          {fontOptions.map((font) => renderFontOption(font.value))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
