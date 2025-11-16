import { FC } from "react";
import { SvgProps } from "../../components/Svg/types";

export type ConnectorId =
  | "frame"
  | "injected"
  | "okxwallet"
  | "squarelink"
  | "trustwallet"
  | "walletconnect"
  | "walletlink"
  | "bsc";

export type Login = (connectorId: ConnectorId) => void;

export interface Config {
  title: string;
  icon: FC<SvgProps>;
  connectorId: ConnectorId;
}
