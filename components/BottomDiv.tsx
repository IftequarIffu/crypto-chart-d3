/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import SummaryComponent from './SummaryComponent'
import StatisticsComponent from './StatisticsComponent'
import AnalyticsComponent from './AnalyticsComponent'
import SettingsComponent from './SettingsComponent'
import axios from 'axios'
import { COINGECKO_API_URL } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import ChartButtons from './ChartButtons'
import AreaChart from './AreaChart'
import Skeleton from 'react-loading-skeleton'


const BottomDiv = ({
  isFullScreen,
  changeTimeRange,
  selectedTimeRange,
  currentButton,
  toggleFullScreen
}: {
  isFullScreen: boolean,
  changeTimeRange: (item: any) => void,
  selectedTimeRange: any,
  currentButton: string,
  toggleFullScreen: () => void
}) => {

  function transformWholeData(data: any) {
    const transformedData = []

    for (let i = 0; i < data.prices.length; i++) {
      transformedData.push({
        "timeStamp": data.prices[i][0],
        "price": data.prices[i][1],
        "volume": data.total_volumes[i][1]
      })
    }

    return transformedData
  }

  const { isPending: isChartDataPending, error: isChartDataErrored, data: chartData } = useQuery({
    queryKey: [`timeRange-${selectedTimeRange.useQueryCacheKey}`],
    queryFn: async () => {
      const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${selectedTimeRange.useQueryCacheKey}`)
      const transformedData = transformWholeData(res.data)
      return transformedData
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    notifyOnChangeProps: "all",
  })

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
    <div className={`ps-12 pe-36 ${isFullScreen ? "w-[1200px] !important h-[600px] !important" : "w-[1000px] !important"}`}>

      {currentButton === "Chart" && <ChartButtons changeTimeRange={changeTimeRange} selectedTimeRange={selectedTimeRange} toggleFullScreen={toggleFullScreen} />}


      {currentButton === "Summary" && <SummaryComponent />}
      {currentButton === "Statistics" && <StatisticsComponent />}
      {currentButton === "Analytics" && <AnalyticsComponent />}
      {currentButton === "Settings" && <SettingsComponent />}

      {
        (() => {
          if((isChartDataPending || isChartDataPending)) {
            if(!isFullScreen) {
              return (
                <Skeleton width={"full"} height={400} />
              )
            }
            else {
              return (
                <Skeleton width={"full"} height={600} />
              )
            }
          }
          else {
            return null;
          }
        })()
      }


      {(isChartDataErrored || isChartDataErrored) ? <div className='flex justify-center h-full items-center'><h1>API error...</h1><h1>Please try again in sometime</h1></div> : null}

      {
        (() => {
          if(currentButton === "Chart" && !isChartDataPending && !isChartDataErrored &&
            !isCoinPriceDataPending && !isCoinPriceDataErrored) {

              if(selectedTimeRange.timeState === 180)
                return (
                  <AreaChart data={chartData.slice(Math.floor(chartData.length / 2))} currentPrice={coinPriceData.currentPrice} isFullScreen={isFullScreen} />
                )

              else if(selectedTimeRange.timeState === 30) 
                return (
                  <AreaChart data={chartData.slice(Math.floor(chartData.length / 12))} currentPrice={coinPriceData.currentPrice} isFullScreen={isFullScreen} />
              )
              
              else if(selectedTimeRange.timeState !== 180 && selectedTimeRange.timeState !== 30)
                return (
                  <AreaChart data={chartData} currentPrice={coinPriceData.currentPrice} isFullScreen={isFullScreen} />
              )
            }
        })()
      }

    </div>
  )
}

export default BottomDiv