/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { convertIntegerToCommaFormat } from '@/lib/utils'
import { buttons, COINGECKO_API_URL } from '@/lib/constants'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TopDiv = ({ currentButton, changeCurrentButton }: { currentButton: string, changeCurrentButton: (button: string) => void }) => {

    const { isPending: isCoinPriceDataPending, error: isCoinPriceDataErrored, data: coinPriceData } = useQuery({
        queryKey: [`price`],
        queryFn: async () => {
            const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin`)
            const currentPrice = res.data.market_data.current_price.usd
            const priceChange24hr = res.data.market_data.price_change_24h
            const priceChangePerc24hr = res.data.market_data.price_change_percentage_24h
            return {
                currentPrice,
                priceChange24hr,
                priceChangePerc24hr
            }
        },
        staleTime: 30 * 1000,
        refetchInterval: 60 * 1000,
        notifyOnChangeProps: "all",
    })


    return (
        <div className="border-b space-y-3 ps-12 pe-32 pt-12">

            {isCoinPriceDataErrored && <p>An error occured...</p>}

            {isCoinPriceDataPending && <Skeleton width={230} height={84} />}
            {
                !isCoinPriceDataErrored && !isCoinPriceDataPending && (
                    <div className="space-y-1 font-medium font-circularstd">
                        <div className="flex gap-1 items-start">
                            <h1 className="text-6xl">{convertIntegerToCommaFormat(coinPriceData?.currentPrice)}</h1>
                            <sub className="text-gray-600/50 font-semibold text-2xl">USD</sub>
                        </div>
                        <div className={`flex gap-1 text-md font-medium ${coinPriceData?.priceChange24hr > 0 ? "text-green-600" : "text-red-600"}`}>
                            <p>
                                {coinPriceData?.priceChange24hr > 0 && "+"}
                                {coinPriceData?.priceChange24hr.toFixed(2)}
                            </p>
                            <p>({coinPriceData?.priceChangePerc24hr.toFixed(2)}%)</p>
                        </div>

                    </div>
                )
            }


            <div className="flex">
                {buttons.map((item, index) => (
                    <Link key={index}
                        href={"#"}
                        onClick={() => changeCurrentButton(item.name)}
                        className={`${index === 0 ? "ps-0 py-3 pe-3" : "p-3"}  ${item.name === currentButton && "font-semibold border-b-4 hover:text-black"}  border-[#4b40ee]`}>{item.name}</Link>
                ))}

            </div>


        </div>
    )
}

export default TopDiv