import "styled-components";
import { CheeseTheme } from "./theme";

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends CheeseTheme {}
}

// Extend Window interface for wallet providers
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isTrust?: boolean;
      isTrustWallet?: boolean;
      isBinance?: boolean;
      isOKXWallet?: boolean;
      isFTM?: boolean;
      isCoinbaseWallet?: boolean;
      isBraveWallet?: boolean;
      request?: (args: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, handler: (...args: any[]) => void) => void;
      removeListener?: (event: string, handler: (...args: any[]) => void) => void;
    };
    okxwallet?: any;
    ftmwallet?: any;
    trustwallet?: any;
    BinanceChain?: any;
  }
}
