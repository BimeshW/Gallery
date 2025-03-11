import { motion } from "motion/react";
import React, {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaRegImages } from "react-icons/fa6";
import { useImageStore } from "../store/image.store";
import { ImSpinner6 } from "react-icons/im";

interface Props {
  setIsUploadPopupOpen: React.Dispatch<SetStateAction<boolean>>;
  handleImageUpload: (image: string) => Promise<void>;
}

const UploadModal = ({ setIsUploadPopupOpen, handleImageUpload }: Props) => {
  const uploadRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);
  const [image, setImage] = useState<string>("");
  const { loading } = useImageStore();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        uploadRef.current &&
        !uploadRef.current.contains(event.target as Node) &&
        !uploadButtonRef.current?.contains(event.target as Node)
      ) {
        setIsUploadPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm flex-col"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div
        className="border-2 border-dashed border-gray-500 w-[25rem] h-[25rem] rounded-2xl flex items-center justify-center flex-col overflow-hidden"
        ref={uploadRef}
      >
        {image && <img src={image} className="h-full w-auto" />}
        {!image && (
          <div className="flex items-center justify-center flex-col">
            <FaRegImages
              className="cursor-pointer text-9xl text-gray-300"
              onClick={() => imageRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              aria-hidden
              ref={imageRef}
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>
      <motion.button
        className="mt-6 bg-indigo-500 px-6 py-2 text-white rounded-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleImageUpload(image)}
        ref={uploadButtonRef}
      >
        {!loading ? (
          "Upload"
        ) : (
          <span className="flex items-center gap-1">
            Uploading
            <ImSpinner6 className="animate-spin" />
          </span>
        )}
      </motion.button>
    </motion.div>
  );
};

export default UploadModal;
