import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

interface WebCameraProps {
  onCapture?: (imageSrc: string) => void;
  width?: number;
  height?: number;
  className?: string;
}

export default function WebCamera({ 
  onCapture, 
  width = 640, 
  height = 480, 
  className = "" 
}: WebCameraProps) {
    const webcamRef = useRef<Webcam>(null);
    const [isCameraLoading, setIsCameraLoading] = useState(true);
    const [isCameraError, setIsCameraError] = useState(false);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc && onCapture) {
                onCapture(imageSrc);
            }
        }
    }, [onCapture]);

    const handleUserMedia = useCallback(() => {
        setIsCameraLoading(false);
        setIsCameraError(false);
    }, []);

    const handleUserMediaError = useCallback((error: string | DOMException) => {
        console.error("Camera error:", error);
        setIsCameraLoading(false);
        setIsCameraError(true);
    }, []);

    const videoConstraints = {
        width: { ideal: width },
        height: { ideal: height },
        facingMode: "environment" // Use back camera on mobile by default
    };

    return (
        <div className={`relative ${className}`}>
            {/* Camera Stream */}
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                className="w-full h-full object-cover rounded-lg"
                style={{
                    display: isCameraError ? 'none' : 'block'
                }}
            />

            {/* Loading overlay */}
            {isCameraLoading && (
                <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center rounded-lg">
                    <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                        <p className="text-white text-sm">Starting camera...</p>
                    </div>
                </div>
            )}

            {/* Error state */}
            {isCameraError && (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                    <div className="text-center p-4">
                        <div className="text-gray-400 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                            </svg>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Unable to access camera.<br />
                            Please check permissions.
                        </p>
                    </div>
                </div>
            )}

            {/* Capture button - only show if onCapture is provided and camera is working */}
            {onCapture && !isCameraLoading && !isCameraError && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <button
                        onClick={capture}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-6 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        📸 Capture
                    </button>
                </div>
            )}
        </div>
    );
}