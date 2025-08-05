'use client'
import { fileUpload } from "@/api/public";
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation";
import { compressImage } from "@/utils";

type Props = {
    onChange: (prompt: string) => void;
    onImageUpload?: () => void;
    isDisabled?: boolean;
}

export default function Snap({ onChange, onImageUpload, isDisabled }: Props) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const handlePlusClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file)
            return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            alert('File size exceeds 20MB.');
            return;
        }

        if (file.size > 250 * 1024) {
            const compressedFile = await compressImage(file);
            await uploadImage(compressedFile);
        } else {
            await uploadImage(file);
        }
    }

    const handleOpenCamera = () => {
        router.push('/camera');
    };



    const handleSendMessage = () => {
        const trimmedMessage = message.trim();
        if (trimmedMessage && !isDisabled) {
            onChange(trimmedMessage);
            setMessage("");
            // Reset textarea height to initial single line (mobile-responsive)
            if (textareaRef.current) {
                const initialHeight = isMobile ? 44 : 40;
                textareaRef.current.style.height = `${initialHeight}px`;
                textareaRef.current.style.paddingTop = isMobile ? '10px' : '8px';
                textareaRef.current.style.paddingBottom = isMobile ? '10px' : '8px';
                textareaRef.current.style.lineHeight = '1.4';
            }
        }
    };



    const uploadImage = async (file: File) => {
        setIsUploading(true);
        try {
            const res = await fileUpload(file);
            localStorage.setItem('imageUrl', res.info.path);
            handleNavigation();
            if (typeof onImageUpload === 'function') {
                onImageUpload();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    const handleNavigation = () => {
        //reload the page
        router.push('/snap');
    };



    // Detect mobile on client side
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        // Initial check
        checkMobile();

        // Listen for resize
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle mobile-specific optimizations
    useEffect(() => {
        if (textareaRef.current && message.trim() === '') {
            const initialHeight = isMobile ? 44 : 40;
            textareaRef.current.style.height = `${initialHeight}px`;
            textareaRef.current.style.paddingTop = isMobile ? '10px' : '8px';
            textareaRef.current.style.paddingBottom = isMobile ? '10px' : '8px';
            textareaRef.current.style.lineHeight = '1.4';
        }
    }, [message, isMobile]);



    return (
        <div className="flex flex-col items-center justify-around gap-3 w-full">
            <div className={`flex flex-row items-end justify-center gap-2 sm:gap-3 rounded-xl border border-(--black-2) [&:has(textarea:focus)]:border-(--brand-6) [&:has(textarea:focus)]:outline-4 [&:has(textarea:focus)]:outline-(--brand-3) w-full px-1 py-1 ${isDisabled ? 'bg-gray-200' : 'bg-white '}`}>
                <div className="flex flex-row items-end justify-start gap-2 sm:gap-4 w-full">
                    <button
                        onClick={handlePlusClick}
                        disabled={isUploading || isDisabled}
                        className="flex rounded-lg px-2 py-2 sm:px-2 sm:py-2 cursor-pointer hover:bg-(--brand-2) disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] items-center justify-center"
                    >
                        {isUploading ? (
                            <div className="w-6 h-6 sm:w-7 sm:h-7 animate-spin rounded-full border-2 border-(--brand-6) border-t-transparent"></div>
                        ) : (
                            <img className="w-6 h-6 sm:w-7 sm:h-7" src="plus.svg" alt="Upload image" />
                        )}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            // Auto-resize textarea with mobile considerations
                            const target = e.target;
                            const minHeight = isMobile ? 44 : 40; // Larger touch target on mobile
                            const maxHeight = isMobile ? 100 : 120; // Slightly smaller max on mobile

                            // Update padding to match style
                            target.style.paddingTop = isMobile ? '10px' : '8px';
                            target.style.paddingBottom = isMobile ? '10px' : '8px';
                            target.style.lineHeight = '1.4';

                            if (e.target.value.trim() === '') {
                                target.style.height = `${minHeight}px`;
                            } else {
                                target.style.height = 'auto';
                                target.style.height = Math.min(target.scrollHeight, maxHeight) + 'px';
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        disabled={isDisabled}
                        placeholder="Ask about your collectible..."
                        className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-base sm:text-lg text-left w-full border-0 resize-none overflow-hidden h-[44px] sm:h-[40px] max-h-[100px] sm:max-h-[120px] px-1 sm:px-0 leading-normal touch-manipulation"
                        style={{
                            fontSize: isMobile ? '16px' : undefined,
                            paddingTop: isMobile ? '10px' : '8px',
                            paddingBottom: isMobile ? '10px' : '8px',
                            lineHeight: '1.4'
                        }}
                        rows={1}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isDisabled || !message.trim()}
                        className="flex rounded-lg px-2 py-2 cursor-pointer hover:bg-(--brand-2) disabled:opacity-50 disabled:cursor-not-allowed transition-opacity min-w-[44px] min-h-[44px] items-center justify-center"
                        title="Send message"
                    >
                        <img className="w-6 h-6 sm:w-7 sm:h-7" src="send.svg" alt="Send" />
                    </button>
                    <button
                        disabled={isDisabled}
                        onClick={handleOpenCamera}
                        className="flex rounded-lg px-2 py-2 cursor-pointer hover:bg-(--brand-2) disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] items-center justify-center"
                    >
                        <img className="w-6 h-6 sm:w-7 sm:h-7" src="camera.svg" alt="Camera" />
                    </button>
                </div>
            </div>
        </div>
    )
}