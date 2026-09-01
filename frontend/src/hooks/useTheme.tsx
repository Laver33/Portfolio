import { useEffect, useState } from "react";

export const useTheme = () => {
  const [isThemeOn, setIsThemeOn] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isThemeOn) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isThemeOn]);

  const toggleTheme = () => {
    const newTheme = !isThemeOn;
    setIsThemeOn(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { isThemeOn, toggleTheme };
};
