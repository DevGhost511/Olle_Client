'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import PriButton from "@/components/PriButton"
import SecButton from "@/components/SecButton"
import Input from "@/components/Input"

export default function Login() {

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const router = useRouter()
    const handleLoginClick = () => {
        router.push("/login")
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start  w-full h-dvh py-10 sm:py-30">
                <div className="flex flex-col sm:w-2xl w-full px-4 items-center justify-center gap-6">
                    <div className="flex flex-col justify-start items-center gap-4">
                        <img src="Logo/mini_logo.svg" alt="logo" />
                        <p className="font-Geist text-(--brand-6) font-medium text-lg  text-center">
                            Your Collectible Expert.
                        </p>
                    </div>
                    <p className="text-xl text-(--black-5) font-abril-fatface ">
                        Create An Account
                    </p>
                    <div className="w-full flex flex-col gap-4">
                        <Input type="email" placeholder="Enter Your Email" />
                        <Input type="password" placeholder="Enter Your Password" />

                    </div>

                    <div className="flex flex-col justify-between items-center gap-4 w-full">
                        <div className="flex flex-row gap-4 items-center justify-start w-full">
                            {isChecked ? <img onClick={handleCheckboxChange} src="checked.svg" alt="" /> :
                                <img onClick={handleCheckboxChange} src="uncheck.svg" alt="" />}
                            {isChecked ? <p className="text-md text-(--black-5) font-medium">
                                Agree with Terms of Service and Privacy Policy
                            </p>
                                : <p className="text-md text-(--black-4) font-medium">
                                    Agree with Terms of Service and Privacy Policy
                                </p>}
                        </div>
                        <PriButton text="Create an Account" disabled={!isChecked} />
                        <p className="flex flex-row w-full justify-center items-center text-md text-(--black-4)"> Or </p>
                        {isChecked ? <SecButton text="Sign Up with Google" icon="google_brand.svg" disabled={!isChecked} />
                        :<SecButton text="Sign Up with Google" icon="google_disabled.svg" disabled={!isChecked} />}
                    </div>
                    <p className="flex w-full text-left text-(--black-5) text-md">
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