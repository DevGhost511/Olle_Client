'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/utils";

type MenuProps = {
  collapse: boolean;
}

export default function Menu({ collapse }: MenuProps) {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  useEffect(() => {
    // Check initial login status
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoggedIn(false)
      }
      else {
        setIsLoggedIn(true)
      }
    }
    
    checkLoginStatus()
    
    // Listen for storage changes (when localStorage is modified)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        checkLoginStatus()
      }
    }
    
    // Listen for custom events (for same-tab changes)
    const handleAuthChange = () => {
      checkLoginStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('authChange', handleAuthChange)
    
    // Cleanup listeners
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])
  const handleCollectionsNavigation = () => {
    router.push('/collections');
  };
  const handleWishlistNavigation = () => {
    router.push('/wishlist');
  };
  const handleInboxNavigation = () => {
    router.push('/inbox');
  };
  const handleHelpNavigation = () => {
    router.push('/help');
  };
  const handleAddnewNavigation = () => {
    router.push('/');
  };
  const handleLogout = () => {
    removeAuthToken();
    router.push('/');
  };
  const handleLogin = () => {
    router.push('/login');
  };
  return (
    <div className="flex flex-row items-center justify-between relative w-full">

      {!isMenuOpen ?
        <div className="flex flex-col p-4 justify-center items-center rounded-md hover:bg-(--brand-2)">
          <img className=" cursor-pointer" src="/menu.svg" alt="menu" onClick={() => { toggleMenu() }} /></div> : <div className="flex flex-col p-4 justify-center items-center rounded-md  hover:bg-(--brand-2) "><img className=" cursor-pointer" src="/close.svg" alt="menu" onClick={() => { toggleMenu() }} /></div>
      }

      <img className={`${collapse ? 'hidden' : 'visible'}`} src="/Logo/nano_logo.svg" alt="logo" />

      <div onClick={handleAddnewNavigation} className={` flex justify-center items-center p-4 rounded-lg hover:bg-(--brand-2) cursor-pointer ${collapse ? 'hidden' : 'visible'}`}>
        <img className="w-6 h-6" src="/plus.svg" alt="bell" />
      </div>

      {isMenuOpen && (
        <div className="absolute flex flex-col justify-center items-center top-16 left-0 gap-1 px-1 py-1 bg-white z-50 border-1 border-(--brand-3) rounded-xl sm:w-54 w-full">
          {/* <div className="sm:hidden w-full border-(--brand-3) border-b justify-center items-center flex flex-col gap-4 py-4">
            <img src="/Logo/mini_logo.svg" alt="mini_logo" />
            <p className="font-Geist text-(--brand-6) font-medium text-md text-center">
              Hi, I am Olle - Your Collectible Expert.
            </p>
          </div> */}
          {isLoggedIn && (
            <>
              <button className="flex flex-row gap-4 items-center justify-start  rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
                onClick={() => { toggleMenu(), handleCollectionsNavigation() }}>
                <img src="/menu_icons/items.svg" className="w-6 h-6" alt="items" />
                <p className="flex text-center sm:text-left">Collections</p>
              </button>
              <button className="flex flex-row gap-4 items-center justify-start  rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
                onClick={() => { toggleMenu(), handleWishlistNavigation() }}>
                <img src="/menu_icons/wishlist.svg" className="w-6 h-6" alt="wishlist" />
                <p className="flex text-center sm:text-left">Wishlist</p>
              </button>
              <button className="flex flex-row gap-4 items-center justify-start  rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
                onClick={() => { toggleMenu(), handleInboxNavigation() }}>
                <img src="/menu_icons/notification.svg" className="w-6 h-6" alt="notification" />
                <p className="flex text-center sm:text-left">Message Inbox</p>
              </button>
              {/* Logout Button */}
              <button className="flex flex-row gap-4 items-center justify-start  rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
                onClick={() => { toggleMenu(), handleLogout() }}>
                <img src="/menu_icons/logout.svg" className="w-6 h-6" alt="logout" />
                <p className="flex text-center sm:text-left">Logout</p>
              </button>
            </>
          )}
          {!isLoggedIn && (
            <button className="flex flex-row gap-4 items-center justify-start  rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
              onClick={() => { toggleMenu(), handleLogin() }}>
              <img src="/menu_icons/login.svg" className="w-6 h-6" alt="login" />
              <p className="flex text-center sm:text-left">Login</p>
            </button>
          )}
          <button className="flex flex-row gap-4 items-center justify-start  rounded-md cursor-pointer text-(--black-5) font-Geist font-medium text-md w-full border-0 px-4 py-2 hover:bg-[#EFECE0]"
            onClick={() => { toggleMenu(), handleHelpNavigation() }}>
            <img src="/menu_icons/help.svg" alt="items" />
            <p className="flex text-center sm:text-left">Help</p>
          </button>
        </div>
      )}

    </div>
  )
}