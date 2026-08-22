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

interface iTechStackItem {
  id: number;
  name: string;
  icon: IconType | string;
  color: string;
}

interface iTechStackData {
  id: number;
  name: string;
  technologies: iTechStackItem[];
}

const TechStack = () => {
  const techStackData: iTechStackData[] = [
    {
      id: 1,
      name: "Frontend",
      technologies: [
        {
          id: 1,
          name: "React",
          icon: RiReactjsLine,
          color: "blue",
        },
        {
          id: 2,
          name: "Tailwind",
          icon: RiTailwindCssFill,
          color: "blue",
        },
        {
          id: 3,
          name: "Three.js",
          icon: TbBrandThreejs,
          color: "black",
        },
        {
          id: 4,
          name: "CSS",
          icon: RiCss3Fill,
          color: "blue",
        },
        {
          id: 5,
          name: "HTML",
          icon: RiHtml5Fill,
          color: "orange",
        },
        {
          id: 6,
          name: "TypeScript",
          icon: SiTypescript,
          color: "blue",
        },
        {
          id: 7,
          name: "Zustand",
          icon: GiBearFace,
          color: "amber",
        },
        {
          id: 8,
          name: "Zod",
          icon: SiZod,
          color: "blue",
        },
        {
          id: 9,
          name: "Motion",
          icon: SiFramer,
          color: "purple",
        },
      ],
    },
    {
      id: 2,
      name: "Backend",
      technologies: [
        {
          id: 1,
          name: "Node.js",
          icon: FaNodeJs,
          color: "green",
        },
        {
          id: 2,
          name: "JavaScript",
          icon: RiJavascriptFill,
          color: "yellow",
        },
        {
          id: 3,
          name: "TypeScript",
          icon: SiTypescript,
          color: "blue",
        },
        {
          id: 4,
          name: "Express",
          icon: SiExpress,
          color: "black",
        },
        {
          id: 5,
          name: "Fastify",
          icon: SiFastify,
          color: "black",
        },
        {
          id: 6,
          name: "MongoDB",
          icon: SiMongodb,
          color: "green",
        },
        {
          id: 7,
          name: "PostgreSQL",
          icon: SiPostgresql,
          color: "blue",
        },
      ],
    },
    {
      id: 3,
      name: "Languages",
      technologies: [
        {
          id: 1,
          name: "JavaScript",
          icon: RiJavascriptFill,
          color: "yellow",
        },
        {
          id: 2,
          name: "TypeScript",
          icon: SiTypescript,
          color: "blue",
        },
        {
          id: 3,
          name: "SQL",
          icon: SiSqlite,
          color: "blue",
        },
      ],
    },
    {
      id: 4,
      name: "Tools",
      technologies: [
        {
          id: 1,
          name: "Git",
          icon: RiGitBranchLine,
          color: "red",
        },
        {
          id: 2,
          name: "GitHub",
          icon: RiGithubFill,
          color: "black",
        },
        {
          id: 3,
          name: "VS Code",
          icon: BiLogoVisualStudio,
          color: "blue",
        },
        {
          id: 4,
          name: "Insomnia",
          icon: SiInsomnia,
          color: "purple",
        },
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-medium mb-14">Tech Stack</h2>

      <div className="grid gap-5 ">
        {techStackData.map((item) => (
          <div key={item.id}>
            <h3 className="text-xl mb-3">{item.name}</h3>
            <div className="flex flex-wrap gap-3 text-lg">
              {item.technologies.map((tech, index) => {
                const randomX = Math.floor(Math.random() * 80 - 40);
                const randomY = Math.floor(Math.random() * 80 - 40);
                const delayData = index * 0.5 + 0.1;

                return (
                  <motion.div
                    initial={{ opacity: 0, x: randomX, y: randomY }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1.5, delay: delayData }}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.3 },
                    }}
                    key={tech.id}
                    className={`py-2 px-3 cursor-pointer rounded-lg flex justify-center items-center gap-2 bg-${tech.color}-100 dark:bg-${tech.color}-900/20 border border-${tech.color}-200 dark:border-${tech.color}-800`}
                  >
                    <tech.icon
                      className={`text-${tech.color}-500 dark:text-${tech.color}-400`}
                    />
                    <p className="text-sm font-medium">{tech.name}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
