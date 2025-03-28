/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function transformWholeData(data: any) {

  const transformedData =  []

  for(let i=0; i<data.prices.length; i++) {
    transformedData.push({
      timestamp: data.prices[i][0],
      price: data.prices[i][1],
      volume: data.total_volumes[i][1]
    })
  }

  return transformedData
}

export function convertIntegerToCommaFormat(num: number) {
  if(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}