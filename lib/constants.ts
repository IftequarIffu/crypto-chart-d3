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
        days: 1
    },
    {
        id: 1,
        text: '3d',
        days: 3
    },
    {
        id: 2,
        text: '1w',
        days: 1 * 7
    },
    {
        id: 3,
        text: '1m',
        days: 1 * 30
    },
    {
        id: 4,
        text: '6m',
        days: 1 * 30 * 6
    },
    {
        id: 5,
        text: '1y',
        days: 1 * 365
    },
    {
        id: 6,
        text: 'max',
        days: 0
    },
]