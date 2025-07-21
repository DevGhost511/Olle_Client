'use client'
import Menu from "@/components/Menu"
import RareRate from "@/components/RareRate"
import SecButton from "@/components/SecButton"
import Valuation from "@/components/Valuation"
import Snap from "@/components/Snap"
import { useEffect, useState, useRef } from "react"
import Router from "next/navigation"
import { imageIdentify, olleAIChat } from "@/api/public"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


export default function Page() {

  

  const [chats, setChats] = useState<{ role: string, content: string }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleChats = (chat: { role: string, content: string }) => {
    setChats(prev => [...prev, chat]);
  };

  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chattingLoading, setChattingLoading] = useState<boolean>(false);
  const handleSetPrompt = async (prompt: string) => {
    setChattingLoading(true);
    handleChats({ role: 'user', content: prompt })
    const res = await olleAIChat(prompt);
    handleChats({ role: 'olleAI', content: res.message.content })
    setChattingLoading(false);
  };

  const [collectionName, setCollectionName] = useState<string>("");
  const [collectionPrice, setCollectionPrice] = useState<number[]>([]);
  const [collectionRareRate, setCollectionRareRate] = useState<number>(0);
  const [collectionDescription, setCollectionDescription] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      const imageUrl = localStorage.getItem('imageUrl');
      if (imageUrl) {
        setImage(process.env.NEXT_PUBLIC_API_URL + '/images/' + imageUrl);
        imageIdentify("https://beige-managerial-gull-792.mypinata.cloud/ipfs/bafybeifw2do4c2gfbrzdspxeepmuu3wolcbikcj2jaflfyt6swxbvnebui", "I just want to identify a collection in this image. Car, Watch or Art collection.  give me name(detailed model including), Rarerate, Price(10 numbers for every 6 monthes from 2020 to now ), one paragraph description(including produce date and where it is produced) about that. Rarerate should be one value of 1,2,3,4,5.  If this image doesn't include any collection answer there isn't any collection. No need any complex context. Only give me 3 words in this style: { \"name\" : String, \"price\": number[], \"rarerate\": number}, \"description\" : String,")
          .then(res => {
            console.log(res.message.content)
            const obj = JSON.parse(res.message.content)
            setCollectionName(obj.name);
            setCollectionPrice(obj.price);
            setCollectionRareRate(obj.rarerate);
            setCollectionDescription(obj.description)
            setIsLoading(false);
          });

      }
    }, 1000)
  }, [])



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
      <div  className="flex flex-1 flex-col w-full overflow-auto">
        {isLoading ? (<div className="flex flex-col flex-1 w-full">
          <div className="flex flex-col  items-center justify-start gap-4 w-full px-6 sm:px-15 py-6">
            <div className="flex flex-1 flex-col w-full justify-start pt-16 sm:pt-24 items-center gap-8">
              <p className="text-xl text-(--brand-6) font-medium text-center">
                Olle AI is thinking...
              </p>
              <div className="w-12 h-12 animate-spin rounded-full border-2 border-(--brand-6) border-t-transparent"></div>          </div>
          </div>
        </div>) : (
          (<div className="flex flex-col flex-1 overflow-auto w-full">
            <div className="flex flex-col  items-center justify-start gap-4 w-full px-6 sm:px-15 py-6">
              <div className="flex flex-wrap justify-center items-center gap-2 md:pt-6">
                <p className="sm:px-10 md:px-20 lg:px-40 font-abril-fatface w-fit text-(--black-5) font-semiblod text-2xl text-center">
                  {collectionName}
                </p>
              </div>
            </div>
            <div className="sm:px-10 md:px-20 lg:px-40 flex flex-col flex-1 rounded-2xl overflow-auto  items-center justify-start gap-3 px-4 w-full  ">
              <div className="w-full flex flex-col flex-1 overflow-auto gap-4 ">
                <div className="w-full flex flex-col ">
                  <img src={image} alt="Snap Image" className="rounded-xl w-full sm:w-full sm:h-80 h-80 object-cover border-1 border-(--brand-3)" />
                </div>
                {!determined ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-md text-(--black-4)">
                      {collectionDescription}
                    </p>
                    <p className="text-(--black-5) text-xl font-medium w-full text-center ">
                      Are you sure this is your collection?
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>

                )}
                <div className="flex flex-col w-full gap-4 py-2">
                  {
                    chats.map((chat, index) => {
                      return (
                        <div key={index} className={`flex flex-col w-full justify-start ${chat.role === 'user' ? `items-end` : `items-start`} gap-1 `}>
                          <div className="flex py-2 px-2 rounded-lg bg-(--brand-2) max-w-3/4">
                            <p className="text-lg text-(--black-5)">{chat.content}</p>
                          </div>
                        </div>
                      )
                    }
                    )
                  }
                </div>
              </div>
            </div>
          </div>)
        )}
        {determined && (
          <div className="flex flex-row p-4 gap-3 w-full sm:px-10 md:px-20 lg:px-40">
            <div className="flex flex-row justify-center w-full items-center gap-3">
              <SecButton text="Add to Collection" />
              <SecButton text="Add to Wishlist" />
            </div>
          </div>
        )}
      </div>


      <div className="flex flex-col w-full px-4 sm:px-10 md:px-20 lg:px-40 gap-4 pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">

        <Snap onChange={handleSetPrompt} collapse={!isLoading} />
      </div>
    </div>
  )
}