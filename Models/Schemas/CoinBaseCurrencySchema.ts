import * as mongoose from 'mongoose'
let Schema = mongoose.Schema;


export const CoinBaseCurrencySchema = new mongoose.Schema({
    sequence: { type: String, required: true },
    bids: [[{ type: String }]],
    asks: [[{ type: String }]],
    date: { type: Date, default: new Date() }
});
