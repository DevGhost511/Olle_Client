'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import EmailInput from "@/components/EmailInput"
import PasswordInput from "@/components/PasswordInput"
import PriButton from "@/components/PriButton"
import SecButton from "@/components/SecButton"

export default function Login() {

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange  = () => {
        setIsChecked(!isChecked);
    };

    const router = useRouter()
    const handleLoginClick = () => {
        router.push("/login")
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start  w-full h-screen py-30">
                <div className="flex flex-col sm:w-2xl w-full px-6 items-center justify-center gap-10">
                    <div className="flex flex-col justify-start items-center gap-4">
                        <img src="Logo/Logo.svg" alt="logo" />
                        <p className="font-Geist text-(--brand-6) font-medium text-2xl  text-center">
                            Your Collectible Expert.
                        </p>
                    </div>
                    <p className="text-2xl text-(--black-5) font-abril-fatface ">
                        Create An Account
                    </p>
                    <div className="w-full flex flex-col gap-4">
                        <EmailInput />
                        <PasswordInput />

                    </div>
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                        {isChecked ? <img onClick={handleCheckboxChange} src="checked.svg" alt="" /> :
                            <img onClick={handleCheckboxChange} src="uncheck.svg" alt="" />}
                        {isChecked ? <p className="text-lg text-(--black-5) font-medium">
                            Agree with Terms of Service and Privacy Policy
                        </p>
                            : <p className="text-lg text-(--black-4) font-medium">
                                Agree with Terms of Service and Privacy Policy
                            </p>}
                    </div>
                    <PriButton text="Create an Account" disabled={!isChecked} />

                    <p className="flex w-full text-left text-(--black-5) text-xl">
                        If you already have an account
                    </p>
                    <div className="w-full">
                        <SecButton text="Login" onClick={handleLoginClick} />
                    </div>

                </div>


            </div>
        </>
    )
}