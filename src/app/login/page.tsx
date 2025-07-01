'use client'

import EmailInput from "@/components/EmailInput"
import PasswordInput from "@/components/PasswordInput"
import PriButton from "@/components/PriButton"
import SecButton from "@/components/SecButton"
import { useRouter } from "next/navigation"

export default function Login() {

    const router = useRouter()
    const handleSignupClick = () => {
        router.push("/signup")
    }
    return (
        <>
            <div className="flex flex-col items-center justify-start  w-full h-screen py-30">
                <div className="flex flex-col md:w-2xl w-full px-6 items-center justify-center gap-10">
                    <div className="flex flex-col justify-start items-center gap-4">
                        <img src="Logo/Logo.svg" alt="logo" />
                        <p className="font-Geist text-(--brand-6) font-medium text-2xl  text-center">
                            Your Collectible Expert.
                        </p>
                    </div>
                    <p className="text-2xl text-(--black-5) font-abril-fatface ">
                        Login to Your Account
                    </p>
                    <div className="w-full flex flex-col gap-4">
                        <EmailInput />
                        <PasswordInput />
                    </div>
                    <div className="flex flex-col w-full items-center justify-center gap-4">
                    <PriButton text="Login" />
                    <p className="flex flex-row w-full text-xl text-center justify-center text-(--black-4)"> Or </p>
                    <SecButton text="Login with Google" icon="google_brand.svg"/>
                    </div>
                    <p className="flex w-full text-left text-(--black-5) text-xl">
                        If you don’t have an account
                    </p>
                    <div className="w-full">
                        <SecButton text="Sign Up" onClick={handleSignupClick} />
                    </div>

                </div>


            </div>
        </>
    )
}