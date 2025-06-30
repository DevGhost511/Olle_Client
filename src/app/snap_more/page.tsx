import ChattingInput from "@/components/ChattingInput"
import Menu from "@/components/Menu"
import PriButton from "@/components/PriButton"
import SecButton from "@/components/SecButton"
import Snap from "@/components/Snap"


export default function SnapMore() {
    return (
        <div className="flex flex-col sm:max-w-6xl w-screen h-screen py-4 sm:py-12 px-6 sm:px-12  mx-auto">
            <Menu />
            <div className="flex flex-1 flex-col items-center overflow-auto justify-start gap-32 w-full md:w-2xl mx-auto sm:px-15 py-6">



                <div className="flex flex-col justify-start items-center gap-4 w-full">
                    <img src="Logo/Logo.svg" alt="logo" />
                    <p className="font-Geist text-(--brand-6) font-medium text-2xl  text-center">
                        Your Collectible Expert.
                    </p>
                </div>
                <div className="flex flex-1 flex-col justify-start overflow-auto items-center gap-6 w-full">
                    <p className="text-2xl text-(--black-5) font-abril-fatface text-center">
                        Good, Snap Another?
                    </p>
                    <div className="flex flex-row justify-center items-center gap-4 w-full">
                        <PriButton text="Yes, Snap Another" />
                        <SecButton text="No, Go to Dashboard" />
                    </div>
                </div>
                <div className="w-full">
                    <Snap />
                </div>
            </div>


        </div>
    )
}