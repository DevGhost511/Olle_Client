'use client'
import { ICollection } from "@/types/collection";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getWishList } from "@/api/private";
import Image from "next/image";
import Snap from "@/components/Snap";
import Tab from "@/components/Tab";
import { getChats, olleAIChatStream } from "@/api/public";
import ReactMarkdown from "react-markdown";
import RareRate from "@/components/RareRate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Valuation from "@/components/Valuation";
import { IWishList } from "@/types/wishList";

const tabNames = ["OVERVIEW", "SPEC"];

const DetailWishList = () => {
    const { id } = useParams();
    const [wishList, setWishList] = useState<IWishList | null>(null);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabNames[0]);
    const [isStartChatting, setIsStartChatting] = useState<boolean>(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [chats, setChats] = useState<{ role: 'user' | 'olleAI' | 'assistant', content: string }[]>([]);
    const [chartData, setChartData] = useState<{ period: string, price: number }[]>([]);
    const [yAxisMax, setYAxisMax] = useState<number>(0);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const fetchWishList = async (): Promise<IWishList | null> => {
            try {
                const wishList = await getWishList(id as string) as IWishList;
                console.log(wishList);
                setWishList(wishList);
                setChartData(wishList.price.map((price: number, index: number) => ({ period: index.toString(), price: price })));
                setYAxisMax(Math.max(...wishList.price));
                return wishList;
            } catch (error) {
                console.log(error);
                return null;
            }
        }
        fetchWishList().then((wishList) => {
            if (wishList) {
                setThreadId(wishList.threadId);
                getChats(wishList.threadId).then((chats) => {
                    //remove first two chats 
                    setChats(chats);
                }).catch((error) => {
                    console.log(error);
                });
                // setChats(prev => [...prev, { role: 'assistant', content: "Hello, I'm OlleAI, your personal assistant. How can I help you today?" }]);
            }
        });
    }, [id]);
    const handleSetPrompt = (prompt: string) => {
        if (isStartChatting) return;
        setChats(prev => [...prev, { role: 'user', content: prompt }]);
        handleIsStartChatting();

        // Immediately scroll to show the new user message
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 50);
        let fullMessage = '';
        let receivedFirstChunk = false;
        if (!threadId) {
            console.error('No threadId set for chat. Please analyze an image first.');
            setIsStartChatting(false);
            return;
        }
        olleAIChatStream(
            threadId, // Use the threadId from state
            prompt,
            (chunk) => {
                if (!receivedFirstChunk) {
                    setIsStartChatting(false);
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
                setIsStartChatting(false);
            }
        );
    }
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    }
    const handleIsStartChatting = () => {
        setIsStartChatting(true);
    }

    // Scroll detection and functionality
    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const isScrollable = scrollHeight > clientHeight;
            // Show button when scrolled down (more than 200px from top) AND content is scrollable
            const isNearTop = scrollTop < 200;
            const shouldShowButton = isScrollable && !isNearTop;

            // Debug logging (can be removed in production)
            // console.log('Scroll Debug:', { scrollTop, shouldShowButton });

            setCanScrollDown(shouldShowButton);
        }
    };

    const scrollToTop = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    // Add scroll listener
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener('scroll', handleScroll);
            // Check scroll state on mount
            handleScroll();
            return () => chatContainer.removeEventListener('scroll', handleScroll);
        }
    }, [chats]); // Re-run when chats change to ensure proper detection

    // Auto-scroll to bottom when new messages are added (focus on latest message)
    useEffect(() => {
        if (chatContainerRef.current && chats.length > 0) {
            // Always scroll to latest message
            setTimeout(() => {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTo({
                        top: chatContainerRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);

            // Re-check scroll state after content changes
            setTimeout(() => {
                handleScroll();
            }, 200);
        }
    }, [chats]);

    // Check scroll state when collection data loads
    useEffect(() => {
        if (wishList && chatContainerRef.current) {
            setTimeout(() => {
                handleScroll();
            }, 200);
        }
    }, [wishList]);

    useEffect(() => {
        let scrollAttempts = 0;
        let isImageHidden = false;
        let touchStartY = 0;
        let touchAttempts = 0;
        
        const handleWindowScroll = () => {
            const scrollY = window.scrollY;
            const image = imageRef.current;
            
            if (image) {
                // Define scroll threshold (adjust as needed)
                const scrollThreshold = 100;
                
                if (scrollY > scrollThreshold) {
                    // Fade out the image and collapse space when scrolling down
                    image.style.opacity = '0';
                    image.style.transform = 'translateY(-20px)';
                    image.style.height = '0';
                    image.style.marginBottom = '0';
                    image.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, height 0.3s ease-out, margin 0.3s ease-out';
                    isImageHidden = true;
                } else {
                    // Fade in the image and restore space when scrolling back up
                    image.style.opacity = '1';
                    image.style.transform = 'translateY(0)';
                    image.style.height = '192px'; // h-48 = 12rem = 192px
                    image.style.marginBottom = '';
                    image.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, height 0.3s ease-out, margin 0.3s ease-out';
                    isImageHidden = false;
                }
            }
        }
        
        // Desktop wheel event handling
        const handleWheel = (e: WheelEvent) => {
            const image = imageRef.current;
            const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
            
            // If window is not scrollable but user tries to scroll down
            if (!isScrollable && e.deltaY > 0 && !isImageHidden) {
                scrollAttempts++;
                
                // After 2 scroll attempts, hide the image
                if (scrollAttempts >= 2) {
                    if (image) {
                        image.style.opacity = '0';
                        image.style.transform = 'translateY(-20px)';
                        image.style.height = '0';
                        image.style.marginBottom = '0';
                        image.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, height 0.3s ease-out, margin 0.3s ease-out';
                        isImageHidden = true;
                    }
                }
            }
            // Reset scroll attempts if scrolling up
            else if (e.deltaY < 0) {
                scrollAttempts = 0;
                if (isImageHidden && image) {
                    image.style.opacity = '1';
                    image.style.transform = 'translateY(0)';
                    image.style.height = '192px'; // h-48 = 12rem = 192px
                    image.style.marginBottom = '';
                    image.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, height 0.3s ease-out, margin 0.3s ease-out';
                    isImageHidden = false;
                }
            }
        }
        
        // Mobile touch event handling
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        }
        
        const handleTouchMove = (e: TouchEvent) => {
            const image = imageRef.current;
            const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
            const currentY = e.touches[0].clientY;
            const deltaY = touchStartY - currentY;
            
            // If window is not scrollable and user swipes down (trying to scroll)
            if (!isScrollable && deltaY > 30 && !isImageHidden) { // 30px threshold for swipe
                touchAttempts++;
                
                // After 2 swipe attempts, hide the image
                if (touchAttempts >= 2) {
                    if (image) {
                        image.style.opacity = '0';
                        image.style.transform = 'translateY(-20px)';
                        image.style.height = '0';
                        image.style.marginBottom = '0';
                        image.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, height 0.3s ease-out, margin 0.3s ease-out';
                        isImageHidden = true;
                    }
                }
            }
            // Reset touch attempts if swiping up
            else if (deltaY < -30) {
                touchAttempts = 0;
                if (isImageHidden && image) {
                    image.style.opacity = '1';
                    image.style.transform = 'translateY(0)';
                    image.style.height = '192px'; // h-48 = 12rem = 192px
                    image.style.marginBottom = '';
                    image.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, height 0.3s ease-out, margin 0.3s ease-out';
                    isImageHidden = false;
                }
            }
        }
        
        const handleTouchEnd = () => {
            touchStartY = 0;
        }
        
        // Add event listeners for both desktop and mobile
        window.addEventListener('scroll', handleWindowScroll);
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        }
    }, []);
    
    return (
        <div className="flex flex-col flex-1 overflow-y-auto justify-center items-center gap-4 w-full ">
            <div className="flex flex-row w-full justify-center relative items-center py-4 px-4 sm:px-10 md:px-20 lg:px-40 gap-4">
                <Image src={"/arrow.svg"} alt="arrow" width={24} height={24} className="cursor-pointer absolute top-[50%] left-4 sm:left-10 md:left-20 lg:left-40 translate-y-[-50%]" onClick={() => router.back()} />
                <div className="flex flex-col justify-center items-center gap-4 w-full px-4 sm:px-10 md:px-20 lg:px-40">
                    <p className="md:text-2xl text-xl font-bold text-center font-abril-fatface"><span className="text-(--brand-5)">My WishList/</span>{wishList?.name}</p>
                </div>
            </div>
            <div className="flex flex-row w-full justify-center relative items-center px-4 sm:px-10 md:px-20 lg:px-40">
                <img ref={imageRef} src={process.env.NEXT_PUBLIC_API_URL + '/' + wishList?.imageURL} alt="collection" className="w-full h-48 object-cover rounded-xl" />
            </div>
            <div className="flex flex-col justify-start items-start w-full px-4 sm:px-10 md:px-20 lg:px-40">
                <Tab onChange={handleTabChange} tabNames={tabNames} className="my-2 sm:my-4 " containerClassName="w-full justify-start items-center gap-4" />
            </div>
            {/* Chat message */}
            <div className="flex flex-col flex-1 overflow-y-auto w-full gap-4 px-4 sm:px-10 md:px-20 lg:px-40">

                <div className="flex flex-col flex-1 relative overflow-y-auto" ref={chatContainerRef}>
                    <div className="flex flex-col gap-6">
                        {activeTab === "OVERVIEW" && (
                            <>
                                <div className="flex sm:flex-row flex-col justify-center items-center gap-6 sm:gap-12 ">
                                    <div className="flex sm:flex-col flex-row w-full sm:w-1/3 lg:w-1/4 justify-between items-start gap-6">
                                        <Valuation value={wishList?.valuation as number} />
                                        <RareRate rarerate={wishList?.rarerate as number} iconsize={"w-7 h-7"} />
                                    </div>
                                    <div className="flex h-40 sm:h-40 w-full">
                                        <ResponsiveContainer className="w-full flex items-start sm:items-start justify-start">
                                            <BarChart
                                                data={chartData}
                                                margin={{
                                                    top: 0,
                                                    right: 24,
                                                    left: 8,
                                                    bottom: 0,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis
                                                    dataKey="period"
                                                    tick={{ fontSize: 14 }}
                                                    textAnchor="end"
                                                    height={24}
                                                    angle={0}
                                                />
                                                <YAxis
                                                    domain={[0, yAxisMax]}
                                                    tick={{ fontSize: 14 }}
                                                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                                                />
                                                <Tooltip
                                                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                                                    labelStyle={{ color: '#333' }}
                                                    contentStyle={{
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Bar
                                                    dataKey="price"
                                                    fill="var(--brand-5, #80725E)"
                                                    radius={[2, 2, 0, 0]}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="flex flex-col py-4">
                                    {wishList?.categories.slice(0, 5).map((category: { name: string, value: string }, index: number) => (
                                        <div key={index} className={`flex flex-row justify-between items-center p-2 rounded-lg ${index % 2 === 0 ? 'bg-[#EFECE0]' : ''}`}>
                                            <div className="flex-1 flex flex-row justify-start items-center gap-2">
                                                <p className="text-sm text-(--black-5) font-normal">{category.name}</p>
                                            </div>
                                            <div className="flex-1 flex flex-row items-center gap-2">
                                                <p className="text-sm text-(--black-5) font-normal">{category.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {activeTab === "SPEC" && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row w-full justify-between gap-6">
                                    <Valuation value={wishList?.valuation as number} />
                                    <RareRate rarerate={wishList?.rarerate as number} iconsize={"w-7 h-7"} />
                                </div>
                                <div className="flex flex-col py-4">
                                    {wishList?.categories.map((category: { name: string, value: string }, index: number) => (
                                        <div key={index} className={`flex flex-row justify-between items-center p-2 rounded-lg ${index % 2 === 0 ? 'bg-[#EFECE0]' : ''}`}>
                                            <div className="flex-1 flex flex-row justify-start items-center gap-2">
                                                <p className="text-sm text-(--black-5) font-normal">{category.name}</p>
                                            </div>
                                            <div className="flex-1 flex flex-row items-center gap-2">
                                                <p className="text-sm text-(--black-5) font-normal">{category.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col w-full gap-4 relative">
                        <p className="font-abril-fatface text-xl text-(--black-5) text-center w-full">
                            Chat with Olle AI
                        </p>



                        {
                            chats.map((chat: { role: 'user' | 'olleAI' | 'assistant', content: string }, index: number) => {
                                return (
                                    <div key={index} className={`flex flex-col w-full justify-start ${chat.role === 'user' ? `items-end` : `items-start`} gap-1 `}>
                                        <div className="flex flex-col justify-start gap-2 py-2 px-2 rounded-lg bg-(--brand-2) max-w-4/5 ">
                                            {chat.role === 'olleAI' || chat.role === 'assistant' && (
                                                <img className="w-16" src="/Logo/olleAI.svg" alt="olle AI logo" />
                                            )}
                                            <p className="text-lg text-(--black-5)">{chat.role === 'olleAI' ? <ReactMarkdown>{chat.content}</ReactMarkdown> : chat.content}</p>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                        {isStartChatting && (
                            <div className="flex flex-col justify-start gap-2 py-2 px-2 rounded-lg bg-(--brand-2) w-fit max-w-3/4 text-lg text-(--brand-5)">
                                <img className="w-16" src="/Logo/olleAI.svg" alt="olle AI logo" />
                                <div className="flex flex-row gap-2 items-center justify-start">
                                    <div className="w-4 h-4 animate-spin rounded-full border-1 border-(--brand-5) border-t-transparent"></div>

                                    <p>olle is thinking...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Fixed scroll button within chat messages area */}
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
            {/* Chat input */}
            <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 mt-4 pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                <Snap onChange={handleSetPrompt} />
            </div>



        </div>
    )
}

export default DetailWishList;