'use client'
import { useState } from "react";


export default function PasswordInput () {

const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {setShowPassword(!showPassword)};

    return (
        <div className="flex flex-row items-center justify-center gap-4 w-full  border-1 border-(--brand-3) [&:has(input:focus)]:border-(--brand-6) [&:has(input:focus)]:outline-4 [&:has(input:focus)]:outline-(--brand-3) rounded-xl py-2 px-4">
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-md text-left w-full " />
        {showPassword ? (
            <button className="cursor-pointer"onClick={togglePasswordVisibility }>
            <img  src="visible.svg" alt="" />
            </button>
        ) : (
            <button className="cursor-pointer" onClick={togglePasswordVisibility }>
            <img  src="invisible.svg" alt="" />
            </button>
        )}
        </div>
    )
}