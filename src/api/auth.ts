import axios from "axios";

const signUp = async (email: string, password: string): Promise<any> => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email,
        password
    });
    return res.data;
}

const signIn = async (email: string, password: string): Promise<any> => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        email,
        password
    });
    return res.data;
}

const googleSignUp = async (googleToken: string): Promise<any> => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-signup`, {
        googleToken
    });
    return res.data;
}

const googleSignIn = async (googleToken: string): Promise<any> => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-signin`, {
        googleToken
    });
    return res.data;
}

export { signUp, signIn, googleSignUp, googleSignIn };