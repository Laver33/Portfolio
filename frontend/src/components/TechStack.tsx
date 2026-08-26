import type { IconType } from "react-icons/lib";
import {
  RiTailwindCssFill,
  RiReactjsLine,
  RiHtml5Fill,
  RiCss3Fill,
  RiJavascriptFill,
  RiGitBranchLine,
  RiGithubFill,
} from "react-icons/ri";
import { BiLogoVisualStudio } from "react-icons/bi";
import {
  SiTypescript,
  SiZod,
  SiFramer,
  SiExpress,
  SiFastify,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
  SiInsomnia,
} from "react-icons/si";
import { GiBearFace } from "react-icons/gi";
import { FaNodeJs } from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";
import { motion } from "framer-motion";
import { useContentStore } from "../store/contentStore";

const colorMap = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-500 dark:text-blue-400",
    hover: "hover:bg-blue-200",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-500 dark:text-orange-400",
    hover: "hover:bg-orange-200",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-500 dark:text-amber-400",
    hover: "hover:bg-amber-200",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-500 dark:text-purple-400",
    hover: "hover:bg-purple-200",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-500 dark:text-green-400",
    hover: "hover:bg-green-200",
  },
  yellow: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-500 dark:text-yellow-400",
    hover: "hover:bg-yellow-200",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-500 dark:text-red-400",
    hover: "hover:bg-red-200",
  },
  black: {
    bg: "bg-gray-100 dark:bg-gray-800/20",
    border: "border-gray-200 dark:border-gray-700",
    text: "text-gray-800 dark:text-gray-300",
    hover: "hover:bg-gray-200",
  },
};

const iconMap: Record<string, IconType> = {
  RiReactjsLine: RiReactjsLine,
  RiTailwindCssFill: RiTailwindCssFill,
  TbBrandThreejs: TbBrandThreejs,
  RiCss3Fill: RiCss3Fill,
  RiHtml5Fill: RiHtml5Fill,
  SiTypescript: SiTypescript,
  GiBearFace: GiBearFace,
  SiZod: SiZod,
  SiFramer: SiFramer,
  FaNodeJs: FaNodeJs,
  RiJavascriptFill: RiJavascriptFill,
  SiExpress: SiExpress,
  SiFastify: SiFastify,
  SiMongodb: SiMongodb,
  SiPostgresql: SiPostgresql,
  RiGitBranchLine: RiGitBranchLine,
  RiGithubFill: RiGithubFill,
  BiLogoVisualStudio: BiLogoVisualStudio,
  SiInsomnia: SiInsomnia,
  SiSqlite: SiSqlite,
};

const TechStack = () => {
  const { skills } = useContentStore();

  const skillsArray = Array.isArray(skills) ? skills : [];

  if (skillsArray.length === 0) {
    return <div className="text-center py-10">No skills found</div>;
  }
  const categories = ["Frontend", "Backend", "Languages", "Tools"];

  return (
    <div>
      <h2 className="text-3xl font-medium mb-14">Tech Stack</h2>
      <div className="grid gap-5">
        {categories.map((category) => {
          // Фильтр
          const categorySkills = skills.filter(
            (skill) => skill.category === category,
          );

          if (categorySkills.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-xl mb-3">{category}</h3>
              <div className="flex flex-wrap gap-3 text-lg">
                {categorySkills.map((skill, index) => {
                  const Icon = iconMap[skill.icon || ""];
                  const randomX = Math.floor(Math.random() * 80 - 40);
                  const randomY = Math.floor(Math.random() * 80 - 40);
                  const delayData = index * 0.5 + 0.1;
                  const colors =
                    colorMap[skill.color as keyof typeof colorMap] ||
                    colorMap.blue;

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: randomX, y: randomY }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 1.5, delay: delayData }}
                      key={skill.id}
                      className={`py-3 px-3 shadow-md border cursor-pointer rounded-md flex justify-center items-center gap-2 hover:scale-105 bg-white dark:bg-gray-800 ${colors.hover} ${colors.border}`}
                    >
                      {Icon && <Icon className={colors.text} />}
                      <p className="text-sm font-medium">{skill.name}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;
