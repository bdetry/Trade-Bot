
import { Document } from 'mongoose'

export interface CoinBaseCurrency extends Document {
    sequence: string,
    bids: Array<Array<string>>,
    asks: Array<Array<string>>,
    date: Date
}