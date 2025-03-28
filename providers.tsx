'use client'
import React, { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from "@/components/theme-provider"

export const queryClient = new QueryClient()


const Providers = ({children}: {children: ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers