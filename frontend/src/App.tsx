import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/Admin";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import ProjectInfo from "./pages/Project_Info";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen">
      <nav className="fixed top-4 left-0 right-0 z-50 px-6">
        <NavBar />
      </nav>

      <main className="mt-20 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

const AppContent = () => {
  return (
    <main>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:id" element={<ProjectInfo />} />

          {/* Admin, добавить защиту */}
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </main>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
