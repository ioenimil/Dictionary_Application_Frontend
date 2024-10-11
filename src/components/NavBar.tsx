import bookIcon from "@assets/iconoir_book.svg";
import navMenuIcon from "@assets/navMenuIcon.svg";
import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DarkMode from "./DarkMode";
import Dropdown from "./Dropdown";
import Modal from "./modal";

const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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
    <div className="gap-26 flex h-8 w-[326px] items-center justify-between md:h-tabletHeight md:w-[689px] lg:w-[736.99px]">
      <img
        className="h-[31.56px] w-[28.05px] md:h-tabletHeight md:w-[32px]"
        src={bookIcon}
        alt="book"
      />
      <div className="flex h-8 items-center gap-6 md:w-[275px] md:gap-2 lg:h-[43px] lg:w-[306.99px] lg:justify-end">
        <div className="hidden md:block lg:w-[120px]">
          <Dropdown />
        </div>
        <span className="block h-8 w-[1px] bg-grayBg md:mr-2 lg:mr-2"></span>
        <DarkMode />
        <button
          className="hidden h-[43px] w-[84px] items-center justify-center rounded-2xl bg-[#298DFF] text-white dark:bg-orange md:flex"
          onClick={openModal}
        >
          <span className="text-center text-base font-medium">Log In</span>
        </button>
        <img
          className="h-[18.68px] text-[#000000] md:hidden"
          src={navMenuIcon}
          alt="navMenuIcon"
        />
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
              type="submit"
              className="h-[50px] w-[356px] rounded-2xl bg-blueBg px-4 py-2 text-white dark:bg-orange"
            >
              Log In
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NavBar;
