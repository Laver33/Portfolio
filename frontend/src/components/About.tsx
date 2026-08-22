import PortfolioModel from "../components/3d/PortfolioModel";
import { FaArrowTurnDown } from "react-icons/fa6";

const About = () => {
  return (
    <>
      <div className="flex mt-10 justify-center items-center gap-3">
        <h2 className="text-xl font-medium">Current goal</h2>
        <FaArrowTurnDown className="mt-2" />
      </div>

      <div>
        <PortfolioModel />
      </div>
    </>
  );
};

export default About;
