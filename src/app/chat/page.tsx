"use client"
import { useEffect, useRef, useState, Suspense } from "react";
import Menu from "@/components/Menu";
import Snap from "@/components/Snap";
import ReactMarkdown from "react-markdown";
import { olleAIChatsStreamWithoutImageAnalysis } from "@/api/public";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const ChatPageContent = () => {
    const [chats, setChats] = useState<{ role: 'user' | 'olleAI' | 'assistant', content: string }[]>([]);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [chattingLoading, setChattingLoading] = useState(false);
    const searchParams = useSearchParams();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const router = useRouter(); 
    const handleChats = (prompt: string) => {
        setChattingLoading(true);
        setChats([...chats, { role: 'user', content: prompt }]);


        let fullMessage = '';
        let receivedFirstChunk = false;

        olleAIChatsStreamWithoutImageAnalysis(
            threadId, // Use the threadId from state
            prompt,
            (chunk) => {
                if (!receivedFirstChunk) {
                    setChattingLoading(false);
                    receivedFirstChunk = true;
                }
                fullMessage += chunk;
                setChats(prev => {
                    if (prev.length && prev[prev.length - 1].role === 'olleAI') {
                        return [
                            ...prev.slice(0, -1),
                            { role: 'olleAI', content: fullMessage }
                        ];
                    } else {
                        return [...prev, { role: 'olleAI', content: fullMessage }];
                    }
                });
            },
            () => { }, // onStatus no-op
            () => {
                setChattingLoading(false);
            }
        );
    };

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop } = chatContainerRef.current;
            const isScrollable = scrollTop > 100;
            setCanScrollDown(isScrollable);
        }
    };

    useEffect(() => {
        if (searchParams.get('prompt')) {
            handleChats(searchParams.get('prompt') as string);
        }
    }, [searchParams]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chats, chattingLoading]);



    const scrollToTop = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };


    useEffect(() => {
        const container = chatContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [chattingLoading]);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div className="flex flex-col sm:max-w-6xl w-screen h-dvh pt-2 sm:py-12 sm:px-12 mx-auto">
            <div className="flex flex-row justify-between items-center px-4 sm:px-0">
                <Menu collapse={false} />
            </div>
            <div className="flex flex-col w-full justify-center items-center py-4 px-4 sm:px-10 md:px-20 lg:px-40">
                <div className="flex flex-row w-full justify-center items-center relative">
                    <Image src={"/arrow.svg"} alt="arrow" width={24} height={24} className="cursor-pointer absolute top-[50%] left-0 translate-y-[-50%]" onClick={() => router.back()} />
                    <div className="flex flex-col justify-center items-center w-full px-4">
                        <p className="text-xl text-center font-abril-fatface">Chat with Olle AI</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col overflow-auto gap-4 px-4 sm:px-10 md:px-20 lg:px-40">
                <div ref={chatContainerRef} className="flex flex-1 flex-col overflow-auto gap-4 ">

                    {
                        chats.map((chat: { role: 'user' | 'olleAI' | 'assistant', content: string }, index: number) => {
                            return (
                                <div key={index} className={`flex flex-col w-full justify-start ${chat.role === 'user' ? `items-end` : `items-start`} gap-1 `}>
                                    <div className="flex flex-col justify-start gap-2 py-2 px-2 rounded-lg bg-(--brand-2) max-w-4/5 ">
                                        {chat.role === 'olleAI' && (
                                            <img className="w-16" src="/Logo/olleAI.svg" alt="olle AI logo" />
                                        )}
                                        <p className="text-lg text-(--black-5)">{chat.role === 'olleAI' ? <ReactMarkdown>{chat.content}</ReactMarkdown> : chat.content}</p>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                    {chattingLoading && (
                        <div className="flex flex-col justify-start gap-2 py-2 px-2 rounded-lg bg-(--brand-2) w-fit max-w-3/4 text-lg text-(--brand-5)">
                            <img className="w-16" src="/Logo/olleAI.svg" alt="olle AI logo" />
                            <div className="flex flex-row gap-2 items-center justify-start">
                                <div className="w-4 h-4 animate-spin rounded-full border-1 border-(--brand-5) border-t-transparent"></div>

                                <p>olle is thinking...</p>
                            </div>
                        </div>
                    )}
                    {canScrollDown && (
                        <div className="sticky bottom-4 self-end mr-4 z-20">
                            <button
                                onClick={scrollToTop}
                                className="w-12 h-12 bg-white cursor-pointer border-1 border-(--brand-6) rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
                                aria-label="Scroll to top of chat"
                            >
                                <svg
                                    className="w-5 h-5 text-(--brand-6)"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full px-4 pt-4 pb-6 sm:p-b sm:pb-40 sm:px-20 md:px-30 lg:px-40 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                <Snap onChange={(prompt: string) => {
                    handleChats(prompt);
                }} isDisabled={chattingLoading} />
            </div>
        </div>
    )
}

const ChatPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatPageContent />
        </Suspense>
    );
};

export default ChatPage;