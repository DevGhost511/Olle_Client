"use client"
import Menu from "@/components/Menu";

const ChatPage = () => {
    return (
        <div className="flex flex-col sm:max-w-6xl w-screen h-dvh pt-2 sm:py-12 sm:px-12 mx-auto">
                <div className="flex flex-row justify-between items-center px-4 sm:px-0">
                    <Menu collapse={false} />
                </div>
                <div className="flex flex-1 flex-col overflow-auto gap-4 px-4 sm:px-10 md:px-20 lg:px-40">
                    <div className="flex flex-col justify-center items-center text-center pt-8 pb-4 flex-shrink-0">
                        <p className="text-xl text-(--black-5) font-abril-fatface ">Chat</p>
                    </div>
                </div>
            </div>  
    )
}

export default ChatPage;