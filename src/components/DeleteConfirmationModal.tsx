import React from "react";
import { ImBin } from "react-icons/im";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // Check if the click is on the overlay (outside of the modal content)
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick} // Attach the click handler
    >
      <div className="h-[379.05px] w-[478px] rounded-lg bg-white p-6 shadow-md dark:bg-black">
        <ImBin className="mx-auto h-[184.25px] w-[151.65px]" />

        <p className="mb-8 text-center text-textBlack dark:text-white">
          Are you sure you want to delete this word?
        </p>
        <div className="flex justify-evenly gap-4">
          <button
            className="h-[46px] w-[150px] rounded border border-textGrey bg-white px-4 py-2 font-semibold text-black hover:bg-lightGrey dark:border-white dark:bg-darkBg dark:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="h-[46px] w-[150px] rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
