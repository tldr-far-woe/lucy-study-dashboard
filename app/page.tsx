import Link from "next/link";
import { getChapters } from "./lib/googleSheets.js";

export default async function Home() {
  const chapters = await getChapters();

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <p className="eyebrow">
          BSC1085C Anatomy & Physiology
        </p>

        <h1>My A&amp;P Study Dashboard</h1>

        <p className="hero-intro">
          Review chapters, study key terms,
          practice quiz questions, and use
          memory tricks to prepare for class.
        </p>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card card-teal">
          <p className="card-label">
            Start Here
          </p>

          <h2>Chapter Study Guides</h2>

          <p>
            Work through each chapter with
            organized study cards, diagrams,
            vocabulary, and rapid review
            notes.
          </p>
        </article>

        <article className="dashboard-card card-coral">
          <p className="card-label">
            Practice
          </p>

          <h2>Quiz Questions</h2>

          <p>
            Test yourself with chapter-based
            questions that can be updated
            from Google Sheets.
          </p>
        </article>

        <article className="dashboard-card card-gold">
          <p className="card-label">
            Remember Faster
          </p>

          <h2>Memory Tricks</h2>

          <p>
            Use quick phrases,
            associations, and simple
            explanations to make hard
            concepts easier to remember.
          </p>
        </article>

        <article className="dashboard-card card-dark">
          <p className="card-label">
            Quick Review
          </p>

          <h2>Rapid Review</h2>

          <p>
            Scan the most important facts
            before class, quizzes, labs, or
            exams.
          </p>
        </article>
      </section>

      <section className="study-section">
        <div className="section-heading">
          <p className="eyebrow small">
            Study Path
          </p>

          <h2>
            Pick a chapter and start
            reviewing
          </h2>

          <p>
            Chapters now pull directly from
            Google Sheets.
          </p>
        </div>

        <div className="chapter-list">
          {chapters.map((chapter: any) => (
            <Link
              key={chapter.chapter_id}
              href={`/chapter/${chapter.chapter_id}`}
              className="chapter-button"
            >
              Chapter{" "}
              {chapter.chapter_number}:{" "}
              {chapter.chapter_title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}