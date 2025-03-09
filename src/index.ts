import dotenv from "dotenv";
import { OpenAI } from "openai";
import { createAssistant, getExistingAssistant } from "./open-ai/create-assistant";
import { createThread } from "./open-ai/create-thread";
import { createRun } from "./open-ai/manage-run";
import { triggerRun } from "./open-ai/trigger-run";

dotenv.config();

async function main() {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  // check if assistant already exists
  let assistant = await getExistingAssistant(openai);
  if (!assistant) {
    assistant = await createAssistant(openai);
  }
  const thread = await createThread(
    openai,
    `Hello, how are you? I want to get the balance of my wallet. 
    My wallet address is 0xdD96337fad443ab8cA7D64075a4e8E71f6D10DE5`
  );
  const run = await createRun(openai, thread, assistant);
  const result = await triggerRun(openai, thread, assistant, run);

  console.log(result);
}

main();
