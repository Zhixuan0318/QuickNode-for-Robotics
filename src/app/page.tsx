'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useConnect } from 'wagmi';

import { baseSepolia } from 'viem/chains';

import './connection.css';

export default function Connection() {
    const router = useRouter();

    const { connectors, connectAsync } = useConnect();
    const { isConnected } = useAccount();
    const [connecting, setConnecting] = useState(false);

    useEffect(() => {
        if (connecting)
            setTimeout(() => {
                const connectPopup = document.querySelector(
                    'main.connection > div.background'
                ) as HTMLElement;
                connectPopup.style.animation = 'none';
            }, 700);
    }, [connecting]);

    useEffect(() => {
        if (isConnected) router.push('/home/store');
    }, [isConnected]);

    useEffect(() => {
        connectors.map((wa) => console.log(wa.id));
    }, [connectors]);

    return (
        <main className='connection'>
            {connecting && (
                <div className='background'>
                    <section className='connectors'>
                        <Image
                            src={'/images/svg/cross.svg'}
                            alt='cross'
                            width={18}
                            height={18}
                            onClick={() => {
                                const connectPopup = document.querySelector(
                                    'main.connection > div.background'
                                ) as HTMLElement;
                                connectPopup.style.animation =
                                    'form-appear 600ms ease-in reverse forwards';

                                setTimeout(() => setConnecting(false), 700);
                            }}
                        />
                        {connectors.map(
                            (wallet) =>
                                wallet.type != 'injected' && (
                                    <div key={wallet.name}>
                                        <Image
                                            src={`/images/wallets/${wallet.id}.${
                                                wallet.id.includes('metaMask') ? 'svg' : 'png'
                                            }`}
                                            alt='wallet'
                                            width={50}
                                            height={50}
                                        />
                                        <button
                                            onClick={() =>
                                                connectAsync({
                                                    chainId: baseSepolia.id,
                                                    connector: wallet,
                                                })
                                            }
                                        >
                                            {!wallet.id.includes('metaMask')
                                                ? 'Coinbase Smart Wallet'
                                                : 'Metamask'}
                                        </button>
                                    </div>
                                )
                        )}
                    </section>
                </div>
            )}
            <Image src={'/images/svg/logo.svg'} alt='logo' width={73} height={60} />
            <h1>An Ecommerce Store on Base Sepolia Run By Robots.</h1>
            <div className='traits'>
                <div>
                    <Image src={'/images/svg/power.svg'} alt='trait' width={26} height={26} />
                    <h2>Built with AutoBase</h2>
                </div>
                <div>
                    <Image
                        src={'/images/svg/partners/base.svg'}
                        alt='trait'
                        width={26}
                        height={26}
                    />
                    <h2>on Base Sepolia</h2>
                </div>
                <div>
                    <Image
                        src={'/images/svg/partners/quicknode.svg'}
                        alt='trait'
                        width={26}
                        height={26}
                    />
                    <h2>Powered by Quicknode</h2>
                </div>
            </div>

            <button id='black-button' onClick={() => setConnecting(true)}>
                Connect to AutoBase Store
            </button>
            <Image src={'/images/svg/main-screen.svg'} alt='picture' width={500} height={500} />
        </main>
    );
}
