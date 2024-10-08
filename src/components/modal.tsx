import React from "react";

interface ModalProps {
  isOpen: boolean;

  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
