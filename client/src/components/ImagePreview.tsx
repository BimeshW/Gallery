import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "./DeleteModal";
import { useImageStore } from "../store/image.store";

interface Props {
  currentPreviewImage: string;
  isPreviewClicked: boolean;
  setIsPreviewClicked: React.Dispatch<SetStateAction<boolean>>; // Add this prop to control visibility
  currentPrevImageId: string;
}

const ImagePreview = ({
  currentPreviewImage,
  setIsPreviewClicked,
  currentPrevImageId,
}: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const previewRef = useRef<HTMLImageElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const popupCancelRef = useRef<HTMLButtonElement | null>(null);
  const popupConfirmRef = useRef<HTMLButtonElement | null>(null);
  const { deleteImage, fetchImages } = useImageStore();

  const handleImageDelete = async () => {
    await deleteImage(currentPrevImageId);
    setIsPreviewClicked(false);
    fetchImages();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        previewRef.current &&
        !previewRef.current.contains(event.target as Node) &&
        !deleteRef.current?.contains(event.target as Node) &&
        !popupCancelRef.current?.contains(event.target as Node) &&
        !popupConfirmRef.current?.contains(event.target as Node)
      ) {
        setIsPreviewClicked(false); // Hide preview when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <motion.button
        type="button"
        role="delete"
        aria-label="delete"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className=" absolute top-14 right-20"
        ref={deleteRef}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.7 }}
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <RiDeleteBin6Line className="text-2xl text-white" />
      </motion.button>
      {/* delete popup modal */}
      <AnimatePresence initial={false}>
        {isDeleteModalOpen && (
          <DeleteModal
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            popupCancelRef={popupCancelRef}
            popupConfirmRef={popupConfirmRef}
            handleImageDelete={handleImageDelete}
          />
        )}
      </AnimatePresence>
      <img
        ref={previewRef}
        src={currentPreviewImage}
        alt="currentPrevImg"
        className="h-[90%] cursor-pointer w-auto max-lg:h-[85%]"
      />
    </motion.div>
  );
};

export default ImagePreview;
