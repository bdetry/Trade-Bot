import { Document } from 'mongoose'

export interface CoinBaseAccount extends Document {
    id: string,
    currency: string,
    balance: string,
    available: string,
    hold: string,
    profile_id: string,
    date: Date;
}