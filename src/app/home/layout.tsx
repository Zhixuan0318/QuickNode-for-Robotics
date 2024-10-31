'use client';

import Image from 'next/image';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import './home-layout.css';
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
    WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { Address, Avatar, EthBalance, Identity, Name } from '@coinbase/onchainkit/identity';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();

    const { isConnected, address } = useAccount();

    useEffect(() => {
        if (!isConnected) router.push('/');
    }, [isConnected]);

    return (
        <>
            <nav>
                <Image
                    className='logo'
                    src={'/images/svg/logo.svg'}
                    alt='logo'
                    width={66}
                    height={54}
                />
                <Wallet>
                    <ConnectWallet withWalletAggregator>
                        <Avatar className='h-6 w-6' />
                        <Name />
                    </ConnectWallet>
                    <WalletDropdown>
                        <Identity address={address} hasCopyAddressOnClick>
                            <Avatar className='h-6 w-6' />
                            <Name />
                            <Address />
                            <EthBalance />
                        </Identity>
                        <WalletDropdownLink href='https://www.base.org/names'>
                            Claim Basename
                        </WalletDropdownLink>
                        <WalletDropdownDisconnect />
                    </WalletDropdown>
                </Wallet>
                {/* <div className='wallet'>
                    <Image src={'/images/wallet.png'} alt='wallet-logo' width={36} height={36} />
                    <h4>{address ? `0x...${address?.slice(38, 42)}` : 'Loading...'}</h4>
                    <h6 onClick={() => setTimeout(() => disconnect(), 100)}>Disconnect Wallet</h6>
                </div> */}
            </nav>
            <main className='home-layout'>
                <div className='selector'>
                    {[['Store'], ['Track', 'package'], ['Inventory']].map((section, index) => (
                        <button
                            key={index}
                            id={
                                pathname.includes(section[0].toLowerCase())
                                    ? 'black-button'
                                    : 'white-button'
                            }
                            onClick={() => router.push(`/home/${section[0].toLowerCase()}`)}
                        >
                            <Image
                                src={`/images/svg/${(section.length == 2
                                    ? section[1]
                                    : section[0]
                                ).toLowerCase()}.svg`}
                                alt='store'
                                width={21}
                                height={21}
                            />
                            {section[0]}
                        </button>
                    ))}
                </div>
                {children}
            </main>
        </>
    );
}
