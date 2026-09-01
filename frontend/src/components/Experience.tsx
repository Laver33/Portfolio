import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { type iExperienceItem } from "../pages/Home";
import type { IconType } from "react-icons/lib";

// Маппинг цветов
const lineColorMap = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
};

const textColorMap = {
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
};

const Experience = (props: {
  experienceData: iExperienceItem[];
  initalPosition: number;
  title: string;
  lineColor: string;
  delay: number;
  icon: IconType;
}) => {
  const lineColorClass =
    lineColorMap[props.lineColor as keyof typeof lineColorMap] || "bg-blue-500";
  const textColorClass =
    textColorMap[props.lineColor as keyof typeof textColorMap] ||
    "text-blue-500";

  return (
    <motion.div
      initial={{ opacity: 0, x: props.initalPosition }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="w-1/2"
    >
      <header className="mb-14 flex gap-4 items-center font-medium text-2xl">
        <FaBriefcase className={textColorClass} />
        <h2>{props.title}</h2>
      </header>

      <div className="flex w-full gap-8">
        {/* Линия  */}
        <div className="relative">
          <div className={`w-0.5 h-full ${lineColorClass} opacity-20`} />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{
              duration: 1.5,
              delay: props.delay || 0.5,
              ease: "easeInOut",
            }}
            className={`absolute top-0 w-0.5 ${lineColorClass}`}
          />
        </div>

        {/* Контент */}
        <div className="flex flex-col gap-6 w-full">
          {props.experienceData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: (props.delay || 0.5) + (index + 1) * 0.2,
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2 },
              }}
              key={item.id}
              className="flex w-full justify-between items-center p-4 dark:shadow-gray-600 bg-white shadow-md rounded-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div>
                <h3 className="text-xl font-semibold dark:text-black">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.company}</p>
              </div>

              <div className="text-right shrink-0 ml-4">
                <p className="font-medium text-sm">{item.period}</p>
                <p className="text-sm text-gray-500">({item.time})</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
