import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "../../components/Link";
import { HelpIcon } from "../../components/Svg";
import { Modal } from "../Modal";
import WalletCard from "./WalletCard";
import config from "./config";
import { Login, Config } from "./types";
import { isMobileDevice } from "./detection";

interface Props {
  login: Login;
  onDismiss?: () => void;
}

const HelpLink = styled(Link)`
  display: flex;
  align-self: center;
  align-items: center;
  margin-top: 24px;
`;

const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => {
  const isMobile = useMemo(() => isMobileDevice(), []);

  // Sort and filter wallets
  const displayWallets = useMemo(() => {
    // First, check installation status for each wallet
    const walletsWithStatus = config.map(wallet => ({
      ...wallet,
      isInstalled: wallet.installed ? wallet.installed() : false,
    }));

    // Filter wallets based on platform
    let filtered = walletsWithStatus;
    
    if (isMobile) {
      // On mobile: show installed wallets + WalletConnect + wallets with deep links
      filtered = walletsWithStatus.filter(wallet => 
        wallet.isInstalled || 
        wallet.connectorId === 'walletconnect' ||
        wallet.connectorId === 'coinbasewallet' ||
        wallet.deepLink
      );
    } else {
      // On desktop: show all except mobile-only wallets
      filtered = walletsWithStatus.filter(wallet => !wallet.mobileOnly);
    }

    // Sort by:
    // 1. Installed wallets first
    // 2. Then by priority
    // 3. Finally by title
    return filtered.sort((a, b) => {
      // Installed wallets first
      if (a.isInstalled && !b.isInstalled) return -1;
      if (!a.isInstalled && b.isInstalled) return 1;

      // Then by priority (lower number = higher priority)
      const priorityA = a.priority ?? 999;
      const priorityB = b.priority ?? 999;
      if (priorityA !== priorityB) return priorityA - priorityB;

      // Finally by title
      return a.title.localeCompare(b.title);
    });
  }, [isMobile]);

  return (
    <Modal title="Connect to a wallet" onDismiss={onDismiss}>
      <WalletList>
        {displayWallets.map((entry) => (
          <WalletCard
            key={entry.title}
            login={login}
            walletConfig={entry}
            onDismiss={onDismiss}
            mb="0"
          />
        ))}
      </WalletList>
      <HelpLink
        href="https://docs.cheeseswap.app/get-started/wallet-guide"
        external
      >
        <HelpIcon color="primary" mr="6px" />
        Learn how to connect
      </HelpLink>
    </Modal>
  );
};

export default ConnectModal;
