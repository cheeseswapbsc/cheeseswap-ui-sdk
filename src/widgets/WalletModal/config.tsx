import Metamask from "./icons/Metamask";
import TrustWallet from "./icons/TrustWallet";
import WalletConnect from "./icons/WalletConnect";
import BinanceChain from "./icons/BinanceChain";
import OKXWallet from "./icons/OKXWallet";
import FantomWallet from "./icons/FantomWallet";
import CoinbaseWallet from "./icons/CoinbaseWallet";
import BrowserWallet from "./icons/BrowserWallet";
import { Config } from "./types";
import {
  detectMetaMask,
  detectBinanceWallet,
  detectTrustWallet,
  detectOKXWallet,
  detectFantomWallet,
  detectGenericInjected,
} from "./detection";

const connectors: Config[] = [
  // INJECTED WALLET - ALWAYS FIRST PRIORITY
  // This is used when window.ethereum exists (in-app browsers, extensions)
  // Shows MetaMask icon as it's the most recognized
  {
    title: "Injected",
    icon: Metamask, // Use MetaMask icon (most recognized for injected)
    connectorId: "injected",
    priority: 1,
    installed: () => typeof window !== 'undefined' && Boolean(window.ethereum),
  },
  
  // SPECIFIC WALLETS - For user recognition and specific features
  // When clicked, these will use their specific connector IF detected
  // Otherwise falls back to injected
  {
    title: "MetaMask",
    icon: Metamask,
    connectorId: "metamask",
    priority: 2,
    installed: detectMetaMask,
    deepLink: "https://metamask.app.link/dapp/cheeseswap.app/",
    downloadLink: "https://metamask.io/download/",
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "trustwallet",
    priority: 3,
    installed: detectTrustWallet,
    deepLink: "https://link.trustwallet.com/open_url?coin_id=20000714&url=https://cheeseswap.app/",
    downloadLink: "https://trustwallet.com/",
  },
  {
    title: "Binance Wallet",
    icon: BinanceChain,
    connectorId: "binance",
    priority: 4,
    installed: detectBinanceWallet,
    downloadLink: "https://www.binance.com/en/web3wallet",
  },
  {
    title: "OKX Wallet",
    icon: OKXWallet,
    connectorId: "okxwallet",
    priority: 5,
    installed: detectOKXWallet,
    deepLink: "https://www.okx.com/download?deeplink=okx://wallet/dapp/url?dappUrl=https://cheeseswap.app/",
    downloadLink: "https://www.okx.com/web3",
  },
  
  // ALWAYS AVAILABLE - SDK-based wallets
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 98,
    installed: () => true, // Always available
  },
  {
    title: "Coinbase Wallet",
    icon: CoinbaseWallet,
    connectorId: "coinbasewallet",
    priority: 99,
    installed: () => true, // Always available
  },
];

export default connectors;
export const localStorageKey = "accountStatus";
