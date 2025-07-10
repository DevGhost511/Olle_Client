'use client'
import { useRouter } from "next/navigation";
import Menu from "@/components/Menu";
import ChattingInput from "@/components/ChattingInput";


const messageHistory = [
    {
        sender: "concierge",
        messageContent: "Certainly, I’ll discreetly check interest from our network. You’ll be the first to know.",
        time: "9:24 am, Today",
    },
    {
        sender: "me",
        messageContent: "We found a Philippe Naurilus 5711/1A in your area. Would you like to see it?",
        time: "3:00 am, Yesterday",
    },
    {
        sender: "concierge",
        messageContent: "Certainly, I’ll discreetly check interest from our network. You’ll be the first to know.",
        time: "9:24 am, Today",
    },
]


export default function Page() {

    const router = useRouter()
    const handleRouter = () => {
        router.push("/inbox")
    }

    return (
        <div className="flex flex-col sm:max-w-6xl w-screen h-dvh pt-2 sm:py-12 sm:px-12 mx-auto">
            <div className=" px-4 sm:px-0 w-full">
                <Menu collapse={false} />
            </div>
            <div className="relative flex flex-row justify-start items-center w-full px-4 sm:px-10 md:px-20 lg:px-40 py-4 sm:py-10">
                <div className="flex flex-col md:flex-row w-full justify-center items-center gap-2">
                    <p onClick={handleRouter} className="text-nowrap cursor-pointer font-abril-fatface text-xl text-(--black-4) underline underline-offset-1 text-center ">
                        My Inbox/
                    </p>
                    <p className="text-nowrap font-abril-fatface text-xl text-(--black-5) text-center">
                        Ferrari 275 GTB/4 ( Inquiries)
                    </p>
                </div>
                <div onClick={handleRouter} className="absolute cursor-pointer flex py-3 px-3 rounded-lg hover:bg-(--brand-2)">
                    <img src="/arrow.svg" alt="arrow" />
                </div>
            </div>
            <div className="flex flex-col flex-1 overflow-auto justify-center items-end w-full px-4 sm:px-10 md:px-20 lg:px-40 py-4">

                <div className="flex flex-col flex-1  w-full items-end justify-end">
                    {messageHistory.map((message, index) => {
                        if (message.sender === "concierge")
                            return (
                                <div key={index} className="flex flex-col w-full justify-start items-end gap-1">
                                    <div className="flex py-2 px-2 rounded-lg bg-(--brand-2) max-w-3/4">
                                        <p className="text-lg text-(--black-5)">{message.messageContent}</p>
                                    </div>
                                    <p className="text-md text-(--black-4)"> {message.time}</p>
                                </div>
                            )
                        else
                            return (
                                <div key={index} className="flex flex-col w-full justify-start items-start gap-1">
                                    <div className="flex py-2 px-2 rounded-lg bg-(--brand-2) max-w-3/4">
                                        <p className="text-lg text-(--black-5)">{message.messageContent}</p>
                                    </div>
                                    <p className="text-md text-(--black-4)"> {message.time}</p>
                                </div>
                            )
                    })}

                </div>

            </div>
            <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 py-4 sm:py-10 pt-4 pb-6 sm:p-0 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                <ChattingInput />
            </div>
        </div>
    )
}