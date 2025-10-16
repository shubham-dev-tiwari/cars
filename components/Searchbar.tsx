// Searchbar.tsx - With interactive animations
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SearchManufacturer from "./SearchManufacturer";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <motion.button
    type="submit"
    className={`-ml-3 z-10 ${otherClasses}`}
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
  >
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain"
    />
  </motion.button>
);

const SearchBar = () => {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <motion.form
      className="searchbar relative"
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="searchbar__item bg-white rounded-2xl shadow-lg p-4"
        animate={{
          boxShadow: isFocused
            ? "0 20px 60px rgba(59, 130, 246, 0.3)"
            : "0 10px 30px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.3 }}
      >
        <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </motion.div>

      <motion.div
        className="searchbar__item relative mt-4 bg-white rounded-2xl shadow-lg p-4"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        whileFocus={{ scale: 1.02 }}
      >
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Search car model..."
          className="searchbar__input pl-12 w-full outline-none text-gray-700"
        />
        <SearchButton otherClasses="sm:hidden" />

        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <SearchButton otherClasses="max-sm:hidden" />
    </motion.form>
  );
};

export default SearchBar;
