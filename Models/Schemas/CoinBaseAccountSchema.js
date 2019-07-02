"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
exports.CoinBaseAccountSchema = new mongoose.Schema({
    id: { type: String, required: true },
    currency: { type: String, required: true },
    balance: { type: String, required: true },
    available: { type: String, required: true },
    hold: { type: String, required: true },
    profile_id: { type: String, required: true },
    date: { type: String, default: Date.now() / 1000 },
});
//# sourceMappingURL=CoinBaseAccountSchema.js.map