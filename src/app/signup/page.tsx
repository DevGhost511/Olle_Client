'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import PriButton from "@/components/PriButton"
import SecButton from "@/components/SecButton"
import Input from "@/components/Input"
import { googleSignUp, signUp } from "@/api/auth"
import { sendOtp } from "@/api/otp"
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import { toast } from "react-hot-toast"

function SignUpForm() {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const router = useRouter()
    const handleLoginClick = () => {
        router.push("/login")
    }

    const handleSignUpClick = async () => {
        try{
            await signUp(email, password)
            await sendOtp(email)
            router.push(`/otp-verify?email=${email}`)
        }
        catch(error: any){
            toast.error(error.response.data.message)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (response: any) => {
            console.log('Google login success:', response)
            console.log(response.credential)
           
           try{
            const googleResponse = await googleSignUp(response.access_token)
            localStorage.setItem('token', googleResponse.token)
            toast.success("Signup successful")
            router.push('/collections')
           }
           catch(error: any){
            console.log('Google signup failed', error)
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
                        <Input type="email" value={email} onChange={(e) => setEmail(e)} placeholder="Enter Your Email" />
                        <Input type="password" value={password} onChange={(e) => setPassword(e)} placeholder="Enter Your Password" />

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
                        <PriButton text="Create an Account" onClick={handleSignUpClick} disabled={!isChecked} />
                        <p className="flex flex-row w-full justify-center items-center text-md text-(--black-4)"> Or </p>
                        <SecButton text="Sign Up with Google" disabled={!isChecked} icon="google_brand.svg" onClick={() => googleLogin()} />
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

export default function Login() {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            <SignUpForm />
        </GoogleOAuthProvider>
    )
}