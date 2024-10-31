import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { baseSepolia } from 'viem/chains';

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.27',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    defaultNetwork: 'baseSepolia',
    networks: {
        baseSepolia: {
            chainId: baseSepolia.id,
            url: 'https://sepolia.base.org',
            accounts: ['46b6bed2c03da2c146172963d625592809f7ba122376e6cba0f9f1944821f784'],
        },
    },
};

export default config;
