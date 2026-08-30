import About from "../components/About";
import Experience from "../components/Experience";
import MainInfo from "../components/MainInfo";
import Portfolio from "../components/Portfolio";
import TechStack from "../components/TechStack";
import { FaBriefcase } from "react-icons/fa";
import useGetData from "../hooks/getData";
import { useTranslation } from "react-i18next";

export interface iExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  time: string;
}

const HomePage = () => {
  useGetData();
  const { t } = useTranslation();

  // Опыт работы
  const experienceWorkData: iExperienceItem[] = [
    {
      id: 1,
      title: t("Work_experience.item1.title"),
      company: t("Work_experience.item1.company"),
      period: t("Work_experience.item1.period"),
      time: t("Work_experience.item1.time"),
    },
    {
      id: 2,
      title: t("Work_experience.item2.title"),
      company: t("Work_experience.item2.company"),
      period: t("Work_experience.item2.period"),
      time: t("Work_experience.item2.time"),
    },
    {
      id: 3,
      title: t("Work_experience.item3.title"),
      company: t("Work_experience.item3.company"),
      period: t("Work_experience.item3.period"),
      time: t("Work_experience.item3.time"),
    },
  ];

  // образование
  const experienceEducateData: iExperienceItem[] = [
    {
      id: 1,
      title: t("Educate_experience.item1.title"),
      company: t("Educate_experience.item1.company"),
      period: t("Educate_experience.item1.period"),
      time: t("Educate_experience.item1.time"),
    },
    {
      id: 2,
      title: t("Educate_experience.item2.title"),
      company: t("Educate_experience.item2.company"),
      period: t("Educate_experience.item2.period"),
      time: t("Educate_experience.item2.time"),
    },
    {
      id: 3,
      title: t("Educate_experience.item3.title"),
      company: t("Educate_experience.item3.company"),
      period: t("Educate_experience.item3.period"),
      time: t("Educate_experience.item3.time"),
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
          title={t("Educate_experience.title")}
          lineColor={"blue"}
          delay={0}
          icon={FaBriefcase}
        />
        <Experience
          experienceData={experienceWorkData}
          initalPosition={50}
          title={t("Work_experience.title")}
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
