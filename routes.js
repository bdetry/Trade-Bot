"use strict";
const TradeController = require("./Controllers/TradeController");
//Routing table
function routes(app) {
    const tradeController = new TradeController();
    app.route("/trade").get(tradeController.doTrade);
}
module.exports = routes;
//# sourceMappingURL=routes.js.map