/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import TopDiv from "@/components/TopDiv";
import { timeRanges } from "@/lib/constants";
import { useState } from "react";
import BottomDiv from "@/components/BottomDiv";


export default function Home() {

  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[4])

  const [currentButton, setCurrentButton] = useState<string>("Chart")

  const [isFullScreen, setIsFullScreen] = useState(false)

  const changeTimeRange = (item: any) => {
    setSelectedTimeRange(item)
  }

  const changeCurrentButton = (button: string) => {
    setCurrentButton(button)
  }

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev)
  }



  return (
    <div className="w-full h-screen flex items-center justify-center bg-stone-900 text-black font-sans">

      {/* Container div */}
      <div className="bg-white h-[700px]">

          {
            !isFullScreen && (<TopDiv currentButton={currentButton} changeCurrentButton={changeCurrentButton}   />)
          }
          
          
            {/* <div className={`ps-12 pe-32 pb-4 ${isFullScreen ? "w-[1200px] !important h-[600px] !important" : "w-[1000px] !important"}`}>
              
                {currentButton === "Summary" && <SummaryComponent />}

                {currentButton === "Chart" && !isChartDataPending && !isChartDataErrored && 
                !isCoinPriceDataPending && !isCoinPriceDataErrored && 
                <>
                  <ChartButtons changeTimeRange={changeTimeRange} selectedTimeRange={selectedTimeRange} toggleFullScreen={toggleFullScreen}  />

                  <AreaChart data={chartData} currentPrice={coinPriceData.currentPrice} isFullScreen={isFullScreen} />


                </>
                }

                {currentButton === "Statistics" && <StatisticsComponent />}

                {currentButton === "Analytics" && <AnalyticsComponent />}

                {currentButton === "Settings" && <SettingsComponent />}
               

            </div> */}
          
          <BottomDiv 
          isFullScreen={isFullScreen} 
          changeTimeRange={changeTimeRange}
          selectedTimeRange={selectedTimeRange}
          currentButton={currentButton}
          toggleFullScreen={toggleFullScreen}
           />
            
      </div>
       
       
    </div>
  );
}
