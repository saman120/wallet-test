import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { provider } from 'web3-core';
import CurrencyConversion from '../components/CurrencyConversion';

function getLibrary(provider:provider) {
  return new Web3(provider)
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Web3ReactProvider getLibrary={getLibrary}>
      <CurrencyConversion />
      </Web3ReactProvider>
    </main>
  )
}
