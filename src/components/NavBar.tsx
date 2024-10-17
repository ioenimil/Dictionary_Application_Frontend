import bookIcon from "@assets/iconoir_book.svg";
import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Dropdown from "./Dropdown";
import Modal from "./modal";
import DarkMode from "./DarkMode";
import { IoMdMenu } from "react-icons/io";
import SideNav from "./SideNav";

const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const [showNav, setShowNav] = useState<boolean>(false);
  const handleShowNav = () => {
    setShowNav(true);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <div className="  relative gap-26 mt-8 w-[326px] h-10 md:w-[689px] md:h-tabletHeight lg:w-[736.99px] flex items-center justify-between">
      <img
        className="w-[28.05px] h-[31.56px] md:w-[32px] md:h-tabletHeight"
        src={bookIcon}
        alt="book"
      />
      <div className="  md:w-[275px] lg:w-[310px] h-8 flex items-center lg:justify-end md:gap-2">
        <div className="md:w-[120px] hidden md:block">
          <Dropdown />
        </div>
        <span className= " hidden w-[1px] md:mr-2 lg:mr-2 h-8 bg-grayBg md:block"></span>
        <DarkMode showNav={showNav} />
        <button
          className="hidden h-[43px] w-[84px] items-center justify-center rounded-2xl bg-[#298DFF] text-white dark:bg-orange md:flex"
          onClick={openModal}
        >
          <span className="text-center text-base font-medium">Log In</span>
        </button>
        {!showNav && (          
           <IoMdMenu onClick={handleShowNav} className="md:hidden dark:text-white cursor-pointer text-2xl text-[#000000]" />
         )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div ref={modalRef}>
          <h2 className="mb-4 text-center text-3xl font-medium text-textGrey">
            Log In
          </h2>
          <form className="text-textGrey">
            <div className="mb-5">
              <label htmlFor="email" className="block py-1 text-sm font-medium">
                Email:
              </label>
              <input
                id="email"
                type="email"
                className="custom-placeholder h-[50px] w-[356px] rounded-2xl border-[0.5px] p-4 dark:bg-darkBg"
                placeholder="wadewarren@amalitech.org"
              />
            </div>

            <div className="relative mb-5">
              <label
                htmlFor="password"
                className="block py-1 text-sm font-medium"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  className="custom-placeholder h-[50px] w-[356px] rounded-2xl border-[0.5px] p-4 pr-10 dark:bg-darkBg"
                  placeholder="****************"
                />
                <button
                  className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="custom-checkbox mr-2 rounded-full text-sm font-medium text-textGrey"
                />
                Remember Me
              </label>
              <a
                href="#"
                className="text-sm font-medium text-blueBg hover:underline dark:text-orange"
              >
                Forgot Password?
              </a>
            </div>

            <button
          className="hidden h-[43px] w-full items-center justify-center rounded-2xl bg-[#298DFF] text-white dark:bg-orange md:flex"
          onClick={openModal}
        >
          <span className="text-center text-base font-medium">Log In</span>
        </button>
          </form>
        </div>
      </Modal>
      {showNav && <SideNav showNav={showNav} setShowNav={setShowNav} />}
    </div>
  );
};

export default NavBar;

