'use client'
import CollectionCard from "@/components/CollectionCard";
import Tab from "@/components/Tab";
import { useEffect, useState } from "react";
import Snap from "@/components/Snap";
import { ICollection } from "@/types/collection";
import { getCollections } from "@/api/private";
import { useRouter } from "next/navigation";

const tabNames = ["All", "Car", "Watch"];

export default function Dashboard() {
    const [collections, setCollections] = useState<ICollection[]>([]);
    const [activeTab, setActiveTab] = useState(tabNames[0]);
    const router = useRouter();
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    // Calculate category counts
    const categoryCounts = tabNames.reduce((counts, tabName) => {
        if (tabName === "All") {
            counts[tabName] = collections.length;
        } else {
            counts[tabName] = collections.filter(collection => collection.category === tabName).length;
        }
        return counts;
    }, {} as { [key: string]: number });
    const [prompt, setPrompt] = useState<string>("");
    const handleSetPrompt = (prompt: string) => {
        setPrompt(prompt);
    };
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const collections = await getCollections();
                setCollections(collections);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCollections();
    }, []);
    return (

        <div className="w-full flex flex-1 flex-col overflow-auto gap-4 pt-2 sm:py-12 sm:px-12 mx-auto">
            <div className="flex flex-col justify-center items-center py-2 px-4 sm:py-4 gap-3">
                <p className="text-xl text-(--black-5) font-abril-fatface ">My Collections</p>
                <div className="flex flex-col justify-center items-center gap-1">
                    <p className="text-md text-(--black-5) font-normal">
                        Total Estimated Value
                    </p>
                    <p className="text-2xl text-(--black-5) font-bold">
                        $12,500
                    </p>
                    <p className="text-sm text-(--black-4) font-normal">
                        +$9,999 Last 1 month
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full px-4 sm:px-0">
                <Tab onChange={handleTabChange} tabNames={tabNames} className="my-2 sm:my-4" containerClassName="justify-start items-center gap-4 w-fit" badgeCounts={categoryCounts} />
            </div>
            <div className="flex flex-1 flex-col w-full justify-start overflow-auto gap-6 px-4 sm:px-0">
                {activeTab === "All" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
                    {collections.map((collection) => (
                        <CollectionCard key={collection._id} name={collection.name} price={collection.valuation} image={process.env.NEXT_PUBLIC_API_URL + '/' + collection.imageURL} className="w-full sm:w-[45%] md:w-[32%]" onClick={() => router.push(`/collections/${collection._id}`)} />
                    ))}
                </div>)}

                {activeTab === "Car" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
                    {collections.filter((collection) => collection.category === "Car").map((collection) => (
                        <CollectionCard key={collection._id} name={collection.name} price={collection.valuation} image={process.env.NEXT_PUBLIC_API_URL + '/' + collection.imageURL} className="w-full sm:w-[45%] md:w-[32%]" onClick={() => router.push(`/collections/${collection._id}`)} />
                    ))}
                </div>)}
                {activeTab === "Watch" && (<div className="flex flex-wrap w-full gap-6 sm:gap-4">
                    {collections.filter((collection) => collection.category === "Watch").map((collection) => (
                        <CollectionCard key={collection._id} name={collection.name} price={collection.valuation} image={process.env.NEXT_PUBLIC_API_URL + '/' + collection.imageURL} className="w-full sm:w-[45%] md:w-[32%]" onClick={() => router.push(`/collections/${collection._id}`)} />
                    ))}
                </div>)}
            </div>
            <div className="w-full px-4 sm:px-20 lg:px-40 mt-4 pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                <Snap onChange={handleSetPrompt} />
            </div>
        </div>
    )
}