import { useEffect, useState } from "react";
import MoonHallow from "../../public/icons/moon-regular.svg";
import MoonSolid from "../../public/icons/moon-solid.svg";

export default function ToggleTheme({ className, ...props }) {
  const [theme, settheme] = useState("light");

  // Toggles theme key in localstorage
  const handleClick = () => {
    if (localStorage.theme === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    location.reload();
  };

  // Sets loaded state to "theme" from localstorage
  useEffect(() => {
    settheme(localStorage.getItem("theme"));
  }, []);

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {theme === "dark" ? (
        <MoonSolid className={`text-text-light h-5 w-5 ${className}`} />
      ) : (
        <MoonHallow className={`text-text-light h-5 w-5 ${className}`} />
      )}
    </div>
  );
}
