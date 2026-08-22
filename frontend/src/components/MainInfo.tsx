import PortfolioImage from "/image/anime2.png";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

interface iSocial {
  id: number;
  icon: IconType;
  link: string;
  link_view?: string;
  title: string;
}

const MainInfo = () => {
  const fullName: string = "Pavel Drabenia";
  const About: string =
    "Frontend developer and former QA tester who decided to transition into full-stack development to build complete projects. I enjoy development. I currently position myself as a Junior Full-stack Developer. I have completed several full-stack projects and am continuing to reach new heights in my learning.";

  const socialsData: iSocial[] = [
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

  return (
    <motion.div
      initial={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        opacity: 0.3,
        y: 20,
      }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 1 }}
      className="flex rounded-2xl"
    >
      <div className="w-3/10 py-5 h-65 flex justify-center items-center">
        <img
          className="rounded-xl h-full"
          src={PortfolioImage}
          alt="portfolio image"
        />
      </div>

      <div className="w-7/10 py-5 flex flex-col gap-2">
        <h1 className="text-2xl">
          <span className="font-medium text-3xl">Hello!</span> I'm {fullName}
        </h1>
        <p className="text-lg">{About}</p>

        {/* социальные сети */}
        <div className="flex gap-3 mt-2 w-full">
          {socialsData.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              className="border-2 p-2 rounded-lg cursor-pointer text-black hover:bg-black hover:text-white duration-1000"
            >
              <header className="flex gap-2 items-center ">
                <item.icon />
                <p className="font-medium">{item.title}</p>
              </header>
              <p className="text-gray-400">
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
