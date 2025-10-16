// Hero.tsx - Enhanced with animations and parallax effects
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CustomButton } from "@components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero relative overflow-hidden min-h-screen">
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="flex xl:flex-row flex-col gap-5 relative z-10 max-w-[1440px] mx-auto pt-36 px-6">
        <motion.div 
          className="flex-1 pt-36 sm:px-16 px-6"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-semibold text-blue-600">🚀 New AI-Powered Features</span>
          </motion.div>

          <motion.h1 
            className="hero__title text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Find, Book, or Rent a Car — 
            <motion.span 
              className="text-primary-blue inline-block"
              animate={{ 
                color: ["#2b59ff", "#06b6d4", "#3b82f6", "#2b59ff"] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              {" "}Quickly & Easily!
            </motion.span>
          </motion.h1>

          <motion.p 
            className="hero__subtitle mt-6 text-gray-600 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Streamline your car rental experience with our effortless booking process. 
            Book your autobot car now. Ride it, chat with AI, or just sit back and relax.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CustomButton
              title="Explore Cars"
              containerStyles="bg-primary-blue text-white rounded-full mt-10 px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
              handleClick={handleScroll}
            />
          </motion.div>

          {/* Stats Animation */}
          <motion.div 
            className="flex gap-8 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { value: "500+", label: "Cars Available" },
              { value: "50K+", label: "Happy Customers" },
              { value: "4.9", label: "Rating" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.h3 
                  className="text-3xl font-bold text-primary-blue"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="xl:flex-[1.5] flex justify-end items-end w-full xl:h-screen relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* 3D-like Car Image with Hover Effect */}
          <motion.div 
            className="relative xl:w-full w-[90%] xl:h-full h-[590px] z-0"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Image 
              src="/hero.png" 
              alt="hero" 
              fill 
              className="object-contain" 
              priority
            />
            
            {/* Floating Elements */}
            <motion.div
              className="absolute top-20 right-20 bg-white rounded-full p-4 shadow-2xl"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <span className="text-2xl">⚡</span>
            </motion.div>

            <motion.div
              className="absolute bottom-32 left-10 bg-white rounded-full p-4 shadow-2xl"
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5 
              }}
            >
              <span className="text-2xl">🚗</span>
            </motion.div>
          </motion.div>

          {/* Background Circles */}
          <div className="hero__image-overlay absolute inset-0" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity 
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
