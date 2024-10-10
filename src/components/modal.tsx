import React from "react";
import arrowBack from "@assets/Layer 2.svg";

interface ModalProps {
  isOpen: boolean;

  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
      <div className="relative rounded-xl  bg-white dark:bg-darkBg dark:shadow-darkMode shadow-logInShadow w-[402px] h-[452px]">
        <div className="w-[356px] h-[348px] ml-6 mt-10 gap-4">
           <button
          onClick={onClose}
          className="absolute top-4 text-gray-600 hover:text-gray-800"
        >
          <img src={arrowBack} alt="ArrowBack"   />
        </button>
        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
