import axios from "axios";

const sendOtp = async (email: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/otp/send`, {
        email
    });
    return res.data;
}

const verifyOtp = async (email: string, otp: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/otp/verify`, {
        email,
        otp
    });
    return res.data;
}

export { sendOtp, verifyOtp };