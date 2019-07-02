import { Router, Request, Response, NextFunction } from 'express';
import { GlobalString } from '../globals';

/**
 * Class that trade cryptos
 * */
class TradeController {
    constructor() {
        this.doTrade = this.doTrade.bind(this);
    }

    /**
     * Called on http get /trade - execute actions and place order
     * @param req
     * @param res
     * @param next
     */
    doTrade(req: Request, res: Response, next: NextFunction) {

        let secuKey = req.query.key;
        let key = GlobalString.TRADESECURITYKEY


        if (secuKey == key) {

            // TO DO
            // Get stored prices
            // Get market prices
            // Create arder from rule
            // Make order
            // Save localy
            // Load to slack

        } else {
            res.status(401).json({message: "Wrong key"})
        }
    }

}

export = TradeController