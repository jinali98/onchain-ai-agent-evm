import { OpenAI } from "openai";
import { Assistant } from "openai/resources/beta/assistants.mjs";
import { allTools } from "../tools/all-tools";

export async function createAssistant(openai: OpenAI): Promise<Assistant> {
  // we need to convert the tool config to the format that openai expects
  const tools = Object.values(allTools).map((tool) => ({
    ...tool.definition,
  }));

  const assistant = await openai.beta.assistants.create({
    name: "Onchain Assistant",
    instructions: `You are a  onchain assistant that can help with onchain transactions. 
    you can use the tools provided to you to help with the user's request. 
    you can also use the tools to get information about the user's wallet and the onchain transactions.
    getWalletBalance tool is used to get the balance of a wallet.
    the user will provide you with a wallet address and you will use the getWalletBalance tool to get the balance of the wallet.
    `,
    // here we are adding the tool functions  to the assistant
    tools,
    model: "gpt-4o-mini",
  });
  return assistant;
}


export const getExistingAssistant = async (openai: OpenAI) => {
    try {
      return await openai.beta.assistants.retrieve(
        process.env.ASSISTANT_ID || ""
      );
    } catch (error) {
      console.log("Assistant not found, creating new one");
      return null;
    }
  };