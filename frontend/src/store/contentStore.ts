import { create } from "zustand";

interface iProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;

  createdAt: Date;
}

interface iContentStore {
  projects: iProject[];
  skills: any[];
}

export const useContentStore = create<iContentStore>()((set) => ({
  projects: [],
  skills: [],

  // Функции
}));
