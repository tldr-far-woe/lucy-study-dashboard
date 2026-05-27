const SHEET_ID = "1V9bNbHNNl3O9cqHumqYOVh7rgQpaveAyL6xkMsLarDE";

async function fetchSheet(sheetName) {
  const url = `https://opensheet.elk.sh/${SHEET_ID}/${sheetName}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${sheetName}`);
  }

  return response.json();
}

export async function getChapters() {
  return fetchSheet("Chapters");
}

export async function getFlashcards() {
  return fetchSheet("Flashcards");
}

export async function getMemoryTricks() {
  return fetchSheet("Memory_Tricks");
}

export async function getQuizQuestions() {
  return fetchSheet("Quiz_Questions");
}

export async function getRapidReview() {
  return fetchSheet("Rapid_Review");
}

export async function getDiagrams() {
  return fetchSheet("Diagrams");
}

export async function getStudyTips() {
  return fetchSheet("Study_Tips");
}