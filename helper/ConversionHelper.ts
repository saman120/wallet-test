export interface CurrencyValueType {[key:string ]: string}

const rates: {
    [key:string ]: {
        [key:string ]: number
    }
} = {
    NEP: {
        BUSD: 3
    },
    BUSD: {
        NEP: 1 / 3
    }
};

export const convertCurrency= (currency: string, val: string) : CurrencyValueType => {
    const value = val && parseFloat(val);

    return Object.keys(rates[currency])
        .reduce(
            (a: CurrencyValueType, v: string) => {
                if (!value) a[v] = val;
                else {
                    const cvalue = rates[currency][v] * value;

                    if (cvalue < 0.000001) a[v] = ''+cvalue;
                    else {
                        // increasing precision for value less than 0.1
                        a[v] = cvalue.toFixed(cvalue < 0.1 ? ('' + cvalue).search(/[1-9]/) : 2);
                    }
                }
                return a;
            },
            { [currency]: val });
};
