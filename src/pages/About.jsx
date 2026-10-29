
import React from "react";
import { useLanguage } from "../LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="page-section">
      <span className="small-label">01 — {t.about}</span>
      <h1 className="page-title">{t.aboutTitle}</h1>

      <div className="about-card">
        <div className="about-avatar">H.</div>

        <div>
          <h2>Verdieva Habiba</h2>
          <p>{t.aboutText}</p>

          <div className="about-facts">
            <div>
              <span>{t.current}</span>
              <strong>Frontend Development</strong>
            </div>

            <div>
              <span>{t.skillsTitle}</span>
              <strong>HTML, CSS, JavaScript, React</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
