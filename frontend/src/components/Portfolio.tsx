import { toast } from "react-toastify";
import CardProject from "./3d/CardProject";

export interface iCardData {
  id: number;
  title: string;
  description: string;
  click: () => void;
}

const Portfolio = () => {
  const testData: iCardData[] = [
    {
      id: 1,
      title: "Проект 1",
      description: "Описание проекта 1",
      click: () => {
        toast.success("Clicked!");
      },
    },
    {
      id: 2,
      title: "Проект 1",
      description: "Описание проекта 1",
      click: () => {
        toast.success("Clicked!");
      },
    },
    {
      id: 3,
      title: "Проект 1",
      description: "Описание проекта 1",
      click: () => {
        toast.success("Clicked!");
      },
    },
    {
      id: 4,
      title: "Проект 1",
      description: "Описание проекта 1",
      click: () => {
        toast.success("Clicked!");
      },
    },
    {
      id: 5,
      title: "Проект 1",
      description: "Описание проекта 1",
      click: () => {
        toast.success("Clicked!");
      },
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-medium mb-14">Projects</h2>

      {/* Само портфолио */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testData.map((item) => (
          <CardProject key={item.id} cardData={item} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
