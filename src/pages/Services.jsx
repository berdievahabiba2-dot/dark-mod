
import React from "react";
import { Code2, Palette, Braces, Component } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const items = [
  {
    name: "HTML",
    text: {
      tj: "Сохтани сохтори саҳифаҳои веб.",
      ru: "Создание структуры веб-страниц.",
      en: "Building the structure of web pages.",
    },
    Icon: Code2,
  },
  {
    name: "CSS",
    text: {
      tj: "Ороиш, рангҳо ва тарҳи саҳифаҳо.",
      ru: "Стилизация, цвета и оформление страниц.",
      en: "Styling, colors, and page layouts.",
    },
    Icon: Palette,
  },
  {
    name: "JavaScript",
    text: {
      tj: "Илова кардани мантиқ ва интерактивӣ.",
      ru: "Добавление логики и интерактивности.",
      en: "Adding logic and interactivity.",
    },
    Icon: Braces,
  },
  {
    name: "React",
    text: {
      tj: "Сохтани интерфейс бо компонентҳо.",
      ru: "Создание интерфейсов с помощью компонентов.",
      en: "Building interfaces with components.",
    },
    Icon: Component,
  },
];

export default function Services() {
  const { t, language } = useLanguage();

  return (
    <section className="page-section">
      <span className="small-label">02 — {t.services}</span>
      <h1 className="page-title">{t.skillsTitle}</h1>
      <p className="page-description">{t.skillsText}</p>

      <div className="services-grid">
        {items.map(({ name, text, Icon }, index) => (
          <article className="service-card" key={name}>
            <div className="service-top">
              <span>0{index + 1}</span>
              <Icon size={27} />
            </div>

            <h2>{name}</h2>
            <p>{text[language]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
