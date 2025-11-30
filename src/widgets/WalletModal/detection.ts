/**
 * Wallet Detection Utilities
 * These functions detect if specific wallets are installed/available
 */

/**
 * Detect MetaMask specifically (not other wallets masquerading as MetaMask)
 * CRITICAL: Detects MetaMask in-app browser (mobile) and extension
 */
export const detectMetaMask = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // MetaMask mobile browser and extension set isMetaMask
  // But we need to exclude other wallets that also set this flag
  const isMetaMask = window.ethereum?.isMetaMask
  const isTrust = window.ethereum?.isTrust || window.ethereum?.isTrustWallet
  const isBinance = window.ethereum?.isBinance
  const isOKX = (window.ethereum as any)?.isOKXWallet
  
  // Return true only if MetaMask and NOT other wallets
  return Boolean(isMetaMask && !isTrust && !isBinance && !isOKX)
}

/**
 * Detect Binance Wallet
 */
export const detectBinanceWallet = (): boolean => {
  if (typeof window === 'undefined') return false
  return Boolean(window.ethereum?.isBinance || (window as any).BinanceChain)
}

/**
 * Detect Trust Wallet
 * CRITICAL: Detects Trust Wallet in-app browser (mobile) and extension
 */
export const detectTrustWallet = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Trust Wallet in-app browser sets isTrust flag
  if (window.ethereum?.isTrust) return true
  
  // Trust Wallet also exposes trustwallet object
  if ((window as any).trustwallet) return true
  
  // Additional check for Trust Wallet mobile browser
  if (window.ethereum?.isTrustWallet) return true
  
  return false
}

/**
 * Detect OKX Wallet
 */
export const detectOKXWallet = (): boolean => {
  if (typeof window === 'undefined') return false
  return Boolean((window as any).okxwallet || window.ethereum?.isOKXWallet)
}

/**
 * Detect Fantom Wallet
 */
export const detectFantomWallet = (): boolean => {
  if (typeof window === 'undefined') return false
  return Boolean((window as any).ftmwallet || window.ethereum?.isFTM)
}

/**
 * Detect Coinbase Wallet browser extension
 */
export const detectCoinbaseWallet = (): boolean => {
  if (typeof window === 'undefined') return false
  return Boolean(window.ethereum?.isCoinbaseWallet)
}

/**
 * Detect Brave Wallet
 */
export const detectBraveWallet = (): boolean => {
  if (typeof window === 'undefined') return false
  return Boolean(window.ethereum?.isBraveWallet)
}

/**
 * Detect Rabby Wallet
 */
export const detectRabbyWallet = (): boolean => {
  if (typeof window === 'undefined') return false
  return Boolean((window as any).rabby || (window.ethereum as any)?.isRabby)
}

/**
 * Detect Rabby Wallet
 */
/**
 * Detect generic injected wallet
 * Shows only if window.ethereum exists but NO specific wallet is detected
 * CRITICAL: This is the safety net for in-app browsers and unknown wallets
 */
export const detectGenericInjected = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const hasEthereum = Boolean(window.ethereum)
  if (!hasEthereum) return false
  
  // Don't show generic if a specific wallet is detected
  // This way MetaMask/Trust in-app browsers will show their specific wallet
  const hasSpecificWallet = 
    detectMetaMask() ||
    detectBinanceWallet() ||
    detectTrustWallet() ||
    detectOKXWallet() ||
    detectFantomWallet() ||
    detectCoinbaseWallet() ||
    detectBraveWallet() ||
    detectRabbyWallet()
  
  // Show generic ONLY if no specific wallet detected
  // This ensures in-app browsers are properly detected first
  return !hasSpecificWallet
}

/**
 * Detect if any injected wallet is available
 */
export const hasInjectedWallet = (): boolean => {
  if (typeof window === 'undefined') return false
  return Boolean(window.ethereum)
}

/**
 * Detect mobile device
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

/**
 * Get all detected wallets
 */
export const getDetectedWallets = (): string[] => {
  const detected: string[] = []
  
  if (detectMetaMask()) detected.push('MetaMask')
  if (detectBinanceWallet()) detected.push('Binance Wallet')
  if (detectTrustWallet()) detected.push('Trust Wallet')
  if (detectOKXWallet()) detected.push('OKX Wallet')
  if (detectFantomWallet()) detected.push('Fantom Wallet')
  if (detectCoinbaseWallet()) detected.push('Coinbase Wallet')
  if (detectBraveWallet()) detected.push('Brave Wallet')
  if (detectRabbyWallet()) detected.push('Rabby Wallet')
  if (detectGenericInjected()) detected.push('Browser Wallet')
  
  return detected
}
