import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants.mjs";
import { Run, Thread } from "openai/resources/beta/threads/index.mjs";

export async function createRun(openai: OpenAI, thread: Thread, assistant: Assistant) {
  let run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  while (run.status == "in_progress" || run.status == "queued") {
    await new Promise((resolve) => setTimeout(resolve, 100));

    run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }
  return run;
}

