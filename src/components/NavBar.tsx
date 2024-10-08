import bookIcon from "@assets/iconoir_book.svg";
import navMenuIcon from "@assets/navMenuIcon.svg";
import React, { useState } from "react";
import DarkMode from "./DarkMode";
import Dropdown from "./Dropdown";
import Modal from "./modal";

const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex h-8 w-[326px] items-center justify-between gap-2 md:h-tabletHeight md:w-[689px] lg:w-[736.99px]">
      <img
        className="h-[31.56px] w-[28.05px] md:h-tabletHeight md:w-[32px]"
        src={bookIcon}
        alt="book"
      />
      <div className="flex h-8 items-center md:w-[275px] md:gap-2 lg:w-[270px] lg:justify-end">
        <div className="hidden md:block lg:w-[120px]">
          <Dropdown />
        </div>
        <span className="block h-8 w-[1px] bg-grayBg md:mr-2 lg:mr-2"></span>
        <DarkMode />

        <button
          className="hidden h-[45px] w-[84px] items-center justify-center rounded bg-[#298DFF] text-white md:flex"
          onClick={openModal}
        >
          <span className="text-base font-medium">Log In</span>
        </button>
        <img
          className="h-[18.68px] text-[#000000] md:hidden"
          src={navMenuIcon}
          alt="navMenuIcon"
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-textGrey mb-4 text-center text-2xl font-bold">
          Log In
        </h2>
        <form className="text-textGrey">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-md border px-4 py-2"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full rounded-md border px-4 py-2"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default NavBar;
