'use client'

import ChattingInput from "@/components/ChattingInput"
import Menu from "@/components/Menu"
import RareRate from "@/components/RareRate"
import SecButton from "@/components/SecButton"
import Valuation from "@/components/Valuation"

export default function Snap() {

  return (
    <div className="flex flex-col sm:max-w-6xl w-screen h-screen py-4 sm:py-12 px-6 sm:px-12  mx-auto">
      <Menu />
        <div className="flex flex-col items-center justify-start gap-4 w-full sm:px-15 py-6">
          <img src="Logo/mini_logo.svg" alt="mini logo" />
          <p className="font-Geist text-(--brand-6) font-medium text-xl text-center">
            Is this "Rolex Submariner Date 126610LN", right?
          </p>
        </div>

        <div className="flex flex-1 flex-col   items-center justify-start gap-3 overflow-auto w-full sm:px-15 ">

          <img src="Assets/car.jpg" alt="Snap Image" className=" w-full sm:w-full sm:h-100 h-80 object-cover border-1 border-(--brand-3)" />
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
        <div className="flex w-full sm:px-15">
          <ChattingInput/>
        </div>
    </div>
  )
}