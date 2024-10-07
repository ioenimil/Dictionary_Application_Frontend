import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const fontOptions = [
  { name: "San Serif", value: "san-serif" },
  { name: "Serif", value: "serif" },
  { name: "Mono", value: "monospace" },
];
const Dropdown = () => {
  const [selectedFont, setSelectedFont] = useState<string>("Sans Serif");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFontSelection = (fontValue: string,fontName:string): void => {
    setSelectedFont(fontName);
    document.querySelector("body")?.style.setProperty("font-family", fontValue);
    setIsOpen(false);
  };

  const renderFontOption = (fontValue: string,fontName:string) => (
    <div
      key={fontValue}
      onClick={() => handleFontSelection(fontValue,fontName)}
      className="p-2 font-bold dark:hover:text-[#FF6500] hover:text-blue-600 cursor-pointer"
    >
      {fontName}
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
          {fontOptions.map((font) => renderFontOption(font.value,font.name))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
