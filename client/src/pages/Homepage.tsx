import { useState } from "react";
import Navbar from "../components/Navbar";
import AuthDialog from "../components/AuthDialog";

const Homepage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [authDialogType, setAuthDialogType] = useState<"sign-up" | "sign-in">(
    "sign-up"
  );

  return (
    <div className="w-full min-h-screen">
      <Navbar
        setIsDialogOpen={setIsDialogOpen}
        setAuthDialogType={setAuthDialogType}
      />
      <div className="w-full h-full relative flex justify-center items-center mt-12 p-2">
        <AuthDialog
          isDialogOpen={isDialogOpen}
          type={authDialogType}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
    </div>
  );
};

export default Homepage;
