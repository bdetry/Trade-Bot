export interface TradeLog {
    date: string,
    id: string,
    price: number,
    size: number,
    sizeConvertedMoneyTwo : number,
    side: string,
    moneyOneBalance: number,
    moneyTwoBalance: number,
    moneyOneBalanceCoverted: number,
    moneyTwoPrice: number,
    totalBlances: number
}