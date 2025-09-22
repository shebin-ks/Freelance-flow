import type { Message } from "../redux/features/messages/types";

export const groupMessagesByDate = (messages: Message[]) => {
  const grouped: Record<string, Message[]> = {};

  messages.forEach((msg) => {
    const date = new Date(msg.createdAt);
    const dateKey = date.toDateString();

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(msg);
  });

  return grouped;
};
