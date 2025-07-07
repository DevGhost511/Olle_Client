'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

type MenuProps = {
  collapse: boolean;
}

export default function Menu({ collapse }: MenuProps) {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();
  const handleInboxNavigation = () => {
    router.push('/inbox');
  };
  const handleDashboardNavigation = () => {
    router.push('/collections');
  };
  const handleHelpNavigation = () => {
    router.push('/help');
  };

  return (
    <div className="flex flex-row items-center justify-between relative w-full">

      {!isMenuOpen ?
        <div className="flex flex-col p-4 justify-center items-center rounded-md hover:bg-(--brand-2)">
          <img className=" cursor-pointer" src="/menu.svg" alt="menu" onClick={() => { toggleMenu() }} /></div> : <div className="flex flex-col p-4 justify-center items-center rounded-md  hover:bg-(--brand-2) "><img className=" cursor-pointer" src="/close.svg" alt="menu" onClick={() => { toggleMenu() }} /></div>
      }

      <img className={`${collapse ? 'hidden' : 'visible'}`} src="/Logo/nano_logo.svg" alt="logo" />

      <div onClick={handleInboxNavigation} className={`flex justify-center items-center px-3 py-3 rounded-lg hover:bg-(--brand-2) cursor-pointer ${collapse ? 'hidden' : 'visible'}`}>
        <img src="/bell.svg" alt="bell" />
      </div>

      {isMenuOpen && (
        <div className="absolute flex flex-col justify-center items-center top-16 left-0 gap-1 px-1 py-1 bg-white z-50 border-1 border-(--brand-3) rounded-xl sm:w-54 w-full">
          <div className="sm:hidden w-full border-(--brand-3) border-b justify-center items-center flex flex-col gap-4 py-4">
            <img src="/Logo/mini_logo.svg" alt="mini_logo" />
            <p className="font-Geist text-(--brand-6) font-medium text-md text-center">
              Hi, I am Olle - Your Collectible Expert.
            </p>
          </div>
          <button className="rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md sm:text-left text-center w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
            onClick={() => { toggleMenu(), handleDashboardNavigation() }}>
            Dashboard
          </button>
          <button className="rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md sm:text-left text-center w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
            onClick={() => { toggleMenu(), handleInboxNavigation() }}>
            Message Inbox
          </button>
          <button className="rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md sm:text-left text-center w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
            onClick={() => { toggleMenu(), handleHelpNavigation() }}>
            Help
          </button>




        </div>
      )}

    </div>
  )
}