"use strict";
const axios_1 = require("axios");
const crypto = require("crypto");
class CoinBaseProService {
    /**
     * Send request to
     * @param forPath
     * @param config
     * @param method
     */
    Request(forPath, config, method) {
        config.url = "https://api.pro.coinbase.com" + forPath;
        config.method = method;
        return axios_1.default.request(config);
    }
    /**
     * Generate an Coin Base Api request header
     * @param forPath
     * @param body
     */
    GetRequestHeaders(forPath, body, method) {
        return {
            headers: {
                'CB-ACCESS-KEY': '6026e788a195c479ab18e356771fef62',
                'CB-ACCESS-SIGN': this.GenerateAccesSign(forPath, body, method),
                'CB-ACCESS-TIMESTAMP': Date.now() / 1000,
                'CB-ACCESS-PASSPHRASE': 'zd1gvet2cfs',
                'Content-Type': 'application/json'
            }
        };
    }
    /**
     * Generate GenerateAccesSign for Coinbase Api request header
     * @param forPath path of the request
     * @param body body of the request
     */
    GenerateAccesSign(forPath, body, method) {
        let secret = 'SAMjLmp0oXPuwWtXlIv1XrBAR/enk2OOLZfAW6tLIsfrWaAnd+kU/LlgKkPY86xdZaD4TI4sShE8Dh9uZJhHAQ==';
        let timestamp = Date.now() / 1000;
        let requestPath = forPath;
        // create the prehash string by concatenating required parts
        let what = timestamp + method + requestPath + body;
        // decode the base64 secret
        let key = new Buffer(secret, 'base64');
        // create a sha256 hmac with the secret
        let hmac = crypto.createHmac('sha256', key);
        // sign the require message with the hmac
        // and finally base64 encode the result
        return hmac.update(what).digest('base64');
    }
    /**
     * Get trading rate from Coin Api
     * */
    GetPriceRequestFromCoinApi() {
        let config = {
            url: "https://rest.coinapi.io/v1/exchangerate/BTC/USD",
            method: "GET",
            headers: { 'X-CoinAPI-Key': 'F5C0B2F3-E045-490E-9CCC-5F6D6C296383' }
        };
        return axios_1.default.request(config);
    }
}
module.exports = CoinBaseProService;
//# sourceMappingURL=CoinBaseProService.js.map