import { create } from "zustand";
import api from "../service/api";

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

interface iSkill {
  id: string;
  name: string;
  icon: string | null;
  category: "Frontend" | "Backend" | "Languages" | "Tools";
  color: string | null;
  order: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface iContentStore {
  projects: iProject[];
  skills: iSkill[];
  loading: boolean;
  error: string | null;

  // Функции
  fetchProjects: () => Promise<void>;
  fetchSkills: () => Promise<void>;
  getProjectById: (id: string) => Promise<iProject | undefined>;
}

export const useContentStore = create<iContentStore>()((set) => ({
  projects: [],
  skills: [],
  loading: false,
  error: null,

  // Все проекты
  fetchProjects: async () => {
    try {
      set({ loading: true, error: null });

      const response = await api.get("/projects");

      set({ projects: response.data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || " Проекты не найдены",
      });
      console.error("Error:", error);
    }
  },

  // Все скиллы
  fetchSkills: async () => {
    try {
      set({ loading: true, error: null });

      const response = await api.get("/skills");

      set({ skills: response.data.skills, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Скиллы не найдены",
      });
      console.error("Error:", error);
    }
  },

  // Проект по ID
  getProjectById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(`/projects/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Проект не найден",
      });
      console.error("Error:", error);
      return undefined;
    }
  },
}));
