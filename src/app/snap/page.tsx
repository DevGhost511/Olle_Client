'use client'
import Menu from "@/components/Menu"
import RareRate from "@/components/RareRate"
import SecButton from "@/components/SecButton"
import Valuation from "@/components/Valuation"
import Snap from "@/components/Snap"
import { useEffect, useState, useRef } from "react"
import { imageIdentify, olleAIChatStream } from "@/api/public"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useRouter } from "next/navigation"
import ReactMarkdown from 'react-markdown';

export default function Page() {

  const router = useRouter();
  const handleSignupNavication = () => {
    router.push("/signup");
  }
  const [chats, setChats] = useState<{ role: string, content: string }[]>([]);
  const [showScrollButtons, setShowScrollButtons] = useState<boolean>(false);
  const [canScrollUp, setCanScrollUp] = useState<boolean>(false);
  const [canScrollDown, setCanScrollDown] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chattingLoading, setChattingLoading] = useState<boolean>(false);
  const [isStartChatting, setIsStartChatting] = useState<boolean>(false);
  const [collectionName, setCollectionName] = useState<string>("");
  const [collectionPrice, setCollectionPrice] = useState<number[]>([]);
  const [collectionRareRate, setCollectionRareRate] = useState<number>(0);
  const [collectionDescription, setCollectionDescription] = useState<string>("");
  // Add threadId state
  const [threadId, setThreadId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      console.log("chats updated")
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [chats]);

  const handleChats = (chat: { role: string, content: string }) => {
    setChats(prev => [...prev, chat]);
  };


  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isScrollable = scrollHeight > clientHeight;

      setShowScrollButtons(isScrollable);
      setCanScrollUp(scrollTop > 100); // Show up arrow when scrolled down more than 100px
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 100); // Show down arrow when not near bottom
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };


  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isLoading]);

  const handleIsStartChatting = () => {
    setIsStartChatting(true);
  }

  const handleSetPrompt = (prompt: string) => {
    setChattingLoading(true);
    handleChats({ role: 'user', content: prompt });
    handleIsStartChatting();

    let fullMessage = '';
    let receivedFirstChunk = false;
    if (!threadId) {
      console.error('No threadId set for chat. Please analyze an image first.');
      setChattingLoading(false);
      return;
    }
    olleAIChatStream(
      threadId, // Use the threadId from state
      `Please respond in natural, conversational text format. Do not use JSON or structured data format. Just provide helpful - User: ${prompt}`,
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

  useEffect(() => {
    setTimeout(() => {
      const imageUrl = localStorage.getItem('imageUrl');
      if (imageUrl) {
        // setImage(process.env.NEXT_PUBLIC_API_URL + '/images/' + imageUrl)
        setImage('https://beige-managerial-gull-792.mypinata.cloud/ipfs/bafybeifw2do4c2gfbrzdspxeepmuu3wolcbikcj2jaflfyt6swxbvnebui');
        setIsLoading(true);
        const prompt =
          `Analyze this image to identify if it contains a collectible item from these categories: Car, Watch, or Art. 

        If a collectible is found, provide:
        - name: Detailed model/title including brand and specific model
        - rarerate: Rarity score from 1 (common) to 5 (extremely rare)
        - price: Array of 10 estimated market values in USD (6-month intervals from 2020 to now)
        - description: One paragraph including production date, origin, and key details

        If no collectible is identified, return: {"message": "No collectible found"}

        Response format (JSON only, no additional text):
        {
          "name": "string",
          "rarerate": number,
          "price": [number array],
          "description": "string"
        }`
        // imageIdentify(null, "I just want to identify a collection in this image. Car, Watch or Art collection.  give me name(detailed model including), Rarerate, Price(10 numbers for every 6 monthes from 2020 to now ), one-paragraph Description(including produce date and where it is produced) about that. Rarerate should be one value of 1,2,3,4,5.  If this image doesn't include any collection answer there isn't any collection. No need any complex context. Only give me 3 words in this style so that I can parse to json it: { \"name\" : String, \"price\": number[], \"rarerate\": number, \"description\" : String } ", process.env.NEXT_PUBLIC_API_URL + '/images/' + imageUrl)
        // imageIdentify(null, prompt, process.env.NEXT_PUBLIC_API_URL + '/images/' + imageUrl)
        imageIdentify(null, prompt, "https://beige-managerial-gull-792.mypinata.cloud/ipfs/bafybeifw2do4c2gfbrzdspxeepmuu3wolcbikcj2jaflfyt6swxbvnebui")
          .then(res => {
            setThreadId(res.threadId); // Save the new threadId
            let obj = null;
            try {
              obj = res.reply
              setCollectionName(obj.name);
              setCollectionPrice(obj.price);
              setCollectionRareRate(obj.rarerate);
              setCollectionDescription(obj.description)
            } catch (err) {
              console.error(err);
              setCollectionName("No collection");
              setCollectionPrice([]);
              setCollectionRareRate(0);
              setCollectionDescription("");
            }

            setIsLoading(false);
          }).catch(err => {
            console.error(err);
            setIsLoading(false);
          });
      }
    }, 1000)
  }, [])

  // Reset threadId when a new image is uploaded (listen to imageUrl change in localStorage)
  // useEffect(() => {
  //   const handleStorage = (event: StorageEvent) => {
  //     if (event.key === 'imageUrl') {
  //       setThreadId(null);
  //       setChats([]);
  //       setCollectionName("");
  //       setCollectionPrice([]);
  //       setCollectionRareRate(0);
  //       setCollectionDescription("");
  //       setIsStartChatting(false);
  //       setDetermined(false);
  //     }
  //   };
  //   window.addEventListener('storage', handleStorage);
  //   return () => window.removeEventListener('storage', handleStorage);
  // }, []);


  const generateChartData = () => {
    const chartData = [];
    const now = new Date();
    for (let i = collectionPrice.length - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setFullYear(date.getFullYear() - i);
      chartData.push({
        period: `${date.getFullYear()}`,
        price: collectionPrice[collectionPrice.length - 1 - i] || 0
      });
    }
    return chartData;
  };
  const getYAxisMax = () => {
    if (collectionPrice.length === 0) return 1000;
    const maxPrice = Math.max(...collectionPrice);
    return Math.ceil((maxPrice * 1.2) / 4) * 4;
  };
  const chartData = generateChartData();
  const yAxisMax = getYAxisMax();


  const [determined, setDetermined] = useState<boolean>(false);
  const handleDetermine = () => {
    setDetermined(true);
  };

  return (
    <div className="flex flex-col sm:max-w-6xl w-screen h-dvh pt-4 sm:py-12 sm:px-12  mx-auto">
      <div className="w-full px-4 sm:px-0">
        <Menu collapse={false} />
      </div>
      {!isLoading && (
        <div className="flex flex-col  items-center justify-start gap-4 w-full px-6 sm:px-15 py-6">
          <p className="sm:px-10 md:px-20 lg:px-40 font-abril-fatface w-fit text-(--black-5) font-semiblod text-2xl text-center">
            {collectionName}
          </p>
        </div>
      )}

      {showScrollButtons && !isLoading && (
        <div className={`sm:hidden fixed right-4 sm:right-130 top-3/4 transform -translate-y-1/4 flex flex-col gap-2 z-50`}>
          {canScrollUp && (
            <button
              onClick={scrollToTop}
              className="w-16 h-16 bg-white cursor-pointer border-1  border-(--brand-6) rounded-full  flex items-center justify-center transition-all duration-200 hover:scale-105"
              aria-label="Scroll to top"
            >
              <svg
                className="w-6 h-6 text-(--brand-6)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}

        </div>
      )}


      <div className="flex flex-1 flex-col w-full overflow-auto">
        {isLoading ? (<div className="flex flex-col flex-1 w-full">
          <div className="flex flex-col  items-center justify-start gap-4 w-full px-6 sm:px-15 py-6">
            <div className="flex flex-1 flex-col w-full justify-start pt-16 sm:pt-24 items-center gap-8">
              <p className="text-xl text-(--brand-6) font-medium text-center">
                Olle AI is thinking...
              </p>
              <div className="w-12 h-12 animate-spin rounded-full border-4 border-(--brand-5) border-t-transparent"></div>          </div>
          </div>
        </div>) : (
          (<div ref={containerRef} className="flex flex-col flex-1 overflow-auto w-full">

            <div className={`sm:px-10 md:px-20 lg:px-40 flex flex-col ${determined && `flex-1`} rounded-2xl items-center justify-start gap-3 px-4 w-full`}>
              <div className="w-full flex flex-col flex-1 overflow-auto gap-4 ">
                <div className={`w-full flex flex-col ${!determined && `flex-1 overflow-auto`} gap-4`}>
                  <img src={image} alt="Snap Image" className="rounded-xl w-full sm:w-full sm:h-80 h-80 object-cover border-1 border-(--brand-3)" />
                  {!determined && (
                    <p className="text-md text-(--black-4)">
                      {collectionDescription}
                    </p>
                  )}

                </div>
                {!determined ? (
                  <div className="flex flex-col gap-4">

                    <p className="text-(--black-5) text-xl font-medium w-full text-center ">
                      Is this correct?
                    </p>
                    <div className="flex flex-row justify-center w-full items-center gap-3">
                      <SecButton text="Yes" onClick={handleDetermine} />
                      <SecButton text="No, I let you know" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex sm:flex-row flex-col justify-center items-center gap-6 sm:gap-12 ">
                      <div className="flex sm:flex-col flex-row w-full sm:w-1/3 lg:w-1/4 justify-between items-start gap-6">
                        <Valuation value={collectionPrice[0]} />
                        <RareRate rarerate={collectionRareRate} iconsize={"w-7 h-7"} />
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
                    <p className="text-md text-(--black-4)">
                      {collectionDescription}
                    </p>
                  </div>

                )}
                <div className="flex flex-col w-full gap-4 py-2">
                  {
                    isStartChatting && (
                      <p className="font-abril-fatface text-xl text-(--black-5) text-center w-full">
                        Chat with Olle AI
                      </p>
                    )
                  }


                  {
                    chats.map((chat, index) => {
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

                  {determined && isStartChatting && chattingLoading && (
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
          </div>)
        )}
        {determined && (
          <div className="flex flex-row p-4 gap-3 w-full sm:px-10 md:px-20 lg:px-40">
            <div className="flex flex-row justify-center w-full items-center gap-3">
              <SecButton text="Add to Collection" onClick={handleSignupNavication} />
              <SecButton text="Add to Wishlist" onClick={handleSignupNavication} />
            </div>
          </div>
        )}
      </div>

      {!isLoading && determined && (
        <div className="flex flex-col w-full px-4 sm:px-10 md:px-20 lg:px-40 gap-4 pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
          <Snap onChange={handleSetPrompt}
            onImageUpload={() => {
              setThreadId(null);
              setChats([]);
              setCollectionName("");
              setCollectionPrice([]);
              setCollectionRareRate(0);
              setCollectionDescription("");
              setIsStartChatting(false);
              setDetermined(false);
            }}
          />
        </div>
      )}

    </div>
  )
}