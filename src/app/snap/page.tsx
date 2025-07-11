'use client'

import ChattingInput from "@/components/ChattingInput"
import Menu from "@/components/Menu"
import RareRate from "@/components/RareRate"
import SecButton from "@/components/SecButton"
import Valuation from "@/components/Valuation"
import Snap from "@/components/Snap"

export default function Page() {

  return (
    <div className="flex flex-col sm:max-w-6xl w-screen h-dvh pt-4 sm:py-12 sm:px-12  mx-auto">
      <div className="w-full px-4 sm:px-0">
        <Menu collapse={true} />
      </div>
      <div className="flex flex-col  items-center justify-start gap-4 w-full px-6 sm:px-15 py-6">
        <img src="Logo/mini_logo.svg" alt="mini logo" />
        <div className="flex flex-wrap justify-center items-center gap-2">
          <p className="font-Geist text-(--black-5) font-medium text-md text-center">
            Is this
          </p>
          <p className="font-Geist text-(--black-5) font-semiblod text-xl text-center">
            Rolex Submariner Date 126610LN
          </p>
          <p className="font-Geist text-(--black-5) font-medium text-md text-center">
            right?
          </p>

        </div>
      </div>

      <div className="sm:px-10 md:px-20 lg:px-40 flex flex-col flex-1 rounded-2xl overflow-auto  items-center justify-start gap-3 px-4 w-full  ">
        <div className="w-full flex flex-col flex-1 overflow-auto gap-4 ">
          <img src="Assets/car2.jpg" alt="Snap Image" className="rounded-xl w-full sm:w-full sm:h-80 h-80 object-cover border-1 border-(--brand-3)" />
          <div className="flex flex-row items-center justify-around gap-2 sm:gap-3 w-full">
            <SecButton text="Add to Collection" />
            <SecButton text="Add to Wishlist" />
          </div>
          <div className="flex sm:flex-row flex-col justify-center items-center gap-6 ">
            <div className="flex sm:flex-col flex-row w-full sm:w-1/3 lg:w-1/5 justify-between items-start gap-6">
              <Valuation value={12500} />
              <RareRate rarerate={4} />
            </div>
            <div className="flex-1">
              <img className="w-full object-right-top" src="Assets/GraphDemo.png" alt="Graph" />

            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 pt-4 pb-6 sm:pt-4 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
        <Snap />
      </div>
    </div>
  )
}