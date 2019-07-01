import { CoinBaseCurrencySchema }  from '../Models/Schemas/CoinBaseCurrencySchema'
import { CoinBaseCurrency } from '../Models/CoinBaseCurrency';
import * as mongoose from 'mongoose'

class DataSaverService {

    public SaveCurrencyInfo(currencyInfo: CoinBaseCurrency): Promise<any> {
        const Currency = mongoose.model<CoinBaseCurrency>('CoinBaseCurrency', CoinBaseCurrencySchema);
        return new Currency(currencyInfo).save();
    }

}

export = DataSaverService