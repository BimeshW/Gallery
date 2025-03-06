import { FcStackOfPhotos } from "react-icons/fc";
import { MdVerified } from "react-icons/md";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { motion } from "motion/react";
import { NavbarProps } from "../types/types";
import { Link } from "react-router-dom";

const Navbar = ({ setIsDialogOpen, setAuthDialogType }: NavbarProps) => {
  const { currUser, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <nav className="w-full h-16 border-b border-gray-200 flex items-center justify-between">
      <motion.div className="flex items-center gap-2 ml-12 cursor-pointer max-sm:ml-4">
        <Link to={"/"} className=" font-semibold text-blue-700">
          Memora
        </Link>
        <motion.span whileHover={{ rotate: 200, scale: 1.3 }}>
          <FcStackOfPhotos className="text-xl" />
        </motion.span>
      </motion.div>

      {currUser && (
        <div className="mr-12 flex items-center gap-2 cursor-pointer max-sm:mr-4">
          <img
            src={currUser.profilePicture}
            className="rounded-full w-10 h-10"
            alt="user-profile"
            loading="lazy"
          />
          <p className="text-xs flex items-center">
            <span>
              <MdVerified className="text-blue-500 text-sm" />
            </span>{" "}
            {currUser.username}
          </p>
        </div>
      )}

      {!currUser && (
        <div className="mr-12 flex gap-4 max-sm:mr-4">
          <motion.button
            className="bg-blue-600 px-4 py-2 rounded-md text-xs cursor-pointer text-white font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsDialogOpen(true);
              setAuthDialogType("sign-up");
            }}
          >
            Sign up
          </motion.button>
          <motion.button
            className="bg-green-600 px-4 py-2 rounded-md text-xs cursor-pointer text-white font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsDialogOpen(true);
              setAuthDialogType("sign-in");
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
