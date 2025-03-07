import { MdVerified } from "react-icons/md";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { motion } from "motion/react";
import { NavbarProps } from "../types/types";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { FaBattleNet } from "react-icons/fa";

const Navbar = ({ setIsDialogOpen, setAuthDialogType }: NavbarProps) => {
  const { currUser, fetchUser, signOut } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <nav className="w-full h-16 border-b border-gray-200 flex items-center justify-between">
      <motion.div className="flex items-center gap-2 cursor-pointer">
        <h5 className="font-medium text-xl text-indigo-700 tracking-tight drop-shadow-sm ml-8">
          Memora
        </h5>
        <motion.span
          whileHover={{ rotate: 180, scale: 1.2 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <FaBattleNet className="text-3xl text-indigo-600 drop-shadow-sm" />
        </motion.span>
      </motion.div>

      {currUser && (
        <div className="mr-12 flex items-center gap-2 cursor-pointer max-sm:mr-4">
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
            onClick={signOut}
            whileHover={{ scale: 1.1 }}
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
