/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import AreaChart from "@/components/AreaChart";
import ChartButtons from "@/components/ChartButtons";
import SettingsComponent from "@/components/SettingsComponent";
import StatisticsComponent from "@/components/StatisticsComponent";
import SummaryComponent from "@/components/SummaryComponent";
import TopDiv from "@/components/TopDiv";
import { COINGECKO_API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AnalyticsComponent from "@/components/AnalyticsComponent";


export default function Home() {

  const [selectedTimeRange, setSelectedTimeRange] = useState(180)

  const [currentButton, setCurrentButton] = useState<string>("Chart")

  const [isFullScreen, setIsFullScreen] = useState(false)

  const changeTimeRange = (noOfDays : number) => {
    setSelectedTimeRange(noOfDays)
  }

  const changeCurrentButton = (button: string) => {
    setCurrentButton(button)
  }

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev)
  }

  function transformWholeData(data: any) {
    const transformedData =  []
  
    for(let i=0; i<data.prices.length; i++) {
      transformedData.push({
        "timeStamp": data.prices[i][0],
        "price": data.prices[i][1],
        "volume": data.total_volumes[i][1]
      })
    }
  
    return transformedData
  }
  

  const { isPending: isChartDataPending, error: isChartDataErrored, data: chartData } = useQuery({
    queryKey: [`timeRange-${selectedTimeRange}`],
    queryFn: async () => {
        const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${selectedTimeRange}`)
        // console.log("API call made")
        const transformedData = transformWholeData(res.data)
        return transformedData
    },
    staleTime: 5*60*1000,
    refetchInterval: 5*60*1000,
    notifyOnChangeProps: "all",
  })

  const { isPending: isCoinPriceDataPending, error: isCoinPriceDataErrored, data: coinPriceData } = useQuery({
    queryKey: [`price`],
    queryFn: async () => {
        const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin`)
        // console.log("API call made")
        // const transformedData = transformWholeData(res.data)
        const currentPrice = res.data.market_data.current_price.usd
        const priceChange24hr = res.data.market_data.price_change_24h
        const priceChangePerc24hr = res.data.market_data.price_change_percentage_24h
        return {
            currentPrice,
            priceChange24hr,
            priceChangePerc24hr
        }
    },
    staleTime: 2*60*1000,
    refetchInterval: 60*1000,
    notifyOnChangeProps: "all",
  })



  return (
    <div className="w-full h-screen flex items-center justify-center bg-stone-900 text-black font-sans">

      {/* Container div */}
      <div className="bg-white h-[700px]">

          {/* Top Div */}
          {!isCoinPriceDataPending && !isCoinPriceDataErrored && !isFullScreen &&
          <TopDiv coinPriceData={coinPriceData} currentButton={currentButton} changeCurrentButton={changeCurrentButton}   />}

              {
                  (() => {
                    if(isCoinPriceDataPending) {
                      return (
                        <div className="w-[80px] h-[210px]">

                        </div>
                      )
                    }
                  })()
                }
          
            <div className={`ps-12 pe-32 pb-4 ${isFullScreen ? "w-[1200px] !important h-[600px] !important" : "w-[1000px] !important"}`}>
              
                {currentButton === "Summary" && <SummaryComponent />}

                {currentButton === "Chart" && !isChartDataPending && !isChartDataErrored && 
                !isCoinPriceDataPending && !isCoinPriceDataErrored && 
                <>
                  <ChartButtons changeTimeRange={changeTimeRange} selectedTimeRange={selectedTimeRange} toggleFullScreen={toggleFullScreen}  />

                      {
                        (() => {
                          if(isChartDataPending || isCoinPriceDataPending) {
                            return (
                              <div className="w-[805px] h-[390px]">

                              </div>
                            )
                          }
                        })()
                      }
                    <AreaChart data={chartData} currentPrice={coinPriceData.currentPrice} isFullScreen={isFullScreen} />


                </>
                }

                {currentButton === "Statistics" && <StatisticsComponent />}

                {currentButton === "Analytics" && <AnalyticsComponent />}

                {currentButton === "Settings" && <SettingsComponent />}
               

            </div>
          
            
      </div>
       
       
    </div>
  );
}
