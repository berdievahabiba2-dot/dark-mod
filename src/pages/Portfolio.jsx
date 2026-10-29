
import React from "react";
import { Code2, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function Portfolio() {
  const { t, language } = useLanguage();

  const projectText = {
    tj: {
      label: "Лоиҳаи таълимӣ",
      description:
        "Лоиҳаҳои React ва корҳои амалиро баъд аз омода шудан дар ин ҷо ҷойгир мекунам.",
      button: "Дар ҳоли таҳия",
    },
    ru: {
      label: "Учебный проект",
      description:
        "Здесь будут размещены мои React-проекты и практические работы после их завершения.",
      button: "В разработке",
    },
    en: {
      label: "Learning project",
      description:
        "My React projects and practical work will be added here as they are completed.",
      button: "In progress",
    },
  };

  const content = projectText[language];

  return (
    <section className="page-section">
      <span className="small-label">03 — {t.portfolio}</span>
      <h1 className="page-title">{t.portfolioTitle}</h1>
      <p className="page-description">{t.portfolioText}</p>

      <div className="portfolio-grid">
        <article className="portfolio-card">
          <div className="portfolio-cover">
            <Code2 size={48} />
            <span>REACT / 01</span>
          </div>

          <div className="portfolio-info">
            <div>
              <span className="small-label">{content.label}</span>
              <h2>React Project</h2>
            </div>
            <ArrowUpRight size={22} />
          </div>

          <p>{content.description}</p>

          <span className="project-status">{content.button}</span>
        </article>
      </div>
    </section>
  );
}
