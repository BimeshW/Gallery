import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AuthDialog from "../components/AuthDialog";
import Introduction from "../components/Introduction";
import { useAuthStore } from "../store/auth.store";
import { useImageStore } from "../store/image.store";
import Images from "../components/Images";

const Homepage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [authDialogType, setAuthDialogType] = useState<"sign-up" | "sign-in">(
    "sign-up"
  );
  const { currUser } = useAuthStore();
  const { fetchImages, images } = useImageStore();
  console.log(images);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="w-full min-h-screen overflow-hidden">
      <Navbar
        setIsDialogOpen={setIsDialogOpen}
        setAuthDialogType={setAuthDialogType}
      />
      <AuthDialog
        isDialogOpen={isDialogOpen}
        type={authDialogType}
        setIsDialogOpen={setIsDialogOpen}
      />
      {currUser && <Images images={images} />}
      {!currUser && <Introduction setIsDialogOpen={setIsDialogOpen} />}
    </div>
  );
};

export default Homepage;
