import OpenAI from "openai";
import { ToolConfig } from "../types/tools.types";
import { Run, Thread } from "openai/resources/beta/threads/index.mjs";
import { allTools } from "../tools/all-tools";

export async function handleTools(openai: OpenAI, run: Run, thread: Thread) : Promise<Run> {

    // check if the run is completed
    if (run.status === "completed") {
        return run;
    }
  // assistant figure out what tool functions to run and we can get it from below
  const toolFunction = run.required_action?.submit_tool_outputs?.tool_calls;
  if (!toolFunction) {
    return run;
  }

  const functionOutputs = await Promise.all(
    toolFunction.map(async (toolCall) => {
      const functionName = toolCall.function.name;
      const functionToolCall = allTools[functionName];
      if (!functionToolCall) {
        console.error(`Function ${functionName} not found`);
        return {
          output: `Function ${functionName} not found`,
          tool_call_id: toolCall.id,
        };
      }
      try {
        const functionInput = JSON.parse(toolCall.function.arguments);
        const result = await functionToolCall.function(functionInput);
        return {
          tool_call_id: toolCall.id,
          output: String(result),
        };
      } catch (error) {
        console.error(error);
        return {
          output: `Error: ${error}`,
          tool_call_id: toolCall.id,
        };
      }
    })
  );

  //filter out the function outputs that are not valid
  const validFunctionOutputs = functionOutputs.filter(
    Boolean
  ) as OpenAI.Beta.Threads.RunSubmitToolOutputsAndPollParams.ToolOutput[];

  if (validFunctionOutputs.length === 0) {
    console.error("No valid function outputs");
    return run;
  }

  //submit the function outputs to the run
  return openai.beta.threads.runs.submitToolOutputsAndPoll(
    thread.id,
    run.id,
    {
      tool_outputs: validFunctionOutputs,
    }
  );
}
