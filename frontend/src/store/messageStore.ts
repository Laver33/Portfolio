import { create } from "zustand";
import api from "../service/api";

interface iMessage {
  id?: string;
  name: string;
  email: string;
  theme: string;
  message: string;

  isRead?: boolean;
  createdAt?: Date;
}

interface iMessageStore {
  messages: iMessage[];
  currentMessage: iMessage | null;
  loading: boolean;

  // Функции
  fetchMessages: () => Promise<void>;
  getMessageById: (id: string) => Promise<iMessage | undefined>;
  createMessage: (message: Omit<iMessage, "id" | "createdAt">) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useMessageStore = create<iMessageStore>()((set) => ({
  messages: [],
  currentMessage: null,
  loading: false,

  // Все сообщения
  fetchMessages: async () => {
    try {
      set({ loading: true });

      const response = await api.get("/messages");

      set({ messages: response.data, loading: false });
    } catch (e: any) {
      set({ loading: false });
      console.error("Error:", e);
    }
  },

  getMessageById: async (id: string) => {
    try {
      set({ loading: true });

      const response = await api.get(`/message/${id}`);
      set({ currentMessage: response.data, loading: false });

      return response.data;
    } catch (e: any) {
      set({ loading: false });
      console.error("Error:", e);
      return undefined;
    }
  },

  deleteMessage: async (id: string) => {
    try {
      set({ loading: true });
      await api.delete(`/message/${id}`);
      set((state) => ({
        messages: state.messages.filter((message) => message.id !== id),
        loading: false,
      }));
    } catch (e: any) {
      set({ loading: false });
      console.error("Error:", e);
    }
  },

  createMessage: async (message: Omit<iMessage, "id" | "createdAt">) => {
    try {
      set({ loading: true });
      const response = await api.post("/messages", message);
      set((state) => ({
        messages: [...state.messages, response.data],
        loading: false,
      }));
    } catch (e: any) {
      set({ loading: false });
      console.error("Error:", e);
    }
  },
}));
