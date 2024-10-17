import bookIcon from "@assets/iconoir_book.svg";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { IFormInputs } from "types";
import { getAppTheme } from "../lib/helper";
import DarkMode from "./DarkMode";
import Dropdown from "./Dropdown";
import Modal from "./modal";
import SideNav from "./SideNav";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>();
  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const theme = getAppTheme();
    try {

      const response = await fetch(
        `${import.meta.env.VITE_APP_DICTIONARY_API}api/auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
 
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        reset();
        toast.error(errorData.message || "An error occurred", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Slide,
        });
      }
      const result = await response.json();
      const token = result.data.access_token;

      Cookies.set("token", token, { expires: 7 });
      reset();
      navigate("/dashboard");
    } catch (error: string | any) {
      throw new Error(error.message);
    }
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

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
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <div className="gap-26 relative mt-8 flex h-10 w-[326px] items-center justify-between md:h-tabletHeight md:w-[689px] lg:w-[736.99px]">
      <img
        className="h-[31.56px] w-[28.05px] md:h-tabletHeight md:w-[32px]"
        src={bookIcon}
        alt="book"
      />
      <div className="flex h-8 items-center md:w-[275px] md:gap-2 lg:w-[310px] lg:justify-end">
        <div className="hidden md:block md:w-[120px]">
          <Dropdown />
        </div>
        <span className="hidden h-8 w-[1px] bg-grayBg md:mr-2 md:block lg:mr-2"></span>
        <DarkMode showNav={showNav} />
        <button
          className="hidden h-[43px] w-[84px] items-center justify-center rounded-2xl bg-[#298DFF] text-white dark:bg-orange md:flex"
          onClick={openModal}
        >
          <span className="text-center text-base font-medium">Log In</span>
        </button>
        {!showNav && (
          <IoMdMenu
            onClick={handleShowNav}
            className="cursor-pointer text-2xl text-[#000000] dark:text-white md:hidden"
          />
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div ref={modalRef}>
          <h2 className="mb-4 text-center text-3xl font-medium text-textGrey">
            Log In
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="text-textGrey">
            <div className="mb-5">
              <label htmlFor="email" className="block py-1 text-sm font-medium">
                Email:
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: " Please enter a valid email address",
                  },
                })}
                className={`h-[50px] w-[356px] bg-transparent outline-none focus:outline-none ${errors.email ? "border-global_red" : ""} rounded-2xl border-[0.5px] p-4 dark:bg-darkBg`}
                placeholder="wadewarren@amalitech.org"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-global_red">
                  {errors.email.message}
                </p>
              )}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be six or more characters",
                    },
                  })}
                  className={`custom-placeholder h-[50px] w-[356px] rounded-2xl outline-none ${errors.password ? "border-global_red" : ""} border-[0.5px] p-4 pr-10 dark:bg-darkBg`}
                  placeholder="****************"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-global_red">
                  {errors.password.message}
                </p>
              )}
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
              className="h-[43px] w-full items-center justify-center rounded-2xl bg-[#298DFF] text-white dark:bg-global_orange md:flex"
              type="submit"
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
