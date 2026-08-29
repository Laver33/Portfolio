import { create } from "zustand";
import api from "../service/api";

interface iProject {
  id?: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  createdAt?: Date;
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
  postProject: (data: any, imageFile: File) => Promise<void>;
}

export const useContentStore = create<iContentStore>()((set) => ({
  projects: [],
  skills: [],
  loading: false,
  error: null,

  // Добавление проекта
  postProject: async (data: any, imageFile: File) => {
    try {
      set({ loading: true, error: null });
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      const stackArray = data.stack
        .split(",")
        .map((item: string) => item.trim());

      formData.append("stack", JSON.stringify(stackArray));
      formData.append("githubUrl", data.githubUrl);
      formData.append("liveUrl", data.liveUrl);
      formData.append("image", imageFile);

      const response = await api.post("/projects", formData);

      set((state) => ({
        projects: [...state.projects, response.data],
        loading: false,
      }));

      return response.data;
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Проект не создан",
      });
    }
  },

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
      return undefined;
    }
  },
}));
