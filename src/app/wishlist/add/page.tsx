'use client'
import SecButton from "@/components/SecButton";
import PriButton from "@/components/PriButton";
import { useRouter, useSearchParams } from "next/navigation";
import { addWishList } from "@/api/private";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AddWishList = () => {
    const router = useRouter();
    const [wishListInfo, setWishListInfo] = useState<any>(null);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const query = useSearchParams();
    const handleAddWishList = async () => {
        if (!wishListInfo?.name || !wishListInfo?.category || !wishListInfo?.valuation || !wishListInfo?.description || !wishListInfo?.categories || !threadId) {
            toast.error("Please fill all the fields");
            return;
        }
        // console.log(localStorage.getItem("imageUrl"));
        try {
            setLoading(true);
            await addWishList({
                name: wishListInfo?.name,
                category: wishListInfo?.category,
                valuation: { min: wishListInfo?.valuation?.min, max: wishListInfo?.valuation?.max },
                description: wishListInfo?.description,
                imageURL: localStorage.getItem("imageUrl") || '',
                categories: wishListInfo?.categories,
                threadId: threadId || '',
                price: wishListInfo?.price,
                rarerate: wishListInfo?.rarerate,
            });
            localStorage.removeItem("addWishListDraft");
            router.push("/wishlist");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const handleCancel = () => {
        localStorage.removeItem("addWishListDraft");
        router.push("/wishlist");
    }
    useEffect(() => {
        //get thread info
        let threadIdFromUrl = query.get("threadId");
        let threadIdFromStorage = localStorage.getItem("threadId");

        // Use URL threadId first, then fallback to localStorage
        const finalThreadId = threadIdFromUrl || threadIdFromStorage;

        if (!finalThreadId) {
            console.error("No threadId found in URL or localStorage");
            router.push("/wishlist");
            return;
        }

        const wishListInfo = localStorage.getItem("collection");
        if (wishListInfo) {
            const wishListInfoObj = JSON.parse(wishListInfo);
            console.log("WishList Info:", wishListInfoObj);
            console.log("Using threadId:", finalThreadId);
            setWishListInfo(wishListInfoObj);
            setThreadId(finalThreadId);
        } else {
            console.error("No wishListInfo found in localStorage");
            router.push("/wishlist");
        }
    }, [query, router]);
    return (
        <div className="w-full flex flex-1 flex-col overflow-auto gap-4 px-4 sm:px-10 md:px-20 lg:px-40">
            <div className="flex flex-col justify-center items-center text-center pt-8 pb-4 flex-shrink-0">
                <p className="text-xl text-(--black-5) font-abril-fatface ">Add WishList</p>
            </div>
            <div className="flex md:flex-row flex-col gap-6 font-[Geist] pb-8 flex-1 overflow-auto min-h-0">
                {/* Image */}
                <div className="flex-1 rounded-lg overflow-auto min-h-0 h-[fit-content]">
                    <img src={process.env.NEXT_PUBLIC_API_URL + '/' + wishListInfo?.imageUrl} alt="Add Collection" className="w-full h-full object-cover" />
                </div>
                {/* Form */}
                <div className="flex-[2] flex flex-col gap-6 overflow-y-auto min-h-0">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-(--black-5) font-medium">Collection Name</p>
                        <input type="text" className="w-full p-2 rounded-lg border border-(--black-4)" onChange={(e) => setWishListInfo({ ...wishListInfo, name: e.target.value })} value={wishListInfo?.name || ''} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-(--black-5) font-medium">Collection Category</p>
                        <select className="w-full p-2 rounded-lg border border-(--black-4)" onChange={(e) => setWishListInfo({ ...wishListInfo, category: e.target.value })} value={wishListInfo?.category || ''}>
                            <option value="Car">Car</option>
                            <option value="Watch">Watch</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-(--black-5) font-medium">Valuation (USD)</p>
                        <div className="flex flex-row gap-2 items-center">
                            <input type="number" className="w-full p-2 rounded-lg border border-(--black-4)" onChange={(e) => setWishListInfo({ ...wishListInfo, valuation: { min: e.target.value, max: wishListInfo?.valuation?.max } })} value={wishListInfo?.valuation?.min || ''} />
                            <p className="text-sm text-(--black-5) font-medium">to</p>
                            <input type="number" className="w-full p-2 rounded-lg border border-(--black-4)" onChange={(e) => setWishListInfo({ ...wishListInfo, valuation: { min: wishListInfo?.valuation?.min, max: e.target.value } })} value={wishListInfo?.valuation?.max || ''} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-(--black-5) font-medium">Description</p>
                        <p className="text-sm text-(--black-5) font-normal">{wishListInfo?.description}</p>
                    </div>
                    <div className="flex flex-col">
                        {wishListInfo?.categories?.map((category: any, index: number) => (
                            <div key={index} className={`flex flex-row justify-between items-center p-2 rounded-lg ${index % 2 === 0 ? 'bg-[#EFECE0]' : ''}`}>
                                <div className="flex-1 flex flex-row justify-start items-center gap-2">
                                    <p className="text-sm text-(--black-5) font-normal">{category.name}</p>
                                </div>
                                <div className="flex-1 flex flex-row justify-end items-center gap-2">
                                    <input type="text" className="w-full p-2 rounded-lg bg-white border border-(--black-4)" onChange={(e) => setWishListInfo({ ...wishListInfo, categories: wishListInfo?.categories.map((c: any, i: number) => i === index ? { ...c, value: e.target.value } : c) })} value={category.value || ''} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-3 flex-shrink-0 pb-4">
                <SecButton text="Cancel" onClick={handleCancel} />
                <PriButton text="Add WishList" onClick={handleAddWishList} disabled={loading} />
            </div>
        </div>
    )
}

export default AddWishList;