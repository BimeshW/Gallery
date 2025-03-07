import { AnimatePresence } from "motion/react";
import { AuthDialogTypes } from "../types/types";
import { motion } from "motion/react";
import { FaBattleNet } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { Spinner } from "@heroui/spinner";

const AuthDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  type,
}: AuthDialogTypes) => {
  const { signIn, signUp, fetchUser, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    passcode: "",
    profilePicture: "",
  });

  const imgRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      setFormData(() => ({ ...formData, profilePicture: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (type === "sign-in") {
      await signIn(formData);
      setIsDialogOpen(false);
      await fetchUser();
    } else {
      await signUp(formData);
      setIsDialogOpen(false);
      setFormData({
        username: "",
        passcode: "",
        profilePicture: "",
      });
    }
  };

  return (
    <AnimatePresence initial={false}>
      {isDialogOpen ? (
        <motion.div
          className={`w-[28rem] rounded-xl shadow-xl bg-gray-50/95 transition-all duration-150 ${
            type === "sign-up" ? "h-[32rem]" : "h-[22rem]"
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-center font-semibold mt-6 text-2xl text-indigo-900 font-[Poppins, sans-serif] tracking-wide">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>

          {/* form section */}
          <form
            className="flex flex-col gap-8 items-center p-8 rounded-b-xl bg-gradient-to-b from-white to-indigo-50/30 border-t border-indigo-100/50 max-w-md mx-auto "
            onSubmit={handleSubmit}
          >
            {type === "sign-up" && (
              <div className="w-28 h-28 mt-2 relative cursor-pointer group hover:scale-102 transition-transform duration-200">
                <img
                  src={
                    formData.profilePicture ||
                    "https://i.pinimg.com/736x/b7/07/8a/b7078a6b41ed574d94b0e73fde7ce08f.jpg"
                  }
                  className="rounded-full object-cover border-2 border-indigo-200 shadow-sm"
                />
                <motion.span
                  className="absolute z-50 bottom-0 right-0 bg-indigo-100 p-2 rounded-full shadow-md hidden group-hover:flex items-center justify-center transition-all duration-150"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaEdit
                    className="text-lg text-indigo-600"
                    onClick={() => imgRef.current?.click()}
                  />
                  <input
                    hidden
                    type="file"
                    ref={imgRef}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </motion.span>
              </div>
            )}
            <motion.div className="flex items-center gap-2 cursor-pointer">
              <h5 className="font-medium text-2xl text-indigo-800 font-[Poppins, sans-serif] tracking-tight drop-shadow-sm">
                Memora
              </h5>
              <motion.span
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <FaBattleNet className="text-3xl text-indigo-600 drop-shadow-sm" />
              </motion.span>
            </motion.div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex gap-2 items-center border border-indigo-200/70 px-4 py-3 bg-white rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-400/50 transition-all duration-200">
                <FaUserAlt className="text-indigo-500 text-base" />
                <input
                  id="username"
                  placeholder="Username"
                  className="border-none focus:outline-none text-sm text-gray-800 w-full bg-transparent font-[Poppins, sans-serif]"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2 items-center border border-indigo-200/70 px-4 py-3 bg-white rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-400/50 transition-all duration-200">
                <RiLockPasswordFill className="text-indigo-500 text-base" />
                <input
                  placeholder="Passcode"
                  className="border-none focus:outline-none text-sm text-gray-800 w-full bg-transparent font-[Poppins, sans-serif]"
                  onChange={(e) =>
                    setFormData({ ...formData, passcode: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              className="py-3 px-10 flex items-center gap-2 rounded-lg font-medium text-sm cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              type="submit"
              disabled={loading}
            >
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {!loading && type === "sign-in" ? "Sign In" : "Sign Up"}
              </motion.span>
              {loading && (
                <Spinner
                  classNames={{ label: "text-foreground mt-4" }}
                  variant="gradient"
                  size="sm"
                />
              )}
            </button>
          </form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default AuthDialog;
