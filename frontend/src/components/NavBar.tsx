import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { IoPlanet, IoPlanetOutline } from "react-icons/io5";
import { BsTranslate } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import { FaMusic, FaVolumeMute } from "react-icons/fa";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import navClick from "../sounds/navBtnClick.mp3";
import bgMusic from "../sounds/bgMusic.mp3";

const NavBar = () => {
  const location = useLocation();
  // Музыка
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      play();
    }
  }, [isPlaying]);

  const [click] = useSound(navClick, {
    volume: 0.03,
  });

  const [play, { pause }] = useSound(bgMusic, {
    volume: 0.03,
    loop: true,
  });

  const musicToggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  const navItems = [
    { name: "Главная", href: "/" },
    { name: "Контакты", href: "/contact" },
  ];

  // Состояния
  const [isThemeOn, setIsThemeOn] = useState(false);
  const [isLanguageOn, setIsLanguageOn] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const navStyle = [
    {
      id: 1,
      offIcon: IoPlanetOutline,
      onIcon: IoPlanet,
      isActive: isThemeOn,
      click: () => setIsThemeOn(!isThemeOn),
    },
    {
      id: 2,
      offIcon: BsTranslate,
      onIcon: FaGlobe,
      isActive: isLanguageOn,
      click: () => setIsLanguageOn(!isLanguageOn),
    },
    {
      id: 3,
      offIcon: FaVolumeMute,
      onIcon: FaMusic,
      isActive: isMusicOn,
      click: () => {
        (setIsMusicOn(!isMusicOn), musicToggle());
      },
    },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
      {/* Заглушка */}
      <div className="sm:w-5 md:w-50" />

      {/* Навигация */}
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
                onClick={() => click()}
              >
                {item.name}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Настройки - справа */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg shadow-black/10 flex gap-1 p-1.5 rounded-2xl border border-white/20">
        {navStyle.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl transition-colors duration-200 cursor-pointer flex items-center justify-center
              ${
                item.isActive
                  ? "bg-black text-white"
                  : "hover:bg-black/5 text-gray-700"
              }`}
            onClick={item.click}
          >
            <div className="w-9 h-9 flex items-center justify-center">
              {item.isActive ? (
                <item.onIcon className="w-5 h-5 text-white" />
              ) : (
                <item.offIcon className="w-5 h-5 text-gray-700" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
