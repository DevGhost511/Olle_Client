'use client'
import { useState } from "react";

export default function Menu() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    return (
        <div className="flex flex-col items-start justify-start w-full relative">
        {!isMenuOpen ?
          <img className=" cursor-pointer" src="./menu.svg" alt="menu" onClick={() => { toggleMenu() }} /> : <img className=" cursor-pointer" src="./close.svg" alt="menu" onClick={() => { toggleMenu() }} />
        }

        {isMenuOpen && (
          <div className="absolute top-16 left-0 px-1 py-1 bg-white z-50 border-1 border-[#6D5F4C] sm:w-54 w-full">
            <div className="sm:hidden border-(--brand-3) border-b justify-center items-center flex flex-col gap-4 py-4">
              <img src="Logo/mini_logo.svg" alt="mini_logo" />
              <p className="font-Geist text-[#6D5F4C] font-medium text-xl text-center">
                Hi, I am Olle - Your Collectible Expert.
              </p>
            </div>
            <button className="cursor-pointer text-(--black-5) font-Geist font-medium text-2xl sm:text-left text-center w-full border-0 px-4 py-2 hover:bg-[#EFECE0]">
              Dashboard
            </button>
            <button className="cursor-pointer text-(--black-5) font-Geist font-medium text-2xl sm:text-left text-center w-full border-0 px-4 py-2 hover:bg-[#EFECE0]">
              Message Inbox
            </button>
            <button className="cursor-pointer text-(--black-5) font-Geist font-medium text-2xl sm:text-left text-center w-full border-0 px-4 py-2 hover:bg-[#EFECE0]">
              Help
            </button>
            
            


          </div>
        )}

      </div>
    )
}