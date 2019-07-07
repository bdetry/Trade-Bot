import { CoinBaseCurrencySchema } from '../Models/Schemas/CoinBaseCurrencySchema'
import { CoinBaseAccountSchema } from '../Models/Schemas/CoinBaseAccountSchema'
import { CoinBaseCurrency } from '../Models/CoinBaseCurrency';
import * as mongoose from 'mongoose'
import { CoinBaseAccount } from '../Models/CoinBaseAccount';

/**
 * Main service data
 * */
  class LocalDataService {

    /**
    * Get last currency infomation
     * @param currencyInfo
    */
    public GetLastCurrencyInfo(): mongoose.DocumentQuery < CoinBaseCurrency[], CoinBaseCurrency, {} > {
        const Currency = mongoose.model<CoinBaseCurrency>('CoinBaseCurrency', CoinBaseCurrencySchema);
        return Currency.find().sort({ date: -1 }).limit(1);
    }

        /**
     * Get last acounts information
     * */
        public GetLastAccountsInfo(): mongoose.DocumentQuery < CoinBaseAccount[], CoinBaseAccount, {} > {
        const Account = mongoose.model<CoinBaseAccount>('CoinBaseAccount', CoinBaseAccountSchema);
        return Account.find().sort({ date: -1 }).limit(2);
    }

        /**
     * Save currency infomation
     * @param currencyInfo
     */
        public SaveCurrencyInfo(currencyInfo: CoinBaseCurrency): Promise < any > {
        const Currency = mongoose.model<CoinBaseCurrency>('CoinBaseCurrency', CoinBaseCurrencySchema);
        return new Currency(currencyInfo).save();
    }

        /**
     * Save account information
     * @param account
     */
        public SaveAccountInfo(account: CoinBaseAccount): Promise < any > {
        const Account = mongoose.model<CoinBaseAccount>('CoinBaseAccount', CoinBaseAccountSchema);
        return new Account(account).save();
    }

}

export = LocalDataService