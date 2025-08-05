'use client'
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import WebCamera, { WebCameraRef } from "@/components/WebCamera"
import Menu from "@/components/Menu"
import { fileUpload } from "@/api/public"
import PriButton from "@/components/PriButton"
import SecButton from "@/components/SecButton"

export default function CameraPage() {
    const router = useRouter()
    const webcamRef = useRef<WebCameraRef>(null)
    const [isUploading, setIsUploading] = useState(false)



    const handleSnapClick = async () => {
        if (!webcamRef.current) return
        
        try {
            setIsUploading(true)
            
            // Capture image from webcam
            const imageSrc = webcamRef.current.capture()
            if (!imageSrc) {
                alert('Failed to capture image. Please try again.')
                return
            }

            // Convert base64 to blob
            const response = await fetch(imageSrc)
            const blob = await response.blob()

            // Create file from blob
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })

            // Upload the captured image
            const res = await fileUpload(file)
            localStorage.setItem('imageUrl', res.info.path)
            
            // Navigate to snap page after successful upload
            router.push('/snap')
            
        } catch (error) {
            console.error('Error processing camera capture:', error)
            alert('Failed to process camera capture. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="flex flex-col h-dvh w-full bg-gray-50 sm:max-w-6xl mx-auto">
            {/* Menu Header */}
            <div className="w-full px-4 pt-4">
                <Menu collapse={false} />
            </div>
            {/* Camera Content */}
            <div className="flex-1 flex flex-col items-center md:justify-start md:mt-8 justify-center p-4">
                <div className="w-full max-w-4xl flex justify-center items-center">
                    <div className="w-full max-h-[70vh] sm:max-h-[75vh] flex justify-center">
                        <WebCamera
                            ref={webcamRef}
                            className="w-full h-auto max-w-full max-h-full rounded-lg"
                        />
                    </div>
                </div>
                
                {/* Instructions */}
                <div className="mt-6 text-center max-w-md flex flex-row gap-4 w-full">
                    <SecButton 
                        text="Back" 
                        onClick={() => { router.push('/') }}
                        disabled={isUploading}
                    />
                    <PriButton 
                        text={isUploading ? "Processing..." : "Snap"} 
                        icon="camera_white.svg" 
                        onClick={handleSnapClick}
                        disabled={isUploading}
                    />
                </div>
            </div>

            {/* Upload overlay */}
            {isUploading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4 mx-4 max-w-sm shadow-2xl">
                        <div className="w-8 h-8 animate-spin rounded-full border-4 border-(--brand-6) border-t-transparent"></div>
                        <p className="text-(--black-5) font-medium">Processing your photo...</p>
                        <p className="text-(--black-4) text-sm text-center">Please wait while we upload your image</p>
                    </div>
                </div>
            )}
        </div>
    )
}