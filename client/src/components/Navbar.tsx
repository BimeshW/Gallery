import { MdVerified } from "react-icons/md";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { motion } from "motion/react";
import { NavbarProps } from "../types/types";
import { IoLogOut } from "react-icons/io5";
import { FaBattleNet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const Navbar = ({
  setIsDialogOpen,
  setAuthDialogType,
  setIsUploadPopupOpen,
}: NavbarProps) => {
  const { currUser, fetchUser, signOut } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className="w-full h-16 bg-gray-100 flex items-center justify-between">
      <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
        <h5 className="font-medium text-xl text-indigo-700 tracking-tight drop-shadow-sm ml-8">
          Memora
        </h5>
        <motion.span
          whileHover={{ rotate: 180, scale: 1.2 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <FaBattleNet className="text-3xl text-indigo-600 drop-shadow-sm" />
        </motion.span>
      </Link>

      {currUser && (
        <div className="mr-12 flex items-center gap-2 cursor-pointer max-sm:mr-4">
          <motion.button
            className="font-bold text-4xl mr-4 rounded-full hover:bg-gray-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            role="button"
            aria-label="Add"
            onClick={() => setIsUploadPopupOpen(true)}
          >
            <GoPlus />
          </motion.button>
          <img
            src={currUser.profilePicture}
            className="rounded-full w-10 h-10 border-indigo-600 border-1"
            alt="user-profile"
            loading="lazy"
          />
          <p className="text-xs flex items-center">
            <span>
              <MdVerified className="text-indigo-600 text-sm" />
            </span>{" "}
            {currUser.username}
          </p>
          <motion.button
            className="h-full border-l p-2"
            onClick={handleSignOut}
            whileHover={{ scale: 1.1 }}
            type="button"
            role="button"
            aria-label="logout"
          >
            <IoLogOut />
          </motion.button>
        </div>
      )}

      {!currUser && (
        <div className="mr-12 flex gap-4 max-sm:mr-4">
          <motion.button
            className="bg-blue-600 px-4 py-2 rounded-md text-xs cursor-pointer text-white font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsDialogOpen!(true);
              setAuthDialogType!("sign-up");
            }}
          >
            Sign up
          </motion.button>
          <motion.button
            className="bg-green-600 px-4 py-2 rounded-md text-xs cursor-pointer text-white font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsDialogOpen!(true);
              setAuthDialogType!("sign-in");
            }}
          >
            Sign in
          </motion.button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
