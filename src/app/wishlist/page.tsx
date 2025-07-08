'use client'
import Menu from "@/components/Menu";
import CollectionCard from "@/components/CollectionCard";
import Tab from "@/components/Tab";
import { useState } from "react";
import PriButton from "@/components/PriButton";
import WishlistCard from "@/components/WishlistCard";

const tabNames = ["Cars (3)", "Watches (3)", "Arts (2)"];

export default function Page() {

    const [activeTab, setActiveTab] = useState(tabNames[0]);
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex flex-col sm:max-w-6xl w-screen h-screen pt-2 sm:py-12 sm:px-12 mx-auto">
            <div className="flex flex-row justify-between items-center px-4 sm:px-0">
                <Menu collapse={false} />
            </div>

            <div className="flex flex-col justify-center items-center py-2 px-4 sm:py-4 gap-3">
                <p className="text-xl text-(--black-5) font-abril-fatface ">My Wishlist</p>
                <div className="flex flex-col justify-center items-center gap-1">
                    {/* <p className="text-md text-(--black-5) font-normal">
                        Total Estimated Value
                    </p>
                     */}
                </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full px-4 sm:px-0">
            <Tab onChange={handleTabChange} tabNames={tabNames} className="my-2 sm:my-4" />
            </div>
            <div className="flex flex-1 flex-col w-full justify-start overflow-auto gap-6 px-4 sm:px-0">

                {activeTab === "Cars (3)" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
                    <WishlistCard name="1967 Ferrari 275 GTB/4" price={1256400} image="Assets/car.jpg" className="w-full sm:w-[45%] md:w-[32%]" />
                    <WishlistCard name="1967  GTB/4" price={1122500} image="Assets/car1.jpg" className="w-full sm:w-[45%] md:w-[32%]" />
                    <WishlistCard name="1967 Ferrari 275 " price={12432500} image="Assets/car2.jpg" className="w-full sm:w-[45%] md:w-[32%]" />
                </div>)}
                {activeTab === "Watches (3)" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
                    <WishlistCard name="1967 Ferrari 275 GTB/4" price={1256400} image="Assets/watch1.jpg" className="w-full sm:w-[45%] md:w-[32%]" />
                    <WishlistCard name="1967  GTB/4" price={1122500} image="Assets/watch2.jpg" className="w-full sm:w-[45%] md:w-[32%]" />
                    <WishlistCard name="1967 Ferrari 275 " price={12432500} image="Assets/watch3.jpg" className="w-full sm:w-[45%] md:w-[32%]" />
                </div>)}
                {activeTab === "Arts (2)" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
                    <WishlistCard name="1967 Ferrari 275 GTB/4" price={1256400} image="Assets/arts1.jpg" className="w-full sm:w-[45%] md:w-[32%]" />
                    <WishlistCard name="1967  GTB/4" price={1122500} image="Assets/arts2.jpg" className="w-full sm:w-[45%] md:w-[32%]" />
                </div>)}
            </div>
            <div className="w-full px-4 sm:px-40  pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                    <PriButton text="Add Another" icon="camera_white.svg"/>
             </div>
        </div>
    )
}