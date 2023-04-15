import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect, useState } from "react";
export const injected: InjectedConnector = new InjectedConnector({});

async function getWalletBalance(library:any, account:string):Promise<string> {
    return await library && library.eth && await library.eth.getBalance(account);
}

const WalletInfo = ({ onClose } : {onClose:()=>void}) => {
    const [balance, setBalance] = useState<string>();
    const { library, account, activate, deactivate, active, chainId, error } = useWeb3React();

    useEffect(() => {
        if (account)
            getWalletBalance(library, account).then(setBalance);
    }, [account])

    const connect = () => {
        activate(injected).catch(console.log);
    }

    const disconnect = () => {
        deactivate();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg w-500">
                <div className="flex w-full justify-between px-5 py-2">
                    <h1 className="text-lg font-medium">Wallet Details</h1>
                    <a onClick={onClose} href="#">X</a>
                </div>
                {active
                    ? <>
                        <table className="wallet-detail-table">
                            <tr><th>Account</th><td>{account}</td></tr>
                            <tr><th>Chain Id</th><td>{chainId}</td></tr>
                            <tr><th>Balance</th><td>{balance}</td></tr>
                        </table>
                        <button onClick={disconnect} className="py-2 mt-10 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-red-600 hover:bg-red-800">Disconnect</button>
                    </>
                    : <>
                        <p className="p-8 pt-4">{error ? <span className="text-red-500">Problem connecting to the wallet: {error.message}</span> : <span>Wallet is not connected, please click the connect button</span>}</p>
                        <button onClick={connect} className="py-2 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect</button>
                    </>}
            </div>
        </div>
    )
};


export default WalletInfo;
