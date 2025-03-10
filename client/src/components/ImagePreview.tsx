import React, { SetStateAction, useEffect, useRef } from "react";

interface Props {
  currentPreviewImage: string;
  isPreviewClicked: boolean;
  setIsPreviewClicked: React.Dispatch<SetStateAction<boolean>>; // Add this prop to control visibility
}

const ImagePreview = ({ currentPreviewImage, setIsPreviewClicked }: Props) => {
  const previewRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        previewRef.current &&
        !previewRef.current.contains(event.target as Node)
      ) {
        setIsPreviewClicked(false); // Hide preview when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <img
        ref={previewRef}
        src={currentPreviewImage}
        alt="currentPrevImg"
        className="h-[99%] z-50 cursor-pointer w-auto max-lg:h-[90%]"
      />
    </div>
  );
};

export default ImagePreview;
