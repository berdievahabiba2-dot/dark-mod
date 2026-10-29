
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Moon, Sun, Languages } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import "./Layout.css";

export default function Layout() {
  const { language, setLanguage, t } = useLanguage();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const links = [
    { to: "/", label: t.home },
    { to: "/about", label: t.about },
    { to: "/services", label: t.services },
    { to: "/portfolio", label: t.portfolio },
  ];

  return (
    <div className="site">
      <header className="navbar">
        <NavLink to="/" className="logo">
          H<span>.</span>
        </NavLink>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="language-select">
            <Languages size={17} />
            <select
              aria-label="Choose language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="tj">TJ</option>
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
          </div>

          <button
            className="theme-button"
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            title={dark ? t.light : t.dark}
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Verdieva Habiba</p>
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
