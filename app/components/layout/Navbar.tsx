"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "../ui/Modal";
import WaitlistForm from "../ui/WaitlistForm";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 border-b border-white/25 w-full">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-700">
          Briefo<span className="text-slate-800">.ai</span>
        </Link>

        {/* Menu */}
        <ul
          className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:h-full max-md:w-full max-md:z-50 max-md:bg-white/80 max-md:backdrop-blur
          flex flex-col md:flex-row items-center justify-center gap-8 font-medium transition-transform duration-300
          ${open ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
        >
          {["Home", "Features", "Pricing", "Docs"].map((item) => (
            <li key={item}>
              <Link
                href="#"
                onClick={() => setOpen(false)}
                className="hover:text-indigo-600"
              >
                {item}
              </Link>
            </li>
          ))}

          <button
            onClick={() => setOpen(false)}
            className="md:hidden bg-gray-800 text-white p-2 rounded-md"
          >
            ✕
          </button>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          ☰
        </button>

        {/* CTA */}
        <button
          onClick={handleOpenModal}
          className="max-md:hidden px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-full"
        >
          Join Waitlist
        </button>
      </nav>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Join the Waitlist
          </h2>
          <p className="text-slate-600 mb-6">
            Be the first to experience Briefo.ai and get early access to our platform.
          </p>
          <WaitlistForm onSuccess={handleCloseModal} />
        </div>
      </Modal>
    </>
  );
}
