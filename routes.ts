import TradeController = require("./Controllers/TradeController");

//Routing table
function routes(app: any) {

    const tradeController = new TradeController();
    app.route("/trade").get(tradeController.doTrade);

}
export = routes;