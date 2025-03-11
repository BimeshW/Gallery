import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AuthDialog from "../components/AuthDialog";
import Introduction from "../components/Introduction";
import { useAuthStore } from "../store/auth.store";
import { useImageStore } from "../store/image.store";
import { AnimatePresence } from "framer-motion";
import ImagePreview from "../components/ImagePreview";
import Images from "../components/Images";

const Homepage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [authDialogType, setAuthDialogType] = useState<"sign-up" | "sign-in">(
    "sign-up"
  );
  const [isPreviewClicked, setIsPreviewClicked] = useState(false);
  const [currentPreviewImage, setCurrentPreviewImage] = useState("");
  const [currentPrevImageId, setCurrentPrevImageId] = useState("");
  console.log(isPreviewClicked, currentPreviewImage);
  const { currUser } = useAuthStore();
  const { fetchImages, images } = useImageStore();
  console.log(images);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      <Navbar
        setIsDialogOpen={setIsDialogOpen}
        setAuthDialogType={setAuthDialogType}
      />
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

      {!currUser && <Introduction setIsDialogOpen={setIsDialogOpen} />}
    </div>
  );
};

export default Homepage;
