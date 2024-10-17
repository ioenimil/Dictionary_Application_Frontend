import React, { useEffect, useRef } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface DropdownProps {
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const RenderDropdown: React.FC<DropdownProps> = ({
  index,
  onEdit,
  onDelete,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 h-[86px] w-[99px] gap-2 rounded-md bg-white shadow-logInShadow dark:bg-black dark:shadow-darkMode"
    >
      <button
        onClick={onEdit}
        className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-global_blue hover:text-white dark:text-white dark:hover:bg-orange"
      >
        <MdModeEdit className="mr-2 inline-block" />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-global_blue hover:text-white dark:text-white dark:hover:bg-orange"
      >
        <MdDelete className="mr-2 inline-block" />
        Delete
      </button>
    </div>
  );
};

export default RenderDropdown;
