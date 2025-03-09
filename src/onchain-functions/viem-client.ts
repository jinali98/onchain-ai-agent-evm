import dotenv from "dotenv";
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains'

dotenv.config();

const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
if (!privateKey) {
  throw new Error("PRIVATE_KEY is not set");
}

export const publicClient = createPublicClient({ 
  chain: baseSepolia, 
  transport: http(), 
}) 

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(),
  account: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`),
})
