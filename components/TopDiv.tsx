/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { convertIntegerToCommaFormat } from '@/lib/utils'
import { buttons } from '@/lib/constants'
import Link from 'next/link'

const TopDiv = ({coinPriceData, currentButton, changeCurrentButton}: {coinPriceData: any, currentButton: string, changeCurrentButton: (button: string) => void}) => {
  return (
    <div className="border-b space-y-3 ps-12 pe-32 pt-12">

                
            <div className="space-y-1 font-semibold">
                <div className="flex gap-1 items-start">
                    <h1 className="text-6xl">{convertIntegerToCommaFormat(coinPriceData?.currentPrice)}</h1>
                    <p className="text-gray-600/50 font-semibold ">USD</p>
                </div>
                <div className={`flex gap-1 text-md font-semibold ${coinPriceData?.priceChange24hr > 0 ? "text-green-600" : "text-red-600"}`}>
                    <p>
                        {coinPriceData?.priceChange24hr > 0 && "+"}
                        {coinPriceData?.priceChange24hr.toFixed(2)}
                    </p>
                    <p>({coinPriceData?.priceChangePerc24hr.toFixed(2)}%)</p>
                </div>

            </div>
                
                

                <div className="flex">
                    {buttons.map((item, index) => (
                        <Link key={index} 
                        href={"#"} 
                        onClick={() => changeCurrentButton(item.name)}
                        className={`${index === 0 ? "ps-0 py-3 pe-3" : "p-3"}  ${item.name === currentButton && "font-semibold border-b-4 hover:text-black" }  border-[#4b40ee]`}>{item.name}</Link>
                    ))}

                </div>


            </div>
  )
}

export default TopDiv