import { useEffect } from "react";
import { useContentStore } from "../store/contentStore";

const useGetData = () => {
  const { fetchProjects, fetchSkills } = useContentStore();
  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);
};

export default useGetData;
