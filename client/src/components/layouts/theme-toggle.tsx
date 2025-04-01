"use client";

import { Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggleTheme}
      className="rounded-full bg-transparent p-2 transition-all duration-300 active:scale-90"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-muted-foreground transition-all duration-700 hover:text-secondary-foreground active:rotate-180" />
      ) : (
        <SunDim className="h-5 w-5 text-muted-foreground transition-all duration-700 hover:text-secondary-foreground active:rotate-180" />
      )}
    </button>
  );
}
