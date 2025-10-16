// CarDetails.tsx - Enhanced modal with animations
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { CarProps } from "@types";
import { generateCarImageUrl } from "@utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-3xl bg-white p-6 text-left shadow-2xl transition-all flex flex-col gap-5">
              {/* Close Button with Animation */}
              <motion.button
                type="button"
                className="absolute top-4 right-4 z-10 w-fit p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src="/close.svg"
                  alt="close"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </motion.button>

              {/* Car Images Carousel */}
              <motion.div
                className="flex-1 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={generateCarImageUrl(car)}
                      alt="car model"
                      fill
                      priority
                      className="object-contain"
                    />
                  </motion.div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-3">
                  {["29", "33", "13"].map((angle, index) => (
                    <motion.div
                      key={angle}
                      className="flex-1 relative w-full h-24 bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Image
                        src={generateCarImageUrl(car, angle)}
                        alt="car model"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Car Title with Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-bold text-3xl text-gray-900 capitalize">
                  {car.make} {car.model}
                </h2>
              </motion.div>

              {/* Specifications with Stagger */}
              <motion.div
                className="mt-4 flex flex-wrap gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {Object.entries(car).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="flex justify-between gap-5 w-full bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <h4 className="text-gray-600 capitalize font-medium">
                      {key.split("_").join(" ")}
                    </h4>
                    <p className="text-black-100 font-semibold">{value}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Book Now Button */}
              <motion.button
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Book Now
              </motion.button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default CarDetails;
