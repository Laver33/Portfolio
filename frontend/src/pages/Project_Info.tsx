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
    <section className="flex justify-center items-center px-4 sm:px-6 md:px-0">
      <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-4 md:gap-5">
        {/* Кнопка назад */}
        <div className="w-full md:w-1/10">
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            whileHover={{ scale: 1.03 }}
            onClick={backSubmit}
            className="flex justify-center z-50 gap-1 border items-center text-lg shadow-md px-4 py-3 rounded-lg w-full md:w-auto"
          >
            <IoMdArrowBack />
            {t("project.backButton")}
          </motion.button>
        </div>

        {/* Контент */}
        <motion.div
          drag={true}
          dragConstraints={{
            left: -180,
            right: 180,
            top: -30,
            bottom: 30,
          }}
          dragMomentum={false}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full md:w-9/10 shadow-md z-40 rounded-lg dark:border-gray-800 grid gap-2 p-3 sm:p-5 border"
        >
          <header className="flex gap-3 w-full">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-sm"
              src={currentProject?.imageUrl}
              alt={currentProject?.title || "Project"}
            />
          </header>

          <div className="mt-3 sm:mt-5 flex flex-col lg:flex-row">
            {/* Информация о проекте */}
            <div className="w-full lg:w-8/10">
              <p className="text-lg sm:text-xl mb-2">{currentProject?.title}</p>
              <p className="line-clamp-3 dark:text-gray-300 text-sm sm:text-base">
                <span className={spanStyle}>Описание:</span>{" "}
                {currentProject?.description}
              </p>
              <p className="dark:text-gray-300 text-sm sm:text-base">
                <span className={spanStyle}>Стек проекта:</span>{" "}
                {currentProject?.stack.length
                  ? currentProject?.stack.join(", ")
                  : "Не указан"}
              </p>
              <p className="dark:text-gray-300 text-sm sm:text-base">
                <span className={spanStyle}>Добавлен: </span>{" "}
                {currentProject?.createdAt
                  ? new Date(currentProject.createdAt).toLocaleDateString()
                  : "Не указано"}
              </p>
            </div>

            {/* Кнопки Live Demo и GitHub */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="flex flex-row lg:flex-col justify-center items-center gap-3 p-3 sm:p-5 mt-4 lg:mt-0 w-full lg:w-auto"
            >
              {currentProject?.liveUrl ? (
                <Link
                  to={currentProject.liveUrl}
                  className={`${buttonStyle} w-full lg:w-auto min-w-30`}
                >
                  Live Demo
                </Link>
              ) : (
                <button
                  className={`${buttonDisabledStyle} w-full lg:w-auto min-w-30`}
                  disabled
                >
                  Live Demo
                </button>
              )}

              {currentProject?.githubUrl ? (
                <Link
                  to={currentProject.githubUrl}
                  className={`${buttonStyle} w-full lg:w-auto min-w-30`}
                >
                  GitHub
                </Link>
              ) : (
                <button
                  className={`${buttonDisabledStyle} w-full lg:w-auto min-w-30`}
                  disabled
                >
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
