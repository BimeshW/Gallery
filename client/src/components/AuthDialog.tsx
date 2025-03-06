import { AnimatePresence } from "motion/react";
import { AuthDialogTypes } from "../types/types";
import { motion } from "motion/react";
import { FcStackOfPhotos } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAuthStore } from "../store/auth.store";

const AuthDialog = ({ isDialogOpen, setIsDialogOpen,type }: AuthDialogTypes) => {
  const { signIn, signUp, fetchUser } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    passcode: "",
    image: "",
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
      setFormData(() => ({ ...formData, image: base64 }));
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
    }
  };

  return (
    <AnimatePresence initial={false}>
      {isDialogOpen ? (
        <motion.div
          className={`w-[25rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-md shadow transition-all duration-75 ${
            type === "sign-up" ? "h-[28rem]" : "h-[20rem]"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <h1 className="text-center font-semibold mt-4 text-xl">
            {type == "sign-in" ? "Sign in" : "Sign up"}
          </h1>

          {/* form section */}
          <form
            className="backdrop-blur-3xl flex gap-6 flex-col items-center"
            onSubmit={handleSubmit}
          >
            {type === "sign-up" && (
              <div className="w-24 h-24 mt-6 relative cursor-pointer group hover:opacity-80">
                <img
                  src={
                    formData.image ||
                    "https://i.pinimg.com/736x/b7/07/8a/b7078a6b41ed574d94b0e73fde7ce08f.jpg"
                  }
                  className="rounded-full"
                />
                <motion.span
                  className="absolute z-50 bottom-2 right-3 hidden group-hover:block transition-all"
                  whileHover={{ scale: 1.2 }}
                >
                  <FaEdit
                    className="text-lg"
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
            <motion.div className="flex items-center gap-1 cursor-pointer mt-2">
              <h5 className=" font-semibold text-blue-700 text-lg tracking-tighter">
                Memora
              </h5>
              <motion.span whileHover={{ rotate: 200, scale: 1.3 }}>
                <FcStackOfPhotos className="text-3xl" />
              </motion.span>
            </motion.div>
            <div className="flex gap-2 items-center border border-gray-300 px-4 py-2">
              <FaUserAlt />
              <input
                id="username"
                placeholder="Username"
                className="border-none focus:outline-0 text-xs"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2 items-center border border-gray-300 px-4 py-2">
              <RiLockPasswordFill />
              <input
                placeholder="Passcode"
                className="border-none focus:outline-0 text-xs"
                onChange={(e) =>
                  setFormData({ ...formData, passcode: e.target.value })
                }
              />
            </div>
            <button
              className="bg-blue-600 py-2 px-6 rounded-full text-sm cursor-pointer text-white"
              type="submit"
            >
              {type === "sign-in" ? "Sign in" : "Sign up"}
            </button>
          </form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default AuthDialog;
