import { createOpenAI } from '@ai-sdk/openai';
import {
  customProvider,
} from 'ai';


const openai = createOpenAI({
  baseURL: 'https://geekai.co/api/v1',
  apiKey: 'sk-370PqaleM3DoQ3PdN0RsKwMKsIxOljBAhEMdbqhdq11lY9mb',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const DEFAULT_CHAT_MODEL: string = 'openai/gpt-4o-mini';

export const myProvider = customProvider({
  languageModels: {
    'openai/gpt-4o-mini': openai('gpt-4o-mini', {
      simulateStreaming: true,
    }),
    'openai/gpt-4o': openai('gpt-4o', {
      simulateStreaming: true,
    }),
    'openai/gpt-4-turbo': openai('gpt-4-turbo', {
      simulateStreaming: true,
    }),
    'title-model': openai('gpt-4o-mini', {
      simulateStreaming: true,
    }),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4-turbo',
    description: 'Turbo model for fast, lightweight tasks',
  },
];
