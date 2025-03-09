import { OpenAI } from "openai";
import { Thread } from "openai/resources/beta/threads.mjs";

export async function createThread(
  openai: OpenAI,
  message: string
): Promise<Thread> {
  const thread = await openai.beta.threads.create();

 await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: message,
  });
  return thread;
}
