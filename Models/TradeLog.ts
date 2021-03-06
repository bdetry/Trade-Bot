﻿export interface TradeLog {
    date: Date,
    id: string,
    price: number,
    size: number,
    sizeConvertedMoneyTwo : number,
    side: string,
    moneyOneBalance: number,
    moneyTwoBalance: number,
    moneyTwoBalanceCoverted: number,
    totalBlances: number,
    currentAskPrice: number
}