import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = dark
      ? "dark"
      : "";

    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return (
    <button
      onClick={() =>
        setDark(!dark)
      }
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;