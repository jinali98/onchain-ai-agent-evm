import { ToolConfig } from "../types/tools.types";
import { getWalletBalanceTool } from "./get-wallet-balance";


export const allTools: Record<string, ToolConfig> = {
  get_wallet_balance: getWalletBalanceTool,
};
