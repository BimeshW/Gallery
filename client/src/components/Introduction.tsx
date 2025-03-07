import { motion } from "framer-motion";
import React, { SetStateAction } from "react";
import { FaCameraRetro } from "react-icons/fa";

const Introduction = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-white to-indigo-200/50 flex items-center justify-center overflow-hidden">
      {/* Background animations */}
      <motion.div
        className="absolute inset-0 bg-indigo-200/15"
        initial={{ opacity: 0, scale: 1.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{
          duration: 4,
          ease: "easeOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-indigo-300/10"
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 0.5, rotate: -45 }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      {/* Main content */}
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        {/* Heading with word-by-word animation */}
        <motion.h1
          className="text-5xl md:text-7xl font-[Poppins, sans-serif] font-extrabold text-indigo-900 tracking-tight mb-8 drop-shadow-md"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {["Capture", "Your", "Life’s", "Best", "Moments"].map(
            (word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                variants={{
                  hidden: { opacity: 0, y: 60, rotate: 5 },
                  visible: { opacity: 1, y: 0, rotate: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            )
          )}
        </motion.h1>

        {/* Subheading with character animation */}
        <motion.p
          className="text-lg md:text-2xl text-gray-800 font-[Poppins, sans-serif] mb-10 leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.02,
                delayChildren: 0.8,
              },
            },
          }}
        >
          {"Upload your memories and relive the joy of every smile, adventure, and milestone."
            .split("")
            .map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {char}
              </motion.span>
            ))}
        </motion.p>

        {/* Call-to-action with enhanced effects */}
        <motion.div
          className="flex justify-center items-center gap-6"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
        >
          <motion.button
            className="py-4 px-10 bg-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 cursor-pointer relative overflow-hidden"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 12px 24px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsDialogOpen(true)}
          >
            <motion.span
              className="absolute inset-0 bg-indigo-500/30"
              initial={{ scale: 0, x: "-100%" }}
              whileHover={{ scale: 1.5, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <span className="relative z-10">Start Sharing</span>
          </motion.button>
          <motion.span
            whileHover={{ rotate: [0, 360, 0], scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <FaCameraRetro className="text-4xl text-indigo-600 drop-shadow-md" />
          </motion.span>
        </motion.div>
      </div>

      {/* Enhanced decorative floating elements */}
      <motion.div
        className="absolute top-16 left-16 w-20 h-20 bg-indigo-300/25 rounded-full border border-indigo-200/50"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 right-24 w-16 h-16 bg-indigo-400/25 rounded-full border border-indigo-200/50"
        animate={{
          y: [0, 25, 0],
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-14 h-14 bg-indigo-500/20 rounded-full"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default Introduction;
