import React from 'react'
import SummaryComponent from './SummaryComponent'
import StatisticsComponent from './StatisticsComponent'
import AnalyticsComponent from './AnalyticsComponent'
import SettingsComponent from './SettingsComponent'
import axios from 'axios'
import { COINGECKO_API_URL } from '@/lib/constants'
import { QueryClient, useQuery } from '@tanstack/react-query'
import ChartButtons from './ChartButtons'
import AreaChart from './AreaChart'
import Skeleton from 'react-loading-skeleton'
import { queryClient } from '@/providers'
import { QueryCache } from '@tanstack/react-query'


const BottomDiv = ({
    isFullScreen, 
    changeCurrentButton, 
    changeTimeRange, 
    selectedTimeRange, 
    currentButton,
    toggleFullScreen
} : {
    isFullScreen: boolean,
    changeCurrentButton: (button: string) => void,
    changeTimeRange: (noOfDays: number) => void,
    selectedTimeRange: number,
    currentButton: string,
    toggleFullScreen: () => void
}) => {

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
        staleTime: 2*60*1000,
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
        staleTime: 30*1000,
        refetchInterval: 60*1000,
        notifyOnChangeProps: "all",
      })

    //   const fullYearData = queryClient.getQueryData(["timeRange-360"])
    //   console.log("FullYearData: ", fullYearData)
    //   const fullYearDataLength = fullYearData.length
    //   const halfYearDataLength = Math.ceil(fullYearDataLength/2)
    //   const halfYearData = fullYearData.slice(halfYearDataLength)

    // const queryCache = new QueryCache({
    //     onError: (error) => {
    //       console.log(error)
    //     },
    //     onSuccess: (data) => {
    //       console.log(data)
    //     },
    //     onSettled: (data, error) => {
    //       console.log(data, error)
    //     },
    //   })
      
    //   const query = queryCache.find(['timeRange-360'])

    //   console.log("Query: ", query)



    return (
            <div className={`ps-12 pe-32 pb-4 ${isFullScreen ? "w-[1200px] !important h-[600px] !important" : "w-[1000px] !important"}`}>
              
              {currentButton === "Chart" && <ChartButtons changeTimeRange={changeTimeRange} selectedTimeRange={selectedTimeRange} toggleFullScreen={toggleFullScreen}  />}


                {currentButton === "Summary" && <SummaryComponent />}
                {currentButton === "Statistics" && <StatisticsComponent />}
                {currentButton === "Analytics" && <AnalyticsComponent />}
                {currentButton === "Settings" && <SettingsComponent />}
                
                
                {isCoinPriceDataPending && <Skeleton width={"full"} height={400} />}

                {isChartDataPending && <Skeleton width={"full"} height={400} />}

                {/* {currentButton === "Chart" && !isChartDataPending && !isChartDataErrored && 
                !isCoinPriceDataPending && !isCoinPriceDataErrored && selectedTimeRange === 180 &&
                
                  <AreaChart data={halfYearData} currentPrice={coinPriceData.currentPrice} isFullScreen={isFullScreen} />
                } */}

                {currentButton === "Chart" && !isChartDataPending && !isChartDataErrored && 
                !isCoinPriceDataPending && !isCoinPriceDataErrored && 
                
                  <AreaChart data={chartData} currentPrice={coinPriceData.currentPrice} isFullScreen={isFullScreen} />
                }

            </div>
  )
}

export default BottomDiv