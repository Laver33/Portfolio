import { useContentStore } from "../../store/contentStore";
import { motion } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router";

const AdminProjects = () => {
  const { projects, deleteProjectById } = useContentStore();

  const deleteHandler = async (id: string) => {
    deleteProjectById(id);
  };

  const navigate = useNavigate();

  return (
    <div className="w-4/10">
      <h1 className="text-2xl">Проекты</h1>

      <div className="grid mt-5 gap-5 max-h-150 w-full overflow-y-auto overflow-x-hidden">
        {projects.map((project) => (
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 1.2 }}
            key={project.id}
            className="p-5 mx-1 border shadow cursor-default rounded-lg"
          >
            <h2 className="text-xl font-medium">{project.title}</h2>
            <p className="break-all">{project.description.slice(0, 100)}</p>
            <p>Стек: {project.stack.join(", ") ?? "Нет стека"}</p>
            <p>
              <span className="font-medium">GitHub: </span>
              {project.githubUrl}
            </p>
            {project.liveUrl && (
              <p className="break-all">
                Live:{" "}
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  {project.liveUrl}
                </a>
              </p>
            )}
            <div className="flex mt-2 items-center justify-baseline gap-5">
              <button
                onClick={() => navigate(`/admin/edit/${project.id}`)}
                className="py-1 px-3 shadow border rounded-lg"
              >
                Изменить
              </button>
              <button
                onClick={() => deleteHandler(project.id)}
                className=" text-red-500 hover:scale-105 cursor-pointer"
              >
                <MdDeleteForever className="text-lg" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
