"use client"

import { sendOtp, verifyOtp } from "@/api/otp";
import SecButton from "@/components/SecButton";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";

const OTPVerify = () => {
    const router = useRouter()
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const handleVerify = async () => {
        const response = await verifyOtp(email, otp)
        if (response.status === 200) {
            router.push("/signin")
        }
    }
    const handleResend = async () => {
        await sendOtp(email)
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get("email");
        if (email) {
            setEmail(email);
        }
    }, [])
    return (
        <div className="flex flex-col items-center justify-start  w-full h-dvh py-10 sm:py-30">
            <div className="flex flex-col sm:w-2xl w-full px-4 items-center justify-center gap-6">
                <div className="flex flex-col justify-start items-center gap-4">
                    <img src="Logo/mini_logo.svg" alt="logo" />
                    <p className="font-Geist text-(--brand-6) font-medium text-lg  text-center">
                        Your Collectible Expert.
                    </p>
                </div>
                <h1 className="font-Geist text-(--black-5) font-bold text-2xl text-center">Enter the 4-digit code</h1>
                <div>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        inputStyle={{
                            width: "40px",
                            height: "40px",
                            border: "1px solid #E0E0E0",
                            borderRadius: "8px",
                            fontSize: "16px",
                        }}
                        renderInput={(props) => <input {...props} className="w-10 h-10 border-2 border-gray-300 rounded-md text-center font-Geist text-(--black-5) font-medium text-md" />}
                        containerStyle="flex flex-row gap-4 w-full justify-center items-center"
                    />
                </div>
                <p className="font-Geist text-(--black-5) font-medium text-md text-center">Didn't receive the code? <a className="text-(--brand-6) font-bold" onClick={handleResend} >Resend</a></p>
                <SecButton text="Verify" onClick={handleVerify} />
            </div>


        </div>
    )
}

export default OTPVerify;