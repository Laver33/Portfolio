import { useTranslation } from "react-i18next";
import PortfolioModel from "../components/3d/PortfolioModel";
import { FaArrowTurnDown } from "react-icons/fa6";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex mt-10 justify-center items-center gap-3">
        <h2 className="text-xl font-medium">{t("About.title")}</h2>
        <FaArrowTurnDown className="mt-2" />
      </div>

      <div>
        <PortfolioModel />
      </div>
    </>
  );
};

export default About;
