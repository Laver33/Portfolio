import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/Admin";

const AppContent = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin, добавить защиту */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </main>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
