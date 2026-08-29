import About from "../components/About";
import Experience from "../components/Experience";
import MainInfo from "../components/MainInfo";
import Portfolio from "../components/Portfolio";
import TechStack from "../components/TechStack";
import { FaBriefcase } from "react-icons/fa";
import useGetData from "../hooks/getData";

export interface iExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  time: string;
}

const HomePage = () => {
  useGetData();

  // Опыт работы
  const experienceWorkData: iExperienceItem[] = [
    {
      id: 1,
      title: "Auto QA",
      company: "Роща разработки",
      period: "June 2025 - September 2025",
      time: "4 months",
    },
    {
      id: 2,
      title: "Manual QA",
      company: "Freelance",
      period: "March 2025 - September 2025",
      time: "7 months",
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "PREAX",
      period: "December 2025 - July 2026",
      time: "8 months",
    },
  ];

  // образование
  const experienceEducateData: iExperienceItem[] = [
    {
      id: 1,
      title: "Developer",
      company: "GGKTTiD",
      period: "2023 - 2026",
      time: "3 years",
    },
    {
      id: 2,
      title: "Mobile Developer",
      company: "Self-taught",
      period: "2024 - 2025",
      time: "1 year",
    },
    {
      id: 3,
      title: "Fullstack Developer",
      company: "Self-taught",
      period: "2025 - present",
      time: "1 year",
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
