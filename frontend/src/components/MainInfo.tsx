import PortfolioImage from "../../public/image/anime2.png";
import { motion } from "framer-motion";

interface iMeInfo {
  fullname: string;
  specialty: string;
  specialty_stack: string;
}

const MainInfo = () => {
  const meInfo: iMeInfo = {
    fullname: "Pavel Drabena",
    specialty: "Fullstack developer",
    specialty_stack: "React & Node.js",
  };

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
      <div className="w-1/2 p-5 h-65 flex justify-center items-center">
        <img
          className="rounded-xl h-full"
          src={PortfolioImage}
          alt="portfolio image"
        />
      </div>

      <div className="w-1/2 p-5 flex flex-col gap-1">
        <h1 className="text-3xl">{meInfo.fullname}</h1>
        <p className="mt-2 text-xl">{meInfo.specialty}</p>
        <p className="text-xl">{meInfo.specialty_stack}</p>
      </div>
    </motion.div>
  );
};

export default MainInfo;
