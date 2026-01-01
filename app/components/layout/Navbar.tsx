"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Modal from "../ui/Modal";
import WaitlistForm from "../ui/WaitlistForm";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsDrawerOpen(false);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Handle scroll effect for enhanced navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDrawerOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDrawerOpen]);

  return (
    <>
      <nav
        className={`
          sticky top-0 z-[100] 
          flex items-center justify-between 
          px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 
          py-3 sm:py-4 
          bg-white/90 backdrop-blur-md 
          border-b transition-all duration-300
          ${scrolled ? "border-slate-200 shadow-sm" : "border-slate-100"}
        `}
      >
        {/* Logo - Responsive sizing */}
        <Link
          href="/"
          className="relative z-[110] text-xl sm:text-2xl font-bold text-indigo-700 tracking-tight hover:text-indigo-800 transition-colors"
        >
          Briefo<span className="text-slate-900">.ai</span>
        </Link>

        {/* Mobile Menu Button - Enhanced for all screen sizes */}
        <button
          ref={buttonRef}
          onClick={toggleDrawer}
          className="relative z-[110] lg:hidden p-2 sm:p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors active:scale-95"
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={isDrawerOpen}
        >
          {isDrawerOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Backdrop - Mobile/Tablet only */}
        <div
          className={`
            fixed inset-0 bg-white/95 backdrop-blur-md z-[100] 
            transition-opacity duration-300 lg:hidden
            ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />

        {/* Menu - Fully Responsive Drawer/Horizontal */}
        <ul
          ref={menuRef}
          className={`
            flex flex-col lg:flex-row items-center 
            gap-1 lg:gap-6 xl:gap-8 
            font-medium
            
            fixed lg:static 
            top-0 right-0 
            h-screen lg:h-auto 
            w-[280px] sm:w-[320px] lg:w-auto
            bg-white lg:bg-transparent 
            p-6 pt-20 sm:pt-24 lg:p-0
            shadow-2xl lg:shadow-none 
            transition-transform duration-300 ease-in-out 
            z-[105]
            
            ${isDrawerOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          `}
        >
          {["Home", "Features", "Pricing", "Docs"].map((item) => (
            <li key={item} className="w-full lg:w-auto">
              <Link
                href="#"
                onClick={() => setIsDrawerOpen(false)}
                className="
                  block w-full 
                  py-3 sm:py-4 lg:py-2 
                  px-2 lg:px-0
                  text-slate-600 hover:text-indigo-600 
                  transition-colors 
                  text-base sm:text-lg lg:text-base
                  border-b border-slate-50 lg:border-none
                  hover:bg-slate-50 lg:hover:bg-transparent
                  rounded-lg lg:rounded-none
                "
              >
                {item}
              </Link>
            </li>
          ))}

          {/* Mobile/Tablet CTA inside drawer */}
          <li className="w-full mt-6 lg:hidden">
            <button
              onClick={handleOpenModal}
              className="
                w-full 
                py-3 sm:py-4 
                text-white bg-indigo-600 
                hover:bg-indigo-700 
                active:scale-[0.98] 
                transition-all duration-200
                rounded-xl sm:rounded-2xl 
                font-bold 
                shadow-lg shadow-indigo-100
                text-base sm:text-lg
              "
            >
              Join Waitlist
            </button>
          </li>
        </ul>

        {/* Desktop CTA - Large screens only */}
        <button
          onClick={handleOpenModal}
          className="
            hidden lg:block 
            px-5 py-2 xl:px-6 xl:py-2.5 
            text-sm xl:text-base
            text-white bg-indigo-600 
            hover:bg-indigo-700 
            active:scale-95 
            transition-all duration-200
            rounded-full 
            font-semibold 
            shadow-sm hover:shadow-md
          "
        >
          Join Waitlist
        </button>
      </nav>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Join the Waitlist
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
            Be the first to experience Briefo.ai and get early access to our platform.
          </p>
          <WaitlistForm onSuccess={handleCloseModal} />
        </div>
      </Modal>
    </>
  );
}