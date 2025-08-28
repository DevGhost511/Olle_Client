'use client'
import SecButton from "@/components/SecButton";
import PriButton from "@/components/PriButton";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { addCollection } from "@/api/private";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Valuation from "@/components/Valuation";
const Categories = [
    {
        name: "Car",
        value: "car"
    },
    {
        name: "Watch",
        value: "watch"
    },
    {
        name: "Watch",
        value: "watch"
    },
    {
        name: "Watch",
        value: "watch"
    },
]
const AddCollection = () => {
    const router = useRouter();
    const [collectionInfo, setCollectionInfo] = useState<any>(null);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const query = useSearchParams();
    const handleAddCollection = async () => {
        if (!collectionInfo?.name || !collectionInfo?.category || !collectionInfo?.valuation || !collectionInfo?.description || !collectionInfo?.categories || !threadId) {
            toast.error("Please fill all the fields");
            return;
        }
        // console.log(localStorage.getItem("imageUrl"));
        try {
            setLoading(true);
            await addCollection({
                name: collectionInfo?.name,
                category: collectionInfo?.category,
                valuation: { min: collectionInfo?.valuation?.min, max: collectionInfo?.valuation?.max },
                description: collectionInfo?.description,
                imageURL: localStorage.getItem("imageUrl") || '',
                categories: collectionInfo?.categories,
                threadId: threadId || '',
                price: collectionInfo?.price,
                rarerate: collectionInfo?.rarerate,
            });
            localStorage.removeItem("addCollectionDraft");
            router.push("/collections");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const handleCancel = () => {
        localStorage.removeItem("addCollectionDraft");
        router.push("/collections");
    }
    useEffect(() => {
        //get thread info
        let threadIdFromUrl = query.get("threadId");
        let threadIdFromStorage = localStorage.getItem("threadId");

        // Use URL threadId first, then fallback to localStorage
        const finalThreadId = threadIdFromUrl || threadIdFromStorage;

        if (!finalThreadId) {
            console.error("No threadId found in URL or localStorage");
            router.push("/collections");
            return;
        }

        const collectionInfo = localStorage.getItem("collection");
        if (collectionInfo) {
            const collectionInfoObj = JSON.parse(collectionInfo);
            console.log("Collection Info:", collectionInfoObj);
            console.log("Using threadId:", finalThreadId);
            setCollectionInfo(collectionInfoObj);
            setThreadId(finalThreadId);
        } else {
            console.error("No collectionInfo found in localStorage");
            router.push("/collections");
        }
    }, [query, router]);
    return (
        <div className="w-full flex flex-1 flex-col overflow-auto gap-4 px-4 sm:px-10 md:px-20 lg:px-40">
            <div className="flex flex-col justify-center items-center text-center pt-8 pb-4 flex-shrink-0">
                <p className="text-xl text-(--black-5) font-abril-fatface ">Add Collection</p>
            </div>
            <div className="flex md:flex-row flex-col gap-6 font-[Geist] pb-8 flex-1 overflow-auto min-h-0">
                {/* Image */}
                <div className="flex-1 rounded-lg overflow-auto min-h-0 h-[fit-content]">
                    {/* <Image src={"/Assets/car.jpg"} alt="Add Collection" width={500} height={500} className="w-full h-full object-cover" /> */}
                    <Image src={process.env.NEXT_PUBLIC_API_URL + '/' + collectionInfo?.imageURL} alt="Add Collection" width={500} height={500} className="w-full h-full object-cover" />
                </div>
                {/* Form */}
                <div className="flex-[2] flex flex-col gap-6 overflow-y-auto min-h-0">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-(--black-5) font-medium">Collection Name</p>
                        <input type="text" className="w-full p-2 rounded-lg border border-(--black-4)" onChange={(e) => setCollectionInfo({ ...collectionInfo, name: e.target.value })} value={collectionInfo?.name || ''} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-(--black-5) font-medium">Collection Category</p>
                        <select className="w-full p-2 rounded-lg border border-(--black-4)" onChange={(e) => setCollectionInfo({ ...collectionInfo, category: e.target.value })} value={collectionInfo?.category || ''}>
                            <option value="Car">Car</option>
                            <option value="Watch">Watch</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-(--black-5) font-medium">Valuation (USD)</p>
                        <div className="flex flex-row gap-2 items-center">
                            <input type="number" className="w-full p-2 rounded-lg border border-(--black-4)" onChange={(e) => setCollectionInfo({ ...collectionInfo, valuation: { min: e.target.value, max: collectionInfo?.valuation?.max } })} value={collectionInfo?.valuation?.min || ''} />
                            <p className="text-sm text-(--black-5) font-medium">to</p>
                            <input type="number" className="w-full p-2 rounded-lg border border-(--black-4)" onChange={(e) => setCollectionInfo({ ...collectionInfo, valuation: { min: collectionInfo?.valuation?.min, max: e.target.value } })} value={collectionInfo?.valuation?.max || ''} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-(--black-5) font-medium">Description</p>
                        <p className="text-sm text-(--black-5) font-normal">{collectionInfo?.description}</p>
                    </div>
                    <div className="flex flex-col">
                        {collectionInfo?.categories?.map((category: any, index: number) => (
                            <div key={index} className={`flex flex-row justify-between items-center p-2 rounded-lg ${index % 2 === 0 ? 'bg-[#EFECE0]' : ''}`}>
                                <div className="flex-1 flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm text-(--black-5) font-normal">{category.name}</p>
                                </div>
                                <div className="flex-1 flex flex-row justify-end items-center gap-2">
                                    <input type="text" className="w-full p-2 rounded-lg bg-white border border-(--black-4)" onChange={(e) => setCollectionInfo({ ...collectionInfo, categories: collectionInfo?.categories.map((c: any, i: number) => i === index ? { ...c, value: e.target.value } : c) })} value={category.value || ''} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-3 flex-shrink-0">
                <SecButton text="Cancel" onClick={handleCancel} />
                <PriButton text="Add Collection" onClick={handleAddCollection} disabled={loading} />
            </div>
        </div>
    )
}

export default AddCollection;