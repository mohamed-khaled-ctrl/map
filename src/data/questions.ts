export interface Question {
  id: number;
  image: string;
  options: string[];
  correct_answer: number;
}

// Placeholder questions - replace with your actual 100 questions
export const questions: Question[] = [
  {
  "id": 1,
  "image": "/images/question_1.png",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_answer": 2
},
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&q=80",
    options: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    correct_answer: 3
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    options: ["Answer A", "Answer B", "Answer C", "Answer D"],
    correct_answer: 1
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80",
    options: ["Response 1", "Response 2", "Response 3", "Response 4"],
    correct_answer: 4
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct_answer: 2
  },
  // Add 95 more questions following the same format
  // This is just a placeholder structure - replace with your actual questions
  ...Array.from({ length: 95 }, (_, i) => ({
    id: i + 6,
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=800&q=80`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct_answer: Math.floor(Math.random() * 4) + 1
  }))
];
