# OpenAI Assistant with Tool Integration

A TypeScript project that implements an OpenAI Assistant with custom tool integration capabilities, specifically designed for handling onchain transactions and wallet interactions.

## 🌟 Features

- Custom OpenAI Assistant creation and management
- Tool integration framework for blockchain interactions
- Wallet balance checking functionality
- Asynchronous run management with status polling
- Error handling for tool executions

## 🛠️ Technical Architecture

### Core Components

1. **Assistant Creation** (`create-assistant.ts`)
   - Creates a specialized onchain assistant
   - Configures available tools and instructions
   - Uses GPT-4 model for processing

2. **Tool Handler** (`handle-tools.ts`)
   - Manages tool execution lifecycle
   - Processes assistant's tool requests
   - Handles tool output submission
   - Includes comprehensive error handling

3. **Run Management** (`manage-run.ts`)
   - Creates and monitors assistant runs
   - Implements status polling mechanism
   - Ensures proper run state management

## 🚀 Getting Started

### Prerequisites

- Node.js
- OpenAI API key
- Private Key of a wallet
- TypeScript

### Installation

1. Clone the repository
```bash
git clone https://github.com/jinali98/onchain-ai-agent-evm.git
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables
```bash
OPENAI_API_KEY=your_api_key_here
PRIVATE_KEY=your_wallet_private_key
ASSISTANT_ID=optional_assistant_id
```

### Usage

1. Create an assistant:
```typescript
const assistant = await createAssistant(openai);
```

2. Create and manage a run:
```typescript
const run = await createRun(openai, thread, assistant);
```

3. Handle tool executions:
```typescript
await handleTools(openai, run, thread);
```

## 🔧 Available Tools

- `getWalletBalance`: Retrieves the balance of a specified wallet address

