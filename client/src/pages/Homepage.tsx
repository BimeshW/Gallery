import { useState } from "react";
import Navbar from "../components/Navbar";
import AuthDialog from "../components/AuthDialog";

const Homepage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [authDialogType, setAuthDialogType] = useState<"sign-up" | "sign-in">(
    "sign-up"
  );

  return (
    <div className="w-full min-h-screen relative homepage">
      <Navbar
        setIsDialogOpen={setIsDialogOpen}
        setAuthDialogType={setAuthDialogType}
      />
      <AuthDialog
        isDialogOpen={isDialogOpen}
        type={authDialogType}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default Homepage;
