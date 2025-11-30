import { FC } from "react";
import { SvgProps } from "../../components/Svg/types";

export type ConnectorId =
  // Specific injected wallets
  | "metamask"
  | "binance"
  | "trustwallet"
  | "okxwallet"
  | "fantomwallet"
  // Generic fallback
  | "injected"
  // SDK-based wallets
  | "walletconnect"
  | "coinbasewallet";

export type Login = (connectorId: ConnectorId) => Promise<void>;

export interface Config {
  title: string;
  icon: FC<SvgProps>;
  connectorId: ConnectorId;
  priority?: number;
  installed?: () => boolean;
  deepLink?: string;
  downloadLink?: string;
  mobileOnly?: boolean;
}
