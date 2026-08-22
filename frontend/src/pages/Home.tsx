import About from "../components/About";
import Experience from "../components/Experience";
import MainInfo from "../components/MainInfo";
import Portfolio from "../components/Portfolio";
import TechStack from "../components/TechStack";
import { FaBriefcase } from "react-icons/fa";

export interface iExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  time: string;
}

const HomePage = () => {
  // Опыт работы
  const experienceWorkData: iExperienceItem[] = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Company Name",
      period: "2023 - Present",
      time: "4 years",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Company Name",
      period: "2023 - Present",
      time: "4 years",
    },
  ];

  // образование
  const experienceEducateData: iExperienceItem[] = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Company Name",
      period: "2023 - Present",
      time: "4 years",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Company Name",
      period: "2023 - Present",
      time: "4 years",
    },
  ];

  return (
    <div className="flex flex-col gap-55 items-center ">
      {/* Информация обо мне */}
      <section className="w-2/3">
        <MainInfo />
        <About />
      </section>

      {/* Опыт работы и образование */}
      <section className="w-2/3 flex gap-20 ">
        <Experience
          experienceData={experienceEducateData}
          initalPosition={-50}
          title={"Educate Experience"}
          lineColor={"blue"}
          delay={0}
          icon={FaBriefcase}
        />
        <Experience
          experienceData={experienceWorkData}
          initalPosition={50}
          title={"Work Experience"}
          lineColor={"green"}
          delay={0.5}
          icon={FaBriefcase}
        />
      </section>

      {/* Стек технологий */}
      <section className="w-2/3">
        <TechStack />
      </section>

      {/* Портфолио */}
      <section className="w-2/3">
        <Portfolio />
      </section>
    </div>
  );
};

export default HomePage;
