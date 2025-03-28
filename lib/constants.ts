export const COINGECKO_API_URL = "https://api.coingecko.com"

export const buttons = [
    {
        name: "Summary",
        isSelected: false
    },
    {
        name: "Chart",
        isSelected: true
    },
    {
        name: "Statistics",
        isSelected: false
    },
    {
        name: "Analytics",
        isSelected: false
    },
    {
        name: "Settings",
        isSelected: false
    },
]

export const timeRanges = [
    {
        id: 0,
        text: '1d',
        timeState: 1,
        useQueryCacheKey: 1
    },
    {
        id: 1,
        text: '3d',
        timeState: 3,
        useQueryCacheKey: 3
    },
    {
        id: 2,
        text: '1w',
        timeState: 7,
        useQueryCacheKey: 7
    },
    {
        id: 3,
        text: '1m',
        timeState: 30,
        useQueryCacheKey: 365
    },
    {
        id: 4,
        text: '6m',
        timeState: 180, 
        useQueryCacheKey: 365
    },
    {
        id: 5,
        text: '1y',
        timeState: 365,
        useQueryCacheKey: 365
    },
    {
        id: 6,
        text: 'max',
        timeState: 0,
        useQueryCacheKey: 0
    },
]