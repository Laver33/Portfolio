import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { type iExperienceItem } from "../pages/Home";
import type { IconType } from "react-icons/lib";

const Experience = (props: {
  experienceData: iExperienceItem[];
  initalPosition: number;
  title: string;
  lineColor: string;
  delay: number;
  icon: IconType;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: props.initalPosition }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="w-1/2"
    >
      <header className="mb-14 flex gap-4 items-center font-medium text-3xl">
        <FaBriefcase className={`text-${props.lineColor}-500`} />
        <h2>{props.title}</h2>
      </header>

      <div className="flex w-full gap-8">
        {/* Линия */}
        <div className={`w-0.5 bg-${props.lineColor}-500 shrink-0`} />

        {/* Контент */}
        <div className="flex flex-col gap-10 w-full">
          {props.experienceData.map((item) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5 }}
              key={item.id}
              className="flex w-full justify-between p-4 bg-white shadow-md rounded-lg border border-gray-100"
            >
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.company}</p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-medium">{item.period}</p>
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
