"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
exports.CoinBaseCurrencySchema = new mongoose.Schema({
    sequence: { type: String, required: true },
    bids: [[{ type: String }]],
    asks: [[{ type: String }]],
    date: { type: String, default: Date.now() / 1000 }
});
//# sourceMappingURL=CoinBaseCurrencySchema.js.map