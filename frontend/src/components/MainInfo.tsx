import PortfolioImage from "/image/anime2.png";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaLinkedin, FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

interface iSocial {
  id: number;
  icon: IconType;
  link: string;
  link_view?: string;
  title: string;
}

export const socialsData: iSocial[] = [
  {
    id: 1,
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/drabenia",
    link_view: "linkedin/drabenia",
    title: "Linkedin",
  },
  {
    id: 2,
    icon: FaGithub,
    link: "https://github.com/Laver33",
    link_view: "github.com/Laver33",
    title: "Github",
  },
  {
    id: 3,
    icon: FaTelegram,
    link: "https://t.me/TrueReady",
    link_view: "t.me/TrueReady",
    title: "Telegram",
  },
  {
    id: 4,
    icon: FaInstagram,
    link: "https://www.instagram.com/_hofter_?igsh=MWFtbXF2Z2swcXcyaA%3D%3D&utm_source=qr",
    link_view: "instagram/_hofter_",
    title: "Instagram",
  },
];

const MainInfo = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        opacity: 0.5,
        y: 10,
      }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 1.5 }}
      className="flex flex-col md:flex-row rounded-2xl dark:border-2"
    >
      <div className="lg:w-3/10 md:w-2/10 py-5 md:h-35 lg:h-65 flex justify-center items-center">
        <img
          className="rounded-xl h-full w-auto"
          src={PortfolioImage}
          alt="portfolio image"
        />
      </div>

      <div className="w-full md:w-7/10 py-5 flex flex-col gap-2">
        <h1 className="lg:text-2xl md:text-lg text-center md:text-left">
          <span className="font-medium lg:text-3xl md:text-xl">
            {t("MyInfo.hello")}
          </span>{" "}
          {t("MyInfo.welcome")}
        </h1>
        <p className="lg:text-lg md:text-sm text-center md:text-left">
          {t("MyInfo.about")}
        </p>

        {/* социальные сети */}
        <div className="grid grid-cols-2 lg:flex gap-3 mt-2 w-full">
          {socialsData.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              className="border-2 p-2 rounded-lg cursor-pointer dark:text-white text-black hover:bg-black hover:text-white duration-1000"
            >
              <header className="flex gap-2 items-center">
                <item.icon />
                <p className="font-medium">{item.title}</p>
              </header>
              <p className="text-gray-400 text-sm truncate">
                {item.link_view?.length == undefined
                  ? item.link.slice(item.link.lastIndexOf("/"))
                  : item.link_view}
              </p>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MainInfo;
