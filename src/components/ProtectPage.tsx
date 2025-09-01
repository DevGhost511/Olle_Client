'use client'
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

const ProtectPage = ({children}: {children: React.ReactNode}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            router.push('/login')
        }
        else{
            const decodedToken = jwtDecode(token)
            if(decodedToken.exp && decodedToken.exp < Date.now() / 1000){
                router.push('/login')
            }
            else{
                setIsLoading(false)
            }
        }
    }, [])
    return (
        <>
            {isLoading ? <div className="flex justify-center items-center h-dvh">
                <div className="w-12 h-12 animate-spin rounded-full border-4 border-(--brand-5) border-t-transparent"></div>
            </div> : children}
        </>
    )
}

export default ProtectPage  