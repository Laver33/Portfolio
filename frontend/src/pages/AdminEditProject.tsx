import { useParams } from "react-router";
import { useContentStore } from "../store/contentStore";
import { useEffect } from "react";

const AdminEditProjectPage = () => {
  const { id } = useParams();
  const { getProjectById, currentProject } = useContentStore();

  useEffect(() => {
    getProjectById(id as string);
  }, [id]);
  return (
    <div>
      <p>{currentProject?.title}</p>
    </div>
  );
};

export default AdminEditProjectPage;
