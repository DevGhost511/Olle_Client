'use client'

import EmailInput from "@/components/EmailInput"
import PasswordInput from "@/components/PasswordInput"

export default function Login() {
    return (
        <>
            <div className="flex flex-col items-center justify-start  w-full h-screen py-30">
                <div className="flex flex-col w-2xl items-center justify-center gap-10">
                    <div className="flex flex-col justify-start items-center gap-4">
                        <img src="Logo/Logo.svg" alt="logo" />
                        <p className="font-Geist text-(--brand-6) font-medium text-2xl  text-center">
                            Your Collectible Expert.
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <EmailInput />
                        <PasswordInput />
                    </div>

                </div>


            </div>
        </>
    )
}