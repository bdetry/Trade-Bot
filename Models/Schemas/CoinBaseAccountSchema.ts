import * as mongoose from 'mongoose'
let Schema = mongoose.Schema;


export const CoinBaseAccountSchema = new mongoose.Schema({
    id: { type: String, required : true },
    currency: { type: String, required: true },
    balance: { type: String, required: true },
    available: { type: String, required: true },
    hold: { type: String, required: true },
    profile_id: { type: String, required: true },
    date: { type: String, default: Date.now() / 1000 },
});
