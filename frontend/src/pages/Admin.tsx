import AdminForm from "../components/admin/adminForm";
import AdminProjects from "../components/admin/adminProjects";
import useGetData from "../hooks/getData";

const AdminPage = () => {
  useGetData();

  return (
    <section className="flex justify-center">
      <div className="flex gap-5 w-full max-w-6xl px-5">
        <AdminForm />
        <AdminProjects />
      </div>
    </section>
  );
};

export default AdminPage;
