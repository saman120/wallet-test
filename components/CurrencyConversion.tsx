import { useState } from "react";
import { CurrencyValueType, convertCurrency } from '../helper/ConversionHelper';
import WalletInfo from "./WalletInfo";

const CurrencyConversion = () => {
    const [currency, setCurrency] = useState<CurrencyValueType>({});

    const convertAndSetCurrency =
        (currency : string) =>
            (e : any) => setCurrency(
                prevCurrency => (e.target.value && isNaN(e.target.value))
                    ? prevCurrency
                    : convertCurrency(currency, e.target.value.trim()));

    return (<div className="bg-white shadow-md rounded-lg currency-container">
        <h2 className="text-lg font-medium mb-4 bg-gray-500 text-white p-4 rounded-t-lg">Currency Conversion</h2>
        <div className="px-4">
            <div className="grid grid-cols-1 p-4">
                <CurrencyInput label={"NEP"} placeholder="Enter Amount in NEP" value={currency["NEP"]} onChange={convertAndSetCurrency('NEP')} />
            </div>
            <div className="grid grid-cols-1 p-4">
                <CurrencyInput label={"BUSD"} placeholder="Enter Amount in BUSD" value={currency["BUSD"]} onChange={convertAndSetCurrency('BUSD')} />
            </div>
            <div className="grid grid-cols-1 p-8">
                <CheckWalletStatus />
            </div>
        </div>
    </div>);
};

const CheckWalletStatus = () => {
    const [showWallet, setShowWallet] = useState(false);
    return (<><a href="#" className="text-blue-500 hover:text-blue-700 cursor-pointer text-center" onClick={() => setShowWallet(true)}>
        Check wallet Details
    </a>
    {showWallet && <WalletInfo onClose={()=>setShowWallet(false)} />}
    </>);
};

const CurrencyInput = ({ label, value, placeholder, onChange }:{label: string, value:string, placeholder:string,  onChange: (e:any)=>void}) => <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input type="number" id="input2" className="border w-full p-2 rounded-lg" value={value} onChange={onChange} placeholder={placeholder} />
</div>;

export default CurrencyConversion;
