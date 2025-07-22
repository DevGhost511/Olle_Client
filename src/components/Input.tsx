'use client'
import { useState } from "react";

type Props = {
    placeholder?: string;
    onChange?: (value: string) => void;
    type?: string;
}
export default function Input( {type, placeholder, onChange} : Props) {

    const [visible, setVisible] = useState(type === "password" ? false : true);
    const toggleVisible = () => { setVisible(!visible) };

    return (
        <div className="flex flex-row items-center justify-center gap-4 w-full  border-1 border-(--brand-3) [&:has(input:focus)]:border-(--brand-6) [&:has(input:focus)]:outline-4 [&:has(input:focus)]:outline-(--brand-3) rounded-xl py-2 px-4">
            <input type={visible ? "text" : "password"} placeholder={placeholder} className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-md text-left w-full " />
            {type === "password" && (
                visible ? (
                <button className="cursor-pointer" onClick={toggleVisible}>
                    <img src="visible.svg" alt="" />
                </button>
            ) : (
                <button className="cursor-pointer" onClick={toggleVisible}>
                    <img src="invisible.svg" alt="" />
                </button>
            )
            )}
            
        </div>
    )
}