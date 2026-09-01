import { Link, useNavigate, useParams } from "react-router";
import { useContentStore } from "../store/contentStore";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import useSound from "use-sound";
import navClick from "../sounds/navBtnClick.mp3";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ProjectInfo = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { getProjectById, currentProject, loading } = useContentStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProjectById(id as string);
  }, [id]);

  const [click] = useSound(navClick, {
    volume: 0.03,
  });

  const backSubmit = () => {
    navigate("/");
    toast("Вернулись");
    click();
  };
  const buttonStyle =
    "py-2 px-5 shadow-sm w-full rounded-lg border text-center";
  const buttonDisabledStyle = "text-gray-400 cursor-not-allowed";
  const spanStyle = "text-black font-semibold dark:text-white";

  if (loading) {
    return <div>{t("project.loading")}</div>;
  }
  if (!currentProject) return <div>{t("project.error")}</div>;

  return (
    <section className="flex justify-center items-center">
      <div className="w-2/3 flex gap-5">
        <div className="w-1/10">
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            whileHover={{ scale: 1.03 }}
            onClick={backSubmit}
            className="flex justify-center gap-1 border items-center text-lg shadow-md px-4 py-3 rounded-lg"
          >
            <IoMdArrowBack />
            {t("project.backButton")}
          </motion.button>
        </div>

        {/* Контент */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="w-9/10 shadow-md rounded-lg dark:border-gray-800 grid gap-2 p-5 border"
        >
          <header className="flex gap-3 w-full">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-sm"
              src={currentProject?.imageUrl}
              alt={currentProject?.title || "Project"}
            />
          </header>

          <div className="mt-5 flex">
            <div className="w-8/10">
              <p className="text-xl mb-2">{currentProject?.title}</p>
              <p className="line-clamp-3 dark:text-gray-300">
                <span className={spanStyle}>Описание:</span>{" "}
                {currentProject?.description}
              </p>
              <p className="dark:text-gray-300">
                <span className={spanStyle}>Стек проекта:</span>{" "}
                {currentProject?.stack.length
                  ? currentProject?.stack.join(", ")
                  : "Не указан"}
              </p>
              <p className="dark:text-gray-300">
                <span className={spanStyle}>Добавлен: </span>{" "}
                {currentProject?.createdAt
                  ? new Date(currentProject.createdAt).toLocaleDateString()
                  : "Не указано"}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="flex flex-col justify-center items-center gap-3 p-5"
            >
              {currentProject?.liveUrl ? (
                <Link to={currentProject.liveUrl} className={buttonStyle}>
                  Live Demo
                </Link>
              ) : (
                <button className={buttonDisabledStyle} disabled>
                  {" "}
                  Live Demo
                </button>
              )}

              {currentProject?.githubUrl ? (
                <Link to={currentProject.githubUrl} className={buttonStyle}>
                  GitHub
                </Link>
              ) : (
                <button className={buttonDisabledStyle} disabled>
                  {" "}
                  GitHub
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectInfo;
