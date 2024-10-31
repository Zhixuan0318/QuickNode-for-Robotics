import { JsonRpcProvider, Wallet, SigningKey, Signature } from 'ethers';
import { TransactionReceipt, TransactionRequest } from 'ethers';
import { keccak256, toUtf8Bytes } from 'ethers';

import { baseSepolia } from 'viem/chains';

export const provider = new JsonRpcProvider(process.env.PROVIDER, baseSepolia.id);

const owner = new SigningKey(process.env.OWNER_PK as string);
const wallet = new Wallet(owner.privateKey, provider);

export function signMessage(message: string): Signature {
    const hashedMesage = keccak256(toUtf8Bytes(message));
    return owner.sign(hashedMesage);
}

export async function sendAsOwner(
    transaction: TransactionRequest
): Promise<TransactionReceipt | null> {
    const response = await wallet.sendTransaction(transaction);
    const receipt = await provider.waitForTransaction(response.hash);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return receipt;
}
