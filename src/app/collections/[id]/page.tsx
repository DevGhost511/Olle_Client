'use client'
import { ICollection } from "@/types/collection";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCollection } from "@/api/private";
import Image from "next/image";
import Snap from "@/components/Snap";
import Tab from "@/components/Tab";
import { getChats, olleAIChatStream } from "@/api/public";
import ReactMarkdown from "react-markdown";
import RareRate from "@/components/RareRate";
import Valuation from "@/components/Valuation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const tabNames = ["OVERVIEW", "SPEC"];

const CollectionDetail = () => {
    const { id } = useParams();
    const [collection, setCollection] = useState<ICollection | null>(null);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabNames[0]);
    const [isStartChatting, setIsStartChatting] = useState<boolean>(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [chats, setChats] = useState<{ role: 'user' | 'olleAI' | 'assistant', content: string }[]>([]);
    const [chartData, setChartData] = useState<{ period: string, price: number }[]>([]);
    const [yAxisMax, setYAxisMax] = useState<number>(0);
    useEffect(() => {
        const fetchCollection = async (): Promise<ICollection | null> => {
            try {
                const collection = await getCollection(id as string) as ICollection;
                console.log(collection);
                setCollection(collection);
                setChartData(collection.price.map((price: number, index: number) => ({ period: index.toString(), price: price })));
                setYAxisMax(Math.max(...collection.price));
                return collection;
            } catch (error) {
                console.log(error);
                return null;
            }
        }
        fetchCollection().then((collection) => {
            if (collection) {
                setThreadId(collection.threadId);
                getChats(collection.threadId).then((chats) => {
                    //remove first two chats 
                    setChats(chats.reverse().slice(2).map((chat: any) => ({ role: chat.role, content: chat.content[0].text.value.replace(" Please respond in natural, conversational text format. Do not use JSON or structured data format. Just provide helpful - User: ", "") })));
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
    return (
        <div className="flex flex-col flex-1 overflow-y-auto justify-center items-center gap-4 w-full ">
            <div className="flex flex-row w-full justify-center relative items-center py-8 px-4 sm:px-10 md:px-20 lg:px-40">
                <Image src={"/arrow.svg"} alt="arrow" width={24} height={24} className="cursor-pointer absolute top-[50%] left-4 sm:left-10 md:left-20 lg:left-40 translate-y-[-50%]" onClick={() => router.back()} />
                <div className="flex flex-col justify-center items-center gap-4 w-full px-4 sm:px-10 md:px-20 lg:px-40">
                    <p className="text-2xl font-bold text-center"><span className="text-(--brand-5)">My Collections/</span>{collection?.name}</p>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full px-4 sm:px-10 md:px-20 lg:px-40">
                <Tab onChange={handleTabChange} tabNames={tabNames} className="my-2 sm:my-4 " containerClassName="w-full justify-start items-center gap-4" />
            </div>
            {/* Chat message */}
            <div className="flex flex-col flex-1 overflow-y-auto w-full gap-4 px-4 sm:px-10 md:px-20 lg:px-40">
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-6">
                        {activeTab === "OVERVIEW" && (
                            <>
                                <div className="flex sm:flex-row flex-col justify-center items-center gap-6 sm:gap-12 ">
                                    <div className="flex sm:flex-col flex-row w-full sm:w-1/3 lg:w-1/4 justify-between items-start gap-6">
                                        <Valuation value={collection?.valuation as number} />
                                        <RareRate rarerate={collection?.rarerate as number} iconsize={"w-7 h-7"} />
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
                                    {collection?.categories.slice(0, 5).map((category: { name: string, value: string }, index: number) => (
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
                                    <Valuation value={collection?.valuation as number} />
                                    <RareRate rarerate={collection?.rarerate as number} iconsize={"w-7 h-7"} />
                                </div>
                                <div className="flex flex-col py-4">
                                    {collection?.categories.map((category: { name: string, value: string }, index: number) => (
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
                    <div className="flex flex-col w-full gap-2">
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
                </div>
            </div>
            {/* Chat input */}
            <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 mt-4 pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                <Snap onChange={handleSetPrompt} />
            </div>
        </div>
    )
}

export default CollectionDetail;