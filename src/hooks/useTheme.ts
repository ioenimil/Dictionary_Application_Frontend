import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) setTheme(theme);
  }, []);

  return theme;
};
