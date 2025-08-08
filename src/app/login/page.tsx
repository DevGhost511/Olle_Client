'use client'

import { googleSignIn, signIn } from "@/api/auth"
import Input from "@/components/Input"
import PriButton from "@/components/PriButton"
import SecButton from "@/components/SecButton"
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

function LoginForm() {

    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSignupClick = () => {
        router.push("/signup")
    }
    const handleLoginClick = async () => {
        if (!email || !password) {
            toast.error("Please enter your email and password")
            return
        }
        try {
            const response = await signIn(email, password)
            localStorage.setItem("token", response.token)
            toast.success("Login successful")
            router.push("/")
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    const googleLogin = useGoogleLogin({
        onSuccess: async (response: any) => {
            console.log('Google login success:', response)
            console.log(response.credential)
            try {
                const googleResponse = await googleSignIn(response.access_token)
                localStorage.setItem('token', googleResponse.token)
                toast.success("Login successful")
                router.push('/collections')
            }
            catch (error: any) {
                console.log('Google login failed', error)
                toast.error(error.response.data.message)
            }
        },
        onError: () => {
            console.log('Google login failed')
        }
    })
    return (
        <>
            <div className="flex flex-col items-center justify-start  w-full h-dvh py-10 sm:py-30">
                <div className="flex flex-col md:w-2xl w-full px-4 items-center justify-center gap-6">
                    <div className="flex flex-col justify-start items-center gap-4">
                        <img src="Logo/mini_logo.svg" alt="logo" />
                        <p className="font-Geist text-(--brand-6) font-medium text-lg  text-center">
                            Your Collectible Expert.
                        </p>
                    </div>
                    <p className="text-xl text-(--black-5) font-abril-fatface ">
                        Login to Your Account
                    </p>
                    <div className="w-full flex flex-col gap-4">
                        <Input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e)} />
                        <Input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e)} />
                    </div>
                    <div className="flex flex-col w-full items-center justify-center gap-4">
                        <PriButton onClick={handleLoginClick} text="Login" />
                        <p className="flex flex-row w-full text-md text-center justify-center text-(--black-4)"> Or </p>
                        <SecButton text="Login with Google" icon="google_brand.svg" onClick={() => googleLogin()} />
                    </div>
                    <p className="flex w-full text-left text-(--black-5) text-md">
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
export default function Login() {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            <LoginForm />
        </GoogleOAuthProvider>
    )
}