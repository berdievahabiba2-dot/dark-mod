
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  tj: {
    home: "Асосӣ",
    about: "Дар бораи ман",
    services: "Малакаҳо",
    portfolio: "Портфолио",
    intro: "Салом! Ман Хабиба ҳастам",
    role: "Омӯзандаи Frontend Developer",
    description:
      "Ман Вердиева Хабиба ҳастам. Ҳоло дар курс таҳсил мекунам ва HTML, CSS, JavaScript ва React-ро меомӯзам. Мақсади ман такмил додани дониш ва сохтани вебсайтҳои зебову қулай аст.",
    aboutTitle: "Дар бораи ман",
    aboutText:
      "Ман ҳоло дар курси барномасозӣ таҳсил мекунам. HTML, CSS, JavaScript ва React-ро омӯхтаам. Мехоҳам донишамро зиёд карда, таҷрибаи амалии бештар ба даст орам.",
    skillsTitle: "Малакаҳои ман",
    skillsText: "Технологияҳое, ки омӯхтаам",
    portfolioTitle: "Портфолиои ман",
    portfolioText:
      "Дар ин ҷо лоиҳаҳои таълимӣ ва корҳои амалии ман ҷойгир карда мешаванд.",
    projects: "Лоиҳаҳои ман",
    contact: "Бо ман шинос шавед",
    dark: "Ҳолати торик",
    light: "Ҳолати равшан",
    footer: "Бо шавқ меомӯзам ва қадам ба қадам пеш меравам.",
    next: "Навбатӣ",
    previous: "Қаблӣ",
    current: "Ҳоло меомӯзам",
  },

  ru: {
    home: "Главная",
    about: "Обо мне",
    services: "Навыки",
    portfolio: "Портфолио",
    intro: "Привет! Я Хабиба",
    role: "Изучаю Frontend-разработку",
    description:
      "Меня зовут Вердиева Хабиба. Сейчас я учусь на курсах и изучаю HTML, CSS, JavaScript и React. Моя цель — развивать свои знания и создавать красивые и удобные сайты.",
    aboutTitle: "Обо мне",
    aboutText:
      "Сейчас я учусь на курсе программирования. Я изучила HTML, CSS, JavaScript и React. Хочу расширять свои знания и получать больше практического опыта.",
    skillsTitle: "Мои навыки",
    skillsText: "Технологии, которые я изучила",
    portfolioTitle: "Моё портфолио",
    portfolioText:
      "Здесь будут размещены мои учебные проекты и практические работы.",
    projects: "Мои проекты",
    contact: "Давайте знакомиться",
    dark: "Тёмная тема",
    light: "Светлая тема",
    footer: "Учусь с интересом и развиваюсь шаг за шагом.",
    next: "Следующий",
    previous: "Предыдущий",
    current: "Изучаю сейчас",
  },

  en: {
    home: "Home",
    about: "About",
    services: "Skills",
    portfolio: "Portfolio",
    intro: "Hello! I'm Habiba",
    role: "Frontend Development Learner",
    description:
      "My name is Habiba Verd ieva. I am currently taking a programming course and learning HTML, CSS, JavaScript, and React. My goal is to improve my knowledge and build beautiful, user-friendly websites.",
    aboutTitle: "About Me",
    aboutText:
      "I am currently studying on a programming course. I have learned HTML, CSS, JavaScript, and React. I want to expand my knowledge and gain more practical experience.",
    skillsTitle: "My Skills",
    skillsText: "Technologies I have learned",
    portfolioTitle: "My Portfolio",
    portfolioText:
      "My learning projects and practical work will be displayed here.",
    projects: "My Projects",
    contact: "Get to know me",
    dark: "Dark Mode",
    light: "Light Mode",
    footer: "Learning with curiosity and growing step by step.",
    next: "Next",
    previous: "Previous",
    current: "Currently learning",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("tj");

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
