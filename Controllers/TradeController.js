"use strict";
const globals_1 = require("../globals");
class TradeController {
    constructor() {
        this.doTrade = this.doTrade.bind(this);
    }
    doTrade(req, res, next) {
        let secuKey = req.query.key;
        let key = globals_1.GlobalString.TRADESECURITYKEY;
        if (secuKey == key) {
        }
        else {
            res.status(401).json({ message: "Wrong key" });
        }
        console.log(req.query.key);
    }
}
module.exports = TradeController;
//# sourceMappingURL=TradeController.js.map