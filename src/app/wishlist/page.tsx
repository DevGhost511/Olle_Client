'use client'
import Tab from "@/components/Tab";
import { useEffect, useState } from "react";
import Snap from "@/components/Snap";
import WishlistCard from "@/components/WishlistCard";
import { IWishList } from "@/types/wishList";
import { getWishLists } from "@/api/private";
import { useRouter } from "next/navigation";

const tabNames = ["All", "Car", "Watch"];

export default function Page() {
  const router = useRouter();


  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const [wishLists, setWishLists] = useState<IWishList[]>([]);
  const categoryCounts = tabNames.reduce((counts, tabName) => {
    if (tabName === "All") {
      counts[tabName] = wishLists.length;
    } else {
      counts[tabName] = wishLists.filter(wishList => wishList.category === tabName).length;
    }
    return counts;
  }, {} as { [key: string]: number });

  useEffect(() => {
    const fetchWishLists = async () => {
      try {
        const wishLists = await getWishLists();
        setWishLists(wishLists);
      } catch (error: any) {
        console.error('Error fetching wishlists:', error.response.data.message);
      }
    }
    fetchWishLists();
  }, []);
  
  return (
    <>
      <div className="flex flex-col justify-center items-center py-2 px-4 sm:py-4 gap-3">
        <p className="text-xl text-(--black-5) font-abril-fatface ">My Wishlist</p>
        <div className="flex flex-col justify-center items-center gap-1">
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-full px-4 sm:px-0">
        <Tab onChange={handleTabChange} tabNames={tabNames} className="my-2 sm:my-4" containerClassName="justify-start items-center gap-4 w-fit" badgeCounts={categoryCounts} />
      </div>
      <div className="flex flex-1 flex-col w-full justify-start overflow-auto gap-6 px-4 sm:px-0">

        {activeTab === "Car" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
          {wishLists.filter(wishList => wishList.category === "Car").map((wishList) => (
            <WishlistCard key={wishList._id} name={wishList.name} price={wishList.valuation} image={process.env.NEXT_PUBLIC_API_URL + "/" + wishList.imageURL} className="w-full sm:w-[45%] md:w-[32%]" onClick={() => router.push(`/wishlist/${wishList._id}`)} />
          ))}
        </div>)}
        {activeTab === "Watch" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
          {wishLists.filter(wishList => wishList.category === "Watch").map((wishList) => (
            <WishlistCard key={wishList._id} name={wishList.name} price={wishList.valuation} image={process.env.NEXT_PUBLIC_API_URL + "/" + wishList.imageURL} className="w-full sm:w-[45%] md:w-[32%]" onClick={() => router.push(`/wishlist/${wishList._id}`)} />
          ))}
        </div>)}
        {activeTab === "All" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
          {wishLists.map((wishList) => (
            <WishlistCard key={wishList._id} name={wishList.name} price={wishList.valuation} image={process.env.NEXT_PUBLIC_API_URL + "/" + wishList.imageURL} className="w-full sm:w-[45%] md:w-[32%]" onClick={() => router.push(`/wishlist/${wishList._id}`)} />
          ))}
        </div>)}
      </div>
      <div className="w-full px-4 sm:px-20 lg:px-40  pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
        <Snap onChange={() => { }} />
      </div>
    </>

  )
}