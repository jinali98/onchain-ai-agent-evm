import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants.mjs";
import { Run, Thread } from "openai/resources/beta/threads/index.mjs";
import { handleTools } from "./handle-tools";


export async function triggerRun(openai: OpenAI, thread: Thread, assistant: Assistant, run: Run) {

    // this will only run if the users message need any action from the assistant
while(run.status === "requires_action") {
    // @ts-ignore
   run = await handleTools(openai, run, thread);
}

if (run.status === "expired") {
    const errorMessage = `Run expired: ${run.last_error?.message || 'Unknown error'}` ;
    await openai.beta.threads.messages.create(thread.id, {
        role: "assistant",
        content: errorMessage,
    });
    return {
        type: "run_expired",
        text: {
            content: errorMessage,
        },
    };
}

if (run.status === "cancelled") {
    const errorMessage = `Run cancelled: ${run.last_error?.message || 'Unknown error'}` ;
    await openai.beta.threads.messages.create(thread.id, {
        role: "assistant",
        content: errorMessage,
    });
    return {
        type: "run_cancelled",
        text: {
            content: errorMessage,
        },
    };
}

if (run.status === "failed" ) {
    const errorMessage = `Run failed: ${run.last_error?.message || 'Unknown error'}` ;
    await openai.beta.threads.messages.create(thread.id, {
        role: "assistant",
        content: errorMessage,
    });
    return {
        type: "run_failed",
        text: {
            content: errorMessage,
        },
    };
}

const messages = await openai.beta.threads.messages.list(thread.id);

const latestMessageFromAssistant = messages.data.find(
    (message) => message.role === "assistant"
);

// there could be scenarios where the assistant does not need to run any actions
return latestMessageFromAssistant?.content[0] || {
    type: "no_response",
    text: {
        content: "No response from assistant",
    },
};

}

