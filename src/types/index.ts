export interface User {
  id: string;
  username: string;
  avatar: AvatarConfig;
  stats: UserStats;
  inventory: PowerUp[];
  friends: string[];
}

export interface AvatarConfig {
  baseCharacter: string;
  accessories: string[];
  colors: Record<string, string>;
  unlocks: string[];
}

export interface UserStats {
  totalScore: number;
  quizzesTaken: number;
  winRate: number;
  categoryScores: Record<string, number>;
  streakDays: number;
  achievements: Achievement[];
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  effect: string;
  cooldown: number;
  icon: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export type QuestionType = 'single' | 'multiple' | 'dropdown' | 'scale' | 'truefalse' | 'matching';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number | number[];
  timeLimit: number;
  points: number;
  explanation?: string;
  hint?: string;
  matchingPairs?: { left: string; right: string }[];
  scaleRange?: { min: number; max: number; labels?: { start: string; end: string } };
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  creatorId: string;
  author: string;
  likes: number;
  plays: number;
  rating: number;
  tags: string[];
  createdAt: Date;
}

export interface Player {
  id: string;
  username: string;
  score: number;
  rank: number;
  avatar: string;
} 

export interface GlobalLeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
  quizzesCompleted: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}