import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk from 'algosdk';

interface WalletContextType {
  account: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (txn: algosdk.Transaction) => Promise<Uint8Array>;
  algodClient: algosdk.Algodv2;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const peraWallet = new PeraWalletConnect();

// Initialize Algod client for TestNet
const algodClient = new algosdk.Algodv2(
  '',
  'https://testnet-api.algonode.cloud',
  ''
);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if already connected
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    }).catch(console.error);

    // Listen for disconnect events
    peraWallet.connector?.on('disconnect', () => {
      setAccount(null);
      setIsConnected(false);
    });
  }, []);

  const connect = async () => {
    try {
      const accounts = await peraWallet.connect();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    peraWallet.disconnect();
    setAccount(null);
    setIsConnected(false);
  };

  const signTransaction = async (txn: algosdk.Transaction): Promise<Uint8Array> => {
    if (!account) {
      throw new Error('No account connected');
    }
    
    const signedTxn = await peraWallet.signTransaction([
      { txn: txn, signers: [account] }
    ]);
    
    return signedTxn[0];
  };

  const value: WalletContextType = {
    account,
    isConnected,
    connect,
    disconnect,
    signTransaction,
    algodClient,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}