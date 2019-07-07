import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosAdapter,
    AxiosPromise,
    Cancel,
    CancelToken,
    CancelTokenSource,
    Canceler,
    Method
} from 'axios';

import * as crypto from "crypto";
import { GlobalString } from '../globals';
import { CoinBaseOrder } from '../Models/CoinBaseOrder';
import { CoinBaseOrderResponse } from '../Models/CoinBaseOrderResponse';

class CoinBaseProService {
    /**
     * Send request to 
     * @param forPath
     * @param config
     * @param method
     */
    public Request(forPath: string, config: AxiosRequestConfig, method: string, body: CoinBaseOrder = undefined): AxiosPromise<CoinBaseOrderResponse> {

        config.url = "https://api.pro.coinbase.com" + forPath;
        config.method = method as Method;

        
        if (method == "POST" &&
            body != undefined) {
            config.data = body
        }
        

        return axios.request(config);
    }

    /**
     * Generate an Coin Base Api request header
     * @param forPath
     * @param body
     */
    public GetRequestHeaders(forPath : string , body : any , method : string): AxiosRequestConfig {
        return {
            headers: {
                'CB-ACCESS-KEY': GlobalString.CBACCESSKEY,
                'CB-ACCESS-SIGN': this.GenerateAccesSign(forPath , body , method),
                'CB-ACCESS-TIMESTAMP': Date.now() / 1000,
                'CB-ACCESS-PASSPHRASE': GlobalString.CBACCESSPASSPHRASE,
                'Content-Type': 'application/json'
            }
        };
    }

    /**
     * Generate GenerateAccesSign for Coinbase Api request header
     * @param forPath path of the request
     * @param body body of the request
     */
    private GenerateAccesSign(forPath: string, body: any, method: string): string {
        let secret = GlobalString.CBSECRET;
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
    public GetPriceRequestFromCoinApi(): AxiosPromise<object> {

        let config: AxiosRequestConfig = {
            url: "https://rest.coinapi.io/v1/exchangerate/BTC/USD",
            method: "GET",
            headers: { 'X-CoinAPI-Key': 'F5C0B2F3-E045-490E-9CCC-5F6D6C296383' }
        };

        return axios.request(config);
    }
}

export = CoinBaseProService;