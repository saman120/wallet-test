import { useState } from "react";
import {convertCurrency} from '../helper/ConversionHelper';

const WalletInfo = () => {
    const [currency, setCurrency] = useState({});

    const convertAndSetCurrency = (currency) => (e) => setCurrency(prevCurrency => (e.target.value && isNaN(e.target.value)) ? prevCurrency : convertCurrency(currency, e.target.value.trim()));

    return (<div className="bg-white shadow-md rounded-lg max-w-4xl">
        <h2 className="text-lg font-medium mb-4 bg-gray-500 text-white p-4 rounded-t-lg">Currency Conversion</h2>
        <div className="px-4 pb-4">
            <div className="grid grid-cols-1">
                <CurrencyInput label={"NPR"} currency={"RS"} value={currency["NPR"]} onChange={convertAndSetCurrency('NPR')}/>
                <CurrencyInput label={"USD"} currency={"$"} value={currency["USD"]} onChange={convertAndSetCurrency('USD')}/>
            </div>
        </div>
    </div>);
};

const CurrencyInput = ({ label, currency, value, onChange }) => <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">{currency}</span>
        <input type="number" id="input2" className="border w-full p-2 pl-8 rounded-lg" value={value} onChange={onChange} placeholder="Enter Amount in US Dollar" />
    </div>
</div>;

export default WalletInfo;
