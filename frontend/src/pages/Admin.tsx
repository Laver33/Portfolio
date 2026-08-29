import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useContentStore } from "../store/contentStore";
import { toast } from "react-toastify";

const addProjectSchema = z.object({
  title: z.string().min(2, "Min length is 2").max(100, "Max length is 100"),
  description: z
    .string()
    .min(2, "Min length is 2")
    .max(1000, "Max length is 1000"),
  stack: z.string().min(1, "List the stack separated by commas"),
  githubUrl: z.string().url("Invalid url").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid url").optional().or(z.literal("")),
});

type ProjectFormData = z.infer<typeof addProjectSchema>;

const AdminPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { postProject } = useContentStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      stack: "",
      githubUrl: "",
      liveUrl: "",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    if (!imageFile) {
      toast.error("Пожалуйста, выберите изображение");
      return;
    }

    try {
      await postProject(data, imageFile);
    } catch (e: any) {
      console.error("Ошибка создания: ", e);
    }
    reset();
    setImageFile(null);
  };

  return (
    <section className="flex justify-center">
      <div className="w-2/3">
        <h1 className="text-2xl">Admin page</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-1/2 mt-5 shadow-lg p-5 rounded"
        >
          <div>
            <label className="block text-sm font-medium">Название</label>
            <input
              {...register("title")}
              className="w-full p-2 border rounded"
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Описание</label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Стек (через запятую)
            </label>
            <input
              {...register("stack")}
              placeholder="React, Node.js, PostgreSQL"
              className="w-full p-2 border rounded"
            />
            {errors.stack && (
              <p className="text-red-600">{errors.stack.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">GitHub URL</label>
            <input
              {...register("githubUrl")}
              placeholder="https://github.com/..."
              className="w-full p-2 border rounded"
            />
            {errors.githubUrl && (
              <p className="text-red-600">{errors.githubUrl.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Live Demo URL</label>
            <input
              {...register("liveUrl")}
              placeholder="https://..."
              className="w-full p-2 border rounded"
            />
            {errors.liveUrl && (
              <p className="text-red-600">{errors.liveUrl.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Изображение</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded"
            />
            {imageFile && (
              <p className="text-sm text-green-600 mt-1">
                Выбрано: {imageFile.name} ({Math.round(imageFile.size / 1024)}{" "}
                KB)
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Создание..." : "Создать проект"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminPage;
