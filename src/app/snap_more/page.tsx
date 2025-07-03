import ChattingInput from "@/components/ChattingInput"
import Menu from "@/components/Menu"
import PriButton from "@/components/PriButton"
import SecButton from "@/components/SecButton"
import Snap from "@/components/Snap"


export default function SnapMore() {
    return (
        <div className="flex flex-col sm:max-w-6xl w-screen h-screen sm:py-12 sm:px-12  mx-auto">
            <div className="px-4 sm:px-0 py-4">
            <Menu collapse={true} />
            </div>
            
            <div className="flex flex-1 flex-col items-center overflow-auto justify-start w-full md:w-2xl mx-auto sm:px-15 ">
                <div className="flex flex-col flex-1 justify-center items-center gap-8 w-full px-4 pt-12">
                <div className="flex flex-col justify-start items-center gap-4 w-full">
                    <img src="Logo/mini_logo.svg" alt="logo" />
                    <p className="font-Geist text-(--brand-6) font-medium text-lg  text-center">
                        Your Collectible Expert.
                    </p>
                </div>
                <div className="flex flex-1 flex-col justify-start overflow-auto items-center gap-6 w-full">
                    <p className="text-xl text-(--black-5) font-abril-fatface text-center">
                        Good, Snap Another?
                    </p>
                    <div className="flex flex-row justify-center items-center gap-3 w-full">
                        <PriButton text="Yes, Snap Another" />
                        <SecButton text="No, Go to Dashboard" />
                    </div>
                </div>
                </div>
                <div className="w-full px-4 sm:px-15 pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                    <Snap />
                </div>
            </div>


        </div>
    )
}  
