import { useCallback, useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import Webcam from "react-webcam";

interface WebCameraProps {
  className?: string;
}

export interface WebCameraRef {
  capture: () => string | null;
}

const WebCamera = forwardRef<WebCameraRef, WebCameraProps>(({ 
  className = "" 
}, ref) => {
    const webcamRef = useRef<Webcam>(null);
    const [isCameraLoading, setIsCameraLoading] = useState(true);
    const [isCameraError, setIsCameraError] = useState(false);
    const [deviceDimensions, setDeviceDimensions] = useState({
        width: 1920,
        height: 1080,
        aspectRatio: 16/9
    });

    const capture = useCallback(() => {
        if (webcamRef.current) {
            return webcamRef.current.getScreenshot();
        }
        return null;
    }, []);

    useImperativeHandle(ref, () => ({
        capture
    }), [capture]);

    const handleUserMedia = useCallback(() => {
        setIsCameraLoading(false);
        setIsCameraError(false);
    }, []);

    const handleUserMediaError = useCallback((error: string | DOMException) => {
        console.error("Camera error:", error);
        setIsCameraLoading(false);
        setIsCameraError(true);
    }, []);

    // Update device dimensions on mount and resize
    useEffect(() => {
        const updateDimensions = () => {
            if (typeof window !== 'undefined') {
                const width = window.innerWidth;
                const height = window.innerHeight;
                const aspectRatio = width / height;
                
                setDeviceDimensions({
                    width,
                    height,
                    aspectRatio
                });
            }
        };

        // Initial dimensions
        updateDimensions();

        // Listen for resize events
        window.addEventListener('resize', updateDimensions);
        window.addEventListener('orientationchange', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            window.removeEventListener('orientationchange', updateDimensions);
        };
    }, []);

    const videoConstraints = {
        width: { ideal: deviceDimensions.width },
        height: { ideal: deviceDimensions.height },
        aspectRatio: deviceDimensions.aspectRatio,
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
                    display: isCameraError ? 'none' : 'block',
                    aspectRatio: deviceDimensions.aspectRatio
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


        </div>
    );
});

WebCamera.displayName = 'WebCamera';

export default WebCamera;