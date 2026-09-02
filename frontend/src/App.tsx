import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router";
import HomePage from "./pages/Home";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/Admin";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import ProjectInfo from "./pages/Project_Info";
import { motion, AnimatePresence } from "framer-motion";

// Тут навигация
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
  const location = useLocation();

  return (
    <main>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/projects/:id"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, scale: 0.7, x: -350, y: 250 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  transition={{ duration: 2 }}
                >
                  <ProjectInfo />
                </motion.div>
              </AnimatePresence>
            }
          />
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
