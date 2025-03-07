import { useState } from "react";
import Navbar from "../components/Navbar";
import AuthDialog from "../components/AuthDialog";
import Introduction from "../components/Introduction";

const Homepage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [authDialogType, setAuthDialogType] = useState<"sign-up" | "sign-in">(
    "sign-up"
  );

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
      <Introduction setIsDialogOpen={setIsDialogOpen} />
    </div>
  );
};

export default Homepage;
