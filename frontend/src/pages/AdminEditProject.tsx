import { useNavigate, useParams } from "react-router";
import { useContentStore } from "../store/contentStore";
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const editProjectSchema = z.object({
  title: z.string().min(2, "Min length is 2").max(100, "Max length is 100"),
  description: z
    .string()
    .min(2, "Min length is 2")
    .max(1000, "Max length is 1000"),
  stack: z.string().min(1, "List the stack separated by commas"),
  githubUrl: z.string().url("Invalid url").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid url").optional().or(z.literal("")),
});

type ProjectFormData = z.infer<typeof editProjectSchema>;

const AdminEditProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProjectById, currentProject, updateProjectById } =
    useContentStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      stack: "",
      githubUrl: "",
      liveUrl: "",
    },
  });

  useEffect(() => {
    getProjectById(id as string);
  }, [id]);

  useEffect(() => {
    if (currentProject) {
      reset({
        title: currentProject.title,
        description: currentProject.description,
        stack: currentProject.stack.join(", "),
        githubUrl: currentProject.githubUrl || "",
        liveUrl: currentProject.liveUrl || "",
      });
    }
  }, [currentProject, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      await updateProjectById(id as string, data);
    } catch (e: any) {
      console.error("Ошибка редактирования: ", e);
    }
  };

  const onBackClick = () => {
    navigate("/admin");
  };

  return (
    <div className="flex justify-center">
      <motion.section className="w-5/10 flex gap-5">
        <button
          onClick={onBackClick}
          className="px-5 py-3 rounded-lg flex max-h-13 items-center gap-2 text-base font-medium shadow-lg border"
        >
          <FaArrowLeft />
          <p>Назад</p>
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full border border-black/10 py-3 px-5 flex gap-3 flex-col rounded-lg shadow-lg"
        >
          <h2 className="text-center font-medium">Редактирование проекта</h2>

          <div className="mb-3">
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
              rows={7}
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
              placeholder="https://..."
              className="w-full p-2 border rounded"
            />
            {errors.githubUrl && (
              <p className="text-red-600">{errors.githubUrl?.message}</p>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 my-5 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Сохранение..." : "Сохранить"}
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default AdminEditProjectPage;
