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
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div> : children}
        </>
    )
}

export default ProtectPage  