import { formatEther } from "viem";
import { publicClient } from "../onchain-functions/viem-client";
import { ToolConfig } from "../types/tools.types";

export const getWalletBalance = async (walletAddress: `0x${string}`) => {
  const balance = await publicClient.getBalance({
    address: walletAddress,
  });

  return formatEther(balance);

};

export const getWalletBalanceTool: ToolConfig = {
  definition: {
    type: "function",
    function: {
      name: "get_wallet_balance",
      description: "Get the balance of a wallet",
      parameters: {
        type: "object",
        properties: {
          walletAddress: {
            type: "string",
            description: "The address of the wallet to get the balance of",
            pattern: "^0x[a-fA-F0-9]{40}$",
          },
        },
        required: ["walletAddress"],
      },
    },
  },
  function: async ({ walletAddress }) => {
    return await getWalletBalance(walletAddress);
  },
};
