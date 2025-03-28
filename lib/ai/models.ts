import { createOpenAI } from '@ai-sdk/openai';
import {
  customProvider,
} from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';

const openai = createOpenAI({
  baseURL: 'https://geekai.co/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
});

const deepseek = createDeepSeek({
  baseURL: 'https://geekai.co/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
});

export const DEFAULT_CHAT_MODEL: string = 'openai/gpt-4o-mini';

export const myProvider = customProvider({
  languageModels: {
    'openai/gpt-4o-mini': openai('gpt-4o-mini'),
    'openai/gpt-4o': openai('gpt-4o'),
    'grok3': openai('grok-3'),
    'doubao-1.5-pro-32k': openai('doubao-1.5-pro-32k'),
    'deepseek/deepseek-v3:full': deepseek('deepseek/deepseek-v3:full', {
    }),
    'deepseek/deepseek-r1:full': deepseek('deepseek/deepseek-r1:full', {
    }),
    'deepseek-r1-distill-llama-70b': deepseek('deepseek-r1-distill-llama-70b', {
    }),
    'deepseek-r1-distill-qwen-32b': deepseek('deepseek-r1-distill-qwen-32b', {
    }),
    'qwq-32b': openai('qwq-32b', {
    }),
    'farui-plus': openai('farui-plus', {
    }),
    'chat-model-reasoning': openai('sonar-reasoning', {
    }),// 这个模型是用来联网推理的，必须。
    'title-model': openai('gpt-4o-mini'), // 这个模型是用来生成标题的，必须。
    'artifact-model': openai('gpt-4o-mini'), // 这个模型是用来生成artifact的，必须。否则写文章会报错
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  // {
  //   id: 'openai/gpt-4o-mini',
  //   name: 'GPT-4o-mini',
  //   description: '小模型，快速，轻量级任务',
  // },
  // {
  //   id: 'openai/gpt-4o',
  //   name: 'GPT-4o',
  //   description: '大模型，复杂，多步骤任务',
  // },
  // {
  //   id: 'grok3',
  //   name: 'Grok-3',
  //   description: 'Grok 3 标准版',
  // },
  {
    id: 'doubao-1.5-pro-32k',
    name: 'Doubao-1.5-pro',
    description: 'Doubao 1.5 Pro 32k',
  },
  {
    id: 'deepseek/deepseek-v3:full',
    name: 'DeepSeek-v3',
    description: 'DeepSeek-V3 满血版',
  },
  {
    id: 'deepseek/deepseek-r1:full',
    name: 'DeepSeek-R1',
    description: 'DeepSeek-R1 满血版',
  },
  {
    id: 'qwq-32b',
    name: 'QwQ-32b',
    description: '通义千问QwQ-32b',
  },
  {
    id: 'farui-plus',
    name: 'Farui-Plus',
    description: '通义法睿-Plus',
  },
];
