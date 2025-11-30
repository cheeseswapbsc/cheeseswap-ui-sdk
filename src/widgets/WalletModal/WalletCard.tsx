import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { localStorageKey } from "./config";
import { Login, Config } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { title, icon: Icon, connectorId } = walletConfig;
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (fallbackToInjected = false) => {
    setIsConnecting(true);
    setConnectionError(null);

    try {
      // Use injected connector as fallback if requested
      const targetConnectorId = fallbackToInjected ? 'injected' : connectorId;
      
      await login(targetConnectorId);
      window.localStorage.setItem(localStorageKey, "1");
      onDismiss();
    } catch (error: any) {
      console.error(`[WalletCard] Connection failed for ${connectorId}:`, error);
      
      // Only show refresh option for specific wallet connectors, not for injected/walletconnect/coinbase
      const specificConnectors = ['metamask', 'trustwallet', 'binance', 'okxwallet', 'fantomwallet'];
      if (!fallbackToInjected && specificConnectors.includes(connectorId)) {
        setConnectionError(
          error.message || `Failed to connect to ${title}. Click refresh to try generic connection.`
        );
      } else {
        // For other connectors or already using injected, show generic error
        setConnectionError(error.message || `Failed to connect to ${title}`);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRefresh = () => {
    // Retry with generic injected connector
    handleConnect(true);
  };

  return (
    <div style={{ marginBottom: mb }}>
      <Button
        fullWidth
        variant="tertiary"
        onClick={() => handleConnect(false)}
        style={{ justifyContent: "space-between" }}
        disabled={isConnecting}
        id={`wallet-connect-${title.toLocaleLowerCase()}`}
      >
        <Text bold color="primary" mr="16px">
          {isConnecting ? "Connecting..." : title}
        </Text>
        <Icon width="32px" />
      </Button>
      
      {connectionError && (
        <div style={{ marginTop: "8px" }}>
          <Text small color="failure" style={{ marginBottom: "8px" }}>
            {connectionError}
          </Text>
          {['metamask', 'trustwallet', 'binance', 'okxwallet', 'fantomwallet'].includes(connectorId) && (
            <Button
              fullWidth
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              disabled={isConnecting}
            >
              🔄 Refresh & Try Generic Connection
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletCard;
