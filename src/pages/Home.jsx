
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { useLanguage } from "../LanguageContext";

const skills = [
  {
    name: "HTML",
    number: "01",
    descriptions: {
      tj: "Сохтори саҳифаҳои веб",
      ru: "Структура веб-страниц",
      en: "Structure of web pages",
    },
  },
  {
    name: "CSS",
    number: "02",
    descriptions: {
      tj: "Дизайн ва ороиши сайт",
      ru: "Дизайн и оформление сайта",
      en: "Website styling and design",
    },
  },
  {
    name: "JavaScript",
    number: "03",
    descriptions: {
      tj: "Мантиқ ва интерактивии сайт",
      ru: "Логика и интерактивность сайта",
      en: "Website logic and interactivity",
    },
  },
  {
    name: "React",
    number: "04",
    descriptions: {
      tj: "Сохтани интерфейс бо компонентҳо",
      ru: "Создание интерфейсов с компонентами",
      en: "Building interfaces with components",
    },
  },
];

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <section className="hero">
      {/* INTRODUCTION */}
      <div className="hero-content">
        <span className="eyebrow">
          <span className="status-dot"></span>
          {t.current}
        </span>

        <h1>
          {t.intro}
          <span className="accent">.</span>
        </h1>

        <h2>{t.role}</h2>

        <p className="hero-description">
          {t.description}
        </p>

        <div className="hero-buttons">
          <Link to="/about" className="primary-button">
            {t.about}
            <ArrowRight size={18} />
          </Link>

          <Link to="/portfolio" className="secondary-button">
            {t.projects}
          </Link>
        </div>

        {/* TECHNOLOGIES */}
        <div className="hero-tags">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>React</span>
        </div>
      </div>

      {/* INTRODUCTION CARD */}
      <div className="hero-visual">
        <div className="visual-glow"></div>

        <div className="profile-card">
          <div className="profile-top">
            <span className="profile-icon">
              <Code2 size={28} />
            </span>

            <span className="profile-label">
              MY INTRODUCTION
            </span>
          </div>

          <div className="profile-monogram">H.</div>

          <h3>Verdieva Habiba</h3>

          <p>{t.role}</p>

          <div className="profile-line"></div>

          <div className="profile-bottom">
            <span>HTML · CSS</span>
            <span>JS · React</span>
          </div>
        </div>

        <div className="floating-label">
          {"< Hello />"}
        </div>
      </div>

      {/* SHADCN CAROUSEL */}
      <section className="skills-preview">
        <div className="section-heading">
          <div>
            <span className="small-label">
              {t.services}
            </span>

            <h2>{t.skillsText}</h2>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {skills.map((skill) => (
              <CarouselItem
                key={skill.name}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <article className="skill-card h-full">
                  <span className="skill-number">
                    {skill.number}
                  </span>

                  <h3>{skill.name}</h3>

                  <p>
                    {skill.descriptions[language]}
                  </p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-end gap-3 mt-5">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </section>
    </section>
  );
}
