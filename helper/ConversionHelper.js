const rates = {
    NPR: {
        USD: 0.0076
    },
    USD: {
        NPR: 130.96
    }
};

export const convertCurrency = (currency, val) => {
    const value = val && parseFloat(val);
    
    return Object.keys(rates[currency])
        .reduce(
            (a, v) => {
                if(!value) a[v] = value;
                else {
                    const cvalue = rates[currency][v] * value;

                    if(cvalue < 0.000001) a[v] = cvalue;
                    else {
                        // increasing precision for value less than 0.1
                        a[v] = cvalue.toFixed(cvalue < 0.1 ? (''+cvalue).search(/[1-9]/) : 2);
                    }
                }
                return a;
            },
            { [currency]: value });
    };
