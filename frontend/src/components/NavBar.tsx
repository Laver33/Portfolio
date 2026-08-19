import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Главная", href: "/" },
    { name: "Контакты", href: "/contact" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg shadow-black/10 flex gap-1 p-1.5 rounded-2xl border border-white/20">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;

        return (
          <motion.div
            key={item.href}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl transition-colors duration-200 ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black/5 text-gray-700"
            }`}
          >
            <Link
              className="block px-4 py-2 font-medium text-sm"
              to={item.href}
            >
              {item.name}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default NavBar;
