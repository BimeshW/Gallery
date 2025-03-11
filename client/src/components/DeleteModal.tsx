import React, { SetStateAction } from "react";
import { motion } from "framer-motion";

interface Props {
  setIsDeleteModalOpen: React.Dispatch<SetStateAction<boolean>>;
  popupCancelRef: React.RefObject<HTMLButtonElement | null>;
  popupConfirmRef: React.RefObject<HTMLButtonElement | null>;
  handleImageDelete: () => void;
}

const DeleteModal = ({
  setIsDeleteModalOpen,
  popupCancelRef,
  popupConfirmRef,
  handleImageDelete,
}: Props) => {
  return (
    <motion.div
      className="w-[28rem] z-50 h-48 absolute backdrop-blur-xl rounded-md overflow-hidden"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div className="p-4 md:p-5 text-center">
        <svg
          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this Image?
        </h3>
        <button
          type="button"
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          ref={popupConfirmRef}
          onClick={handleImageDelete}
        >
          Yes, I'm sure
        </button>
        <button
          type="button"
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => setIsDeleteModalOpen(false)}
          ref={popupCancelRef}
        >
          No, cancel
        </button>
      </div>
    </motion.div>
  );
};

export default DeleteModal;
