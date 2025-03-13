import { MdVerified } from "react-icons/md";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { motion } from "framer-motion"; // Fixed import from "motion/react" to "framer-motion"
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
    <nav className="w-full h-16 flex items-center justify-between bg-[#050709] border-b border-gray-800 text-white fixed z-40">
      <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
        <h5 className="font-medium text-xl text-gray-200 tracking-tight drop-shadow-sm ml-8">
          Memora
        </h5>
        <motion.span
          whileHover={{ rotate: 180, scale: 1.2 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <FaBattleNet className="text-3xl text-gray-200 drop-shadow-sm" />
        </motion.span>
      </Link>

      {currUser && (
        <div className="mr-12 flex items-center gap-2 cursor-pointer max-sm:mr-4">
          <motion.button
            className="font-bold text-4xl mr-4 rounded-full text-gray-300 hover:bg-gray-800 hover:text-gray-100"
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
            className="rounded-full w-10 h-10 border-gray-500 border"
            alt="user-profile"
            loading="lazy"
          />
          <p className="text-xs flex items-center text-gray-300">
            <span>
              <MdVerified className="text-gray-400 text-sm" />
            </span>{" "}
            {currUser.username}
          </p>
          <motion.button
            className="h-full border-l border-gray-800 p-2 text-gray-300 hover:text-gray-100"
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
            className="bg-gray-700 px-4 py-2 rounded-md text-xs cursor-pointer text-gray-200 font-semibold hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsDialogOpen(true); // Removed ! operator
              setAuthDialogType("sign-up"); // Removed ! operator
            }}
          >
            Sign up
          </motion.button>
          <motion.button
            className="bg-gray-200 px-4 py-2 rounded-md text-xs cursor-pointer text-black font-semibold hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsDialogOpen(true); // Removed ! operator
              setAuthDialogType("sign-in"); // Removed ! operator
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
