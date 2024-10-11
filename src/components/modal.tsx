import arrowBack from "@assets/Layer 2.svg";
import React from "react";

interface ModalProps {
  isOpen: boolean;

  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="relative h-[452px] w-[402px] rounded-xl bg-white shadow-logInShadow dark:bg-darkBg dark:shadow-darkMode">
        <div className="ml-6 mt-10 h-[348px] w-[356px] gap-4">
          <button
            onClick={onClose}
            className="absolute top-4 text-gray-600 hover:text-gray-800"
          >
            <img src={arrowBack} alt="ArrowBack" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
