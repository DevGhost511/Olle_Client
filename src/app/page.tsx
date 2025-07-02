'use client'

import Menu from "@/components/Menu";
import Snap from "@/components/Snap";
import { useState } from "react";



export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col sm:max-w-6xl w-screen h-screen py-4 sm:py-12 px-6 sm:px-12  mx-auto">
      <Menu collapse={true} />
      <div className="flex-1 flex flex-col items-around justify-between sm:justify-center sm:gap-40 w-full h-full lg:px-60 md:px-20 sm:px-6 pt-16 sm:pt-0">
        <div className="flex flex-col items-center justify-start gap-4">
          <img src="Logo/Logo.svg" alt="Logo" />
          <p className="font-Geist text-(--brand-6) font-medium text-xl text-center">
            Hi, I am Olle <br/>- Your Collectible Expert.
          </p>
        </div>
        <Snap />
      </div>

    </div>

  );
}
