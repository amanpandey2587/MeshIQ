import React, { createContext, useContext, ReactNode } from 'react';
import { MlModelMarketplaceClient } from '../clients/MLModelMarketplaceClient';
import { useWallet } from './WalletContext';

interface ContractContextType {
  client: MlModelMarketplaceClient | null;
  appId: number;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

// Replace with your deployed contract app ID
const APP_ID = 740889434;

interface ContractProviderProps {
  children: ReactNode;
}

export function ContractProvider({ children }: ContractProviderProps) {
  const { algodClient, account } = useWallet();

  const client = algodClient ? new MlModelMarketplaceClient({
    algorand: {
      client: { algod: algodClient },
      send: { send: async (params) => params },
    } as any,
    appId: APP_ID,
    defaultSender: account || undefined,
  }) : null;

  const value: ContractContextType = {
    client,
    appId: APP_ID,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
}