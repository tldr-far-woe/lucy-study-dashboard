const studyTools = [
  {
    label: "Start Here",
    title: "Chapter Study Guides",
    text: "Work through each chapter with organized study cards, diagrams, vocabulary, and rapid review notes.",
  },
  {
    label: "Practice",
    title: "Quiz Questions",
    text: "Test yourself with chapter-based questions that can be updated from Google Sheets.",
  },
  {
    label: "Remember Faster",
    title: "Memory Tricks",
    text: "Use quick phrases, associations, and simple explanations to make hard concepts easier to remember.",
  },
  {
    label: "Quick Review",
    title: "Rapid Review",
    text: "Scan the most important facts before class, quizzes, labs, or exams.",
  },
];

const chapterPreview = [
  "Chapter 1: Introduction to Anatomy & Physiology",
  "Chapter 2: Chemistry of Life",
  "Chapter 3: Cells",
  "Chapter 4: Tissues",
  "Chapter 5: Integumentary System",
];

const studyFeatures = [
  {
    label: "Key Concepts",
    title: "Simplified Explanations",
    text: "Short, plain-English explanations for the most important terms and ideas.",
  },
  {
    label: "Memory Tricks",
    title: "Remember Faster",
    text: "Mnemonics, phrase tricks, and visual cues for hard-to-remember material.",
  },
  {
    label: "Quiz Mode",
    title: "Practice Questions",
    text: "Multiple choice, matching, and order-based questions for each chapter.",
  },
  {
    label: "Visual Diagrams",
    title: "Label & Review",
    text: "Study cell diagrams, skin layers, body planes, mitosis stages, and more.",
  },
  {
    label: "High Yield Mode",
    title: "Most Tested Ideas",
    text: "Focus on commonly tested concepts and things students often mix up.",
  },
  {
    label: "Rapid Review",
    title: "Study in 15 Minutes",
    text: "Quick review mode for diagrams, vocab, memory tricks, and process steps.",
  },
  {
    label: "Progress Tracking",
    title: "Track Weak Areas",
    text: "See completed chapters, quiz scores, and topics that need more review.",
  },
];

export default function Home() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <p className="eyebrow">BSC1085C Anatomy & Physiology</p>
        <h1>My A&P Study Dashboard</h1>
        <p className="hero-intro">
          Review chapters, study key terms, practice quiz questions, and use memory tricks to prepare for class.
        </p>
      </section>

      <section className="dashboard-grid">
        {studyTools.map((tool) => (
          <article className="dashboard-card" key={tool.title}>
            <p className="card-label">{tool.label}</p>
            <h2>{tool.title}</h2>
            <p>{tool.text}</p>
          </article>
        ))}
      </section>

      <section className="study-section">
        <div className="section-heading">
          <p className="eyebrow small">Study Path</p>
          <h2>Pick a chapter and start reviewing</h2>
          <p>
            This area will eventually pull chapter names and study content from Google Sheets.
          </p>
        </div>

        <div className="chapter-list">
          {chapterPreview.map((chapter) => (
            <button className="chapter-button" key={chapter}>
              {chapter}
            </button>
          ))}
        </div>
      </section>

      <section className="features-section">
  <div className="section-heading">
    <p className="eyebrow small">Study Tools</p>
    <h2>Everything to review smarter</h2>
    <p>
      These tools will eventually be powered by Google Sheets so chapters, terms, quiz questions, diagrams, and review notes can be updated without touching the code.
    </p>
  </div>

  <div className="features-grid">
    {studyFeatures.map((feature) => (
      <article className="feature-card" key={feature.title}>
        <p className="card-label">{feature.label}</p>
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
      </article>
    ))}
  </div>
</section>
    </main>
  );
}