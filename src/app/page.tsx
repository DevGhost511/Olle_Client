'use client'

import Menu from "@/components/Menu";
import Snap from "@/components/Snap";
import { useState } from "react";
import { useRouter } from "next/navigation";




export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isStartChatting, setIsStartChatting] = useState<boolean>(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleIsStartChatting = () => {
    setIsStartChatting(true);
  }

  const handleSetPrompt = (prompt: string) => {
    router.push(`/chat?prompt=${prompt}`);
  };

  return (
    <div className="flex flex-col sm:max-w-6xl w-screen h-dvh sm:py-12  sm:px-12  mx-auto">
      <div className="w-full px-4 pb-4 pt-2">
        <Menu collapse={true} />

      </div>
      <div className="flex-1 flex flex-col items-around justify-between sm:justify-center sm:gap-40 sm:w-full lg:px-60 md:px-20 sm:px-6 pt-16 sm:pt-0 overflow-auto">
        <div className="flex flex-col items-center justify-start gap-4">
          <img src="Logo/Logo.svg" alt="Logo" />
          <p className="font-Geist text-(--brand-6) font-medium text-xl text-center">
            Hi, I am Olle <br />- Your Collectible Expert.
          </p>
        </div>

      </div>
      <div className="w-full px-4 pt-4 pb-6 sm:p-b sm:pb-40 sm:px-20 md:px-30 lg:px-40 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
        <Snap onChange={handleSetPrompt} />
      </div>
    </div>
  );
}
