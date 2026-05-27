"use client";

import React, { useEffect, useState } from "react";

import {
  getChapters,
  getFlashcards,
  getMemoryTricks,
  getQuizQuestions,
  getRapidReview,
} from "../../lib/googleSheets.js";

export default function ChapterPage(props: any) {
  const { id } = React.use(props.params as Promise<{ id: string }>);
  const [chapter, setChapter] = useState<any>(null);
  const [chapterFlashcards, setChapterFlashcards] = useState<any[]>([]);
  const [chapterMemoryTricks, setChapterMemoryTricks] = useState<any[]>([]);
  const [chapterQuizQuestions, setChapterQuizQuestions] = useState<any[]>([]);
  const [chapterRapidReview, setChapterRapidReview] = useState<any[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [selectedAnswers, setSelectedAnswers] =
  useState<{ [key: number]: string }>({});

  useEffect(() => {
    async function loadData() {
      const chapters = await getChapters();
      const flashcards = await getFlashcards();
      const memoryTricks = await getMemoryTricks();
      const quizQuestions = await getQuizQuestions();
      const rapidReview = await getRapidReview();

      setChapter(chapters.find((chapter: any) => chapter.chapter_id === id));
      setChapterFlashcards(flashcards.filter((card: any) => card.chapter_id === id));
      setChapterMemoryTricks(memoryTricks.filter((item: any) => item.chapter_id === id));
      setChapterQuizQuestions(quizQuestions.filter((question: any) => question.chapter_id === id));
      setChapterRapidReview(rapidReview.filter((item: any) => item.chapter_id === id));
    }

    loadData();
  }, [id]);

  if (!chapter) {
    return <p>Loading...</p>;
  }

  const hasFlashcards = chapterFlashcards.length > 0;

  return (
    <main className="chapter-page">
      <header className="chapter-header">
        <h1>
          Chapter {chapter.chapter_number}: {chapter.chapter_title}
        </h1>

        <p className="chapter-subtitle">
          Review flashcards, memory tricks, quiz questions, and rapid review notes for this chapter.
        </p>
      </header>

      <section className="chapter-section">
        <h2 className="chapter-section-title">Flashcards</h2>

        {hasFlashcards && (
          <div className="flashcard-wrapper">
            <button
              className="flashcard-arrow"
              onClick={() => {
                setCurrentCard((prev) =>
                  prev === 0 ? chapterFlashcards.length - 1 : prev - 1
                );
                setIsFlipped(false);
              }}
            >
              ←
            </button>

            <div
              className="study-card flashcard-card"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="flashcard-content">
                {isFlipped ? (
                  <p className="flashcard-answer">
                    {chapterFlashcards[currentCard]?.back}
                  </p>
                ) : (
                  <h3 className="flashcard-text">
                    {chapterFlashcards[currentCard]?.front}
                  </h3>
                )}
              </div>
            </div>

            <button
              className="flashcard-arrow"
              onClick={() => {
                setCurrentCard((prev) =>
                  prev === chapterFlashcards.length - 1 ? 0 : prev + 1
                );
                setIsFlipped(false);
              }}
            >
              →
            </button>
          </div>
        )}
      </section>

    <section className="chapter-section">
  <h2 className="chapter-section-title">
    Memory Tricks
  </h2>

  <div className="memory-grid">
    {chapterMemoryTricks.map(
      (item: any, index: number) => (
        <div
          key={index}
          className="memory-note"
        >
          <h3 className="memory-title">
            {item.trick}
          </h3>

          <p className="memory-meaning">
            {item.meaning}
          </p>
        </div>
           )
          )}
        </div>
      </section>

      <section className="chapter-section">
  <h2 className="chapter-section-title">
    Quiz Questions
  </h2>

  <div className="quiz-grid">
    {chapterQuizQuestions.map(
      (question: any, index: number) => {
        const selectedAnswer =
          selectedAnswers[index];

        const answered =
          selectedAnswer !== undefined;

        return (
          <div
            key={index}
            className="study-card quiz-card"
          >
            <h3>{question.question}</h3>

            <div className="quiz-options">
              {[
                {
                  label: "A",
                  value: question.option_a,
                },
                {
                  label: "B",
                  value: question.option_b,
                },
                {
                  label: "C",
                  value: question.option_c,
                },
                {
                  label: "D",
                  value: question.option_d,
                },
              ].map((option) => {
                const isCorrect =
                  option.label ===
                  question.correct_answer;

                const isSelected =
                  selectedAnswer ===
                  option.label;

                let optionClass =
                  "quiz-option";

                if (answered) {
                  if (isCorrect) {
                    optionClass +=
                      " correct-option";
                  }

                  if (
                    isSelected &&
                    !isCorrect
                  ) {
                    optionClass +=
                      " incorrect-option";
                  }
                }

                return (
                  <button
                    key={option.label}
                    className={optionClass}
                    onClick={() => {
                      if (answered) return;

                      setSelectedAnswers(
                        (prev) => ({
                          ...prev,
                          [index]:
                            option.label,
                        })
                      );
                    }}
                  >
                    <span>
                      {option.label}.{" "}
                      {option.value}
                    </span>

                    {answered &&
                      isCorrect && (
                        <span className="quiz-icon">
                          ✓
                        </span>
                      )}

                    {answered &&
                      isSelected &&
                      !isCorrect && (
                        <span className="quiz-icon">
                          ✕
                        </span>
                      )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }
    )}
  </div>
</section>

 <section className="chapter-section">
  <h2 className="chapter-section-title">
    Rapid Review
  </h2>

  <div className="review-grid">
    {chapterRapidReview.map((item: any, index: number) => (
    <div
  key={index}
  className="study-card review-card"
>
  <div className="review-top">
    <input
      type="checkbox"
      className="review-checkbox"
    />
  </div>

  <p className="review-note">
    {item.review_text}
  </p>
</div>
    ))}
  </div>
</section>

<section className="good-luck-section">
  <h2>Good Luck!</h2>
</section>
    </main>
  );
}