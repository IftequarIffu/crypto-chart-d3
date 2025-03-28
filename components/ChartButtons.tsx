/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { timeRanges } from '@/lib/constants'
import { AiOutlineArrowsAlt, AiOutlinePlusCircle } from 'react-icons/ai'

const ChartButtons = ({ changeTimeRange, selectedTimeRange, toggleFullScreen }: { changeTimeRange: (noOfDays: any) => void, selectedTimeRange: any, toggleFullScreen: () => void }) => {
    return (
        <div className="flex justify-between mt-8 mb-4 text-black/60 ">

            <div className="flex  space-x-4">

                <div className="flex space-x-1 items-center cursor-pointer font-medium hover:text-black/80" onClick={toggleFullScreen}>
                    <AiOutlineArrowsAlt />
                    <p>Fullscreen</p>
                </div>


                <div className="flex space-x-1 items-center cursor-pointer font-medium bg-stone-100 px-2 hover:cursor-default">
                    <AiOutlinePlusCircle />
                    <p>Compare</p>
                </div>
            </div>

            {/* Time Ranges */}
            <div className="flex space-x-2">
                {timeRanges.map((item, index) => (
                    <button key={index}
                        disabled={item.timeState === 0}
                        onClick={() => {
                            if (item.timeState !== 0)
                                changeTimeRange(item)
                        }} className={`px-2 rounded-sm font-medium text-black/50 ${item.timeState === 0 && "bg-stone-100"} ${item.timeState !== 0 && "hover:text-black/80"} ${selectedTimeRange.timeState === item.timeState && 'bg-[#4b40ee] text-white hover:text-white'}`}>
                        {item.text}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default ChartButtons