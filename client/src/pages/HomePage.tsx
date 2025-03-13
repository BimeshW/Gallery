import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AuthDialog from "../components/AuthDialog";
import Introduction from "../components/Introduction";
import { useAuthStore } from "../store/auth.store";
import { useImageStore } from "../store/image.store";
import { AnimatePresence } from "framer-motion";
import ImagePreview from "../components/ImagePreview";
import Images from "../components/Images";
import UploadModal from "../components/UploadModal";

const Homepage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [authDialogType, setAuthDialogType] = useState<"sign-up" | "sign-in">(
    "sign-up"
  );
  const [isPreviewClicked, setIsPreviewClicked] = useState(false);
  const [currentPreviewImage, setCurrentPreviewImage] = useState("");
  const [currentPrevImageId, setCurrentPrevImageId] = useState("");
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

  const { currUser } = useAuthStore();
  const { fetchImages, images, uploadImage } = useImageStore();

  const handleImageUpload = async (image: string) => {
    await uploadImage(image);
    setIsUploadPopupOpen(false);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="w-full min-h-screen overflow-hidden relative bg-black">
      <div className="mb-12">
        <Navbar
          setIsDialogOpen={setIsDialogOpen}
          setAuthDialogType={setAuthDialogType}
          setIsUploadPopupOpen={setIsUploadPopupOpen}
        />
      </div>
      <AuthDialog
        isDialogOpen={isDialogOpen}
        type={authDialogType}
        setIsDialogOpen={setIsDialogOpen}
      />
      {currUser && (
        <Images
          images={images}
          setCurrentPreviewImage={setCurrentPreviewImage}
          setIsPreviewClicked={setIsPreviewClicked}
          setCurrentPrevImageId={setCurrentPrevImageId}
        />
      )}

      <AnimatePresence initial={false}>
        {isPreviewClicked && currentPreviewImage && (
          <ImagePreview
            isPreviewClicked={isPreviewClicked}
            currentPreviewImage={currentPreviewImage}
            setIsPreviewClicked={setIsPreviewClicked}
            currentPrevImageId={currentPrevImageId}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isUploadPopupOpen && (
          <UploadModal
            setIsUploadPopupOpen={setIsUploadPopupOpen}
            handleImageUpload={handleImageUpload}
          />
        )}
      </AnimatePresence>

      {!currUser && <Introduction setIsDialogOpen={setIsDialogOpen} />}
    </div>
  );
};

export default Homepage;
