import bookIcon from "@assets/iconoir_book.svg";
import navMenuIcon from "@assets/navMenuIcon.svg";
import React, { useState } from "react";
import DarkMode from "./DarkMode";
import Dropdown from "./Dropdown";
import Modal from "./modal";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [passwordVisible, setPasswordVisible] = useState(false);  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div className="flex h-8 w-[326px] items-center justify-between gap-26 md:h-tabletHeight md:w-[689px] lg:w-[736.99px]">
      <img
        className="h-[31.56px] w-[28.05px] md:h-tabletHeight md:w-[32px]"
        src={bookIcon}
        alt="book"
      />
      <div className="flex h-8 items-center gap-6 md:w-[275px] md:gap-2 lg:w-[306.99px] lg:h-[43px] lg:justify-end">
        <div className="hidden md:block lg:w-[120px]">
          <Dropdown />
        </div>
        <span className="block h-8 w-[1px] bg-grayBg md:mr-2 lg:mr-2"></span>
        <DarkMode />
        <button
          className="hidden h-[43px] w-[84px] items-center dark:bg-orange justify-center rounded-2xl bg-[#298DFF] text-white md:flex"
          onClick={openModal}
        >
          <span className="text-base   font-medium text-center">Log In</span>
        </button>
        <img
          className="h-[18.68px] text-[#000000] md:hidden"
          src={navMenuIcon}
          alt="navMenuIcon"
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-textGrey mb-4 text-center text-2xl  ">
          Log In
        </h2>
        <form className="text-textGrey">
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium py-1">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-[356px] h-[50px] rounded-2xl dark:bg-darkBg border-[0.5px] custom-placeholder p-4"
              placeholder="wadewarren@amalitech.org"
            />
          </div>

          <div className="mb-5 relative">
            <label htmlFor="password" className="block text-sm font-medium py-1">
              Password:
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                className="w-[356px] h-[50px] dark:bg-darkBg rounded-2xl border-[0.5px] custom-placeholder p-4 pr-10"
                placeholder="*********"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 text-textGrey dark:bg-darkBg rounded-full text-sm font-medium custom-checkbox" />
              Remember Me
            </label>
            <a href="#" className="text-blueBg text-sm dark:text-orange font-medium hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-[356px] h-[50px] rounded-2xl bg-blueBg dark:bg-orange px-4 py-2 text-white"
          >
            Log In
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default NavBar;