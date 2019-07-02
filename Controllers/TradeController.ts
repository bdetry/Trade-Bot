import { Router, Request, Response, NextFunction } from 'express';
import { GlobalString } from '../globals';

class TradeController {
    constructor() {
        this.doTrade = this.doTrade.bind(this);
    }

    doTrade(req: Request, res: Response, next: NextFunction) {

        let secuKey = req.query.key;
        let key = GlobalString.TRADESECURITYKEY


        if (secuKey == key) {

        } else {
            res.status(401).json({message: "Wrong key"})
        }

        console.log(req.query.key);
    }

}

export = TradeController