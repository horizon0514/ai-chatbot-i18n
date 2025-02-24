import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  let modelIdFromCookie: string | undefined;
  let id: string;
  try {
    id = generateUUID();

    const cookieStore = await cookies();
    modelIdFromCookie = cookieStore.get('chat-model')?.value;
  } catch (error) {
    console.error(error);
  }

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id!}
          id={id!}
          initialMessages={[]}
          selectedChatModel={DEFAULT_CHAT_MODEL}
          selectedVisibilityType="private"
          isReadonly={false}
        />
        <DataStreamHandler id={id!} />
      </>
    );
  }

  return (
    <>
      <Chat
        key={id!}
        id={id!}
        initialMessages={[]}
        selectedChatModel={modelIdFromCookie!}
        selectedVisibilityType="private"
        isReadonly={false}
      />
      <DataStreamHandler id={id!} />
    </>
  );
}
