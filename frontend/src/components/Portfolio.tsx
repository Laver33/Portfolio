import CardProject from "./3d/CardProject";
import { useContentStore } from "../store/contentStore";

export interface iCardData {
  id: number;
  title: string;
  description: string;
}

const Portfolio = () => {
  const { projects } = useContentStore();

  return (
    <div>
      <h2 className="text-3xl font-medium mb-14">Projects</h2>

      {/* Само портфолио */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((item) => (
          <CardProject key={item.id} cardData={item} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
