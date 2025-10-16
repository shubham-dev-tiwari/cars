// CarCard.tsx - Enhanced with micro-interactions
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <>
      <motion.div
        className="car-card group relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Gradient Border Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0"
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 overflow-hidden">
          {/* Favorite Button with Animation */}
          <motion.button
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <motion.span
              animate={{ scale: isFavorite ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isFavorite ? "❤️" : "🤍"}
            </motion.span>
          </motion.button>

          {/* Popular Badge with Pulse */}
          {Math.random() > 0.7 && (
            <motion.div
              className="absolute top-4 left-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐ Popular
            </motion.div>
          )}

          {/* Car Name with Typing Effect */}
          <div className="car-card__content">
            <h2 className="car-card__content-title text-2xl font-bold text-gray-900">
              {make} {model}
            </h2>
          </div>

          {/* Price with Animated Counter */}
          <motion.div 
            className="flex mt-6 items-baseline gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <motion.span
              className="text-4xl font-extrabold text-primary-blue"
              whileHover={{ scale: 1.1 }}
            >
              ${carRent}
            </motion.span>
            <p className="text-gray-500 font-medium">/day</p>
          </motion.div>

          {/* Car Image with 3D Tilt Effect */}
          <motion.div 
            className="relative w-full h-48 my-6 object-contain"
            animate={{ 
              rotateY: isHovered ? 10 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={generateCarImageUrl(car)}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          {/* Animated Divider */}
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          />

          {/* Car Specs with Stagger Animation */}
          <motion.div 
            className="relative flex w-full mt-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[
              { icon: "/steering-wheel.svg", value: transmission === "a" ? "Automatic" : "Manual" },
              { icon: "/tire.svg", value: drive.toUpperCase() },
              { icon: "/gas.svg", value: `${city_mpg} MPG` }
            ].map((spec, index) => (
              <motion.div
                key={index}
                className="flex flex-col justify-center items-center gap-2 flex-1"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={spec.icon}
                    width={24}
                    height={24}
                    alt={`${index}`}
                  />
                </motion.div>
                <p className="text-sm text-gray-700 font-medium">{spec.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button with Ripple Effect */}
          <div className="car-card__btn-container mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CustomButton
                title="View More"
                containerStyles="w-full py-4 rounded-full bg-primary-blue text-white font-bold shadow-md hover:shadow-xl transition-shadow"
                textStyles="text-white text-base font-bold"
                rightIcon="/right-arrow.svg"
                handleClick={() => setIsOpen(true)}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <CarDetails
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            car={car}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CarCard;
