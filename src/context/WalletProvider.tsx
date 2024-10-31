'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider } from 'wagmi';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { base } from 'wagmi/chains';

import config from '@/config/wagmi';

const queryClient = new QueryClient();

function WalletProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(config, cookies);

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <OnchainKitProvider
                    apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
                    //@ts-ignore
                    chain={base}
                >
                    <RainbowKitProvider>{children}</RainbowKitProvider>
                </OnchainKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default WalletProvider;
