'use client'
import { fileUpload } from "@/api/public";
import { useState, useRef } from "react"
import { useRouter } from "next/navigation";
import SecButton from "./SecButton";

type Props = {
    onChange: (prompt: string) => void;
    collapse: boolean;
}

export default function Snap({ onChange, collapse }: Props) {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handlePlusClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file)
            return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            alert('File size exceeds 20MB.');
            return;
        }

        await uploadImage(file);
    }

    const uploadImage = async (file: File) => {
        setIsUploading(true);
        const res = await fileUpload(file);
        localStorage.setItem('imageUrl', res.info.path);
        handleNavigation();
    }

    const router = useRouter();
    const handleNavigation = () => {
        router.push('/snap');
    };


    return (
        <div className="flex flex-col items-center justify-around gap-3 w-full">
            
            <div className="flex flex-row items-center justify-around gap-3 rounded-xl border border-(--black-2) [&:has(input:focus)]:border-(--brand-6) [&:has(input:focus)]:outline-4 [&:has(input:focus)]:outline-(--brand-3) w-full bg-white px-1 py-1 ">
                <div className="flex flex-row items-center justify-start gap-4 w-full">
                    <button
                        onClick={handlePlusClick}
                        disabled={isUploading}
                        className="flex rounded-lg px-2 py-2 cursor-pointer hover:bg-(--brand-2) disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? (
                            <div className="w-7 h-7 animate-spin rounded-full border-2 border-(--brand-6) border-t-transparent"></div>
                        ) : (
                            <img className="w-7 h-7" src="plus.svg" alt="Upload image" />
                        )}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    <input type="text" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onChange(e.currentTarget.value);
                            e.currentTarget.value = '';
                        }
                    }} placeholder="Ask Olle about your collectible or just ask anything" className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-lg text-left w-full border-0 " />
                    <button className="flex rounded-lg px-2 py-2 cursor-pointer hover:bg-(--brand-2)">
                        <img className="w-7 h-7" src="camera.svg" alt="icon" />
                    </button>
                </div>

            </div>
        </div>

    )
}