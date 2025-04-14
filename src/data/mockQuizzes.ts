import { Quiz } from '../types';

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Space Exploration',
    description: 'Test your knowledge about space, planets, and cosmic phenomena.',
    category: 'Science',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        text: 'Which planet is known as the Red Planet?',
        type: 'multiple',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'What is the largest planet in our solar system?',
        type: 'multiple',
        options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
        correctAnswer: 2,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'Which galaxy do we live in?',
        type: 'multiple',
        options: ['Andromeda', 'Milky Way', 'Triangulum', 'Sombrero'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      }
    ],
    tags: ['space', 'science', 'planets'],
    author: 'CosmicExplorer',
    creatorId: '1',
    likes: 120,
    createdAt: new Date(),
    plays: 1500,
    rating: 4.8
  },
  {
    id: '2',
    title: 'World Capitals',
    description: 'Challenge yourself with questions about world capitals and countries.',
    category: 'Geography',
    difficulty: 'easy',
    questions: [
      {
        id: '1',
        text: 'What is the capital of Japan?',
        type: 'multiple',
        options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
        correctAnswer: 2,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'Which country has Canberra as its capital?',
        type: 'multiple',
        options: ['New Zealand', 'Australia', 'Canada', 'South Africa'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'What is the capital of Brazil?',
        type: 'multiple',
        options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
        correctAnswer: 2,
        timeLimit: 30,
        points: 100
      }
    ],
    tags: ['geography', 'capitals', 'countries'],
    author: 'GeoMaster',
    creatorId: '2',
    likes: 85,
    createdAt: new Date(),
    plays: 2500,
    rating: 4.5
  },
  {
    id: '3',
    title: 'Movie Trivia',
    description: 'Test your knowledge of famous movies, actors, and directors.',
    category: 'Entertainment',
    difficulty: 'hard',
    questions: [
      {
        id: '1',
        text: 'Who directed the movie "Inception"?',
        type: 'multiple',
        options: ['Steven Spielberg', 'Christopher Nolan', 'James Cameron', 'Quentin Tarantino'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'Which movie won the Best Picture Oscar in 2020?',
        type: 'multiple',
        options: ['Parasite', '1917', 'Joker', 'Once Upon a Time in Hollywood'],
        correctAnswer: 0,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'Who played the lead role in "The Dark Knight"?',
        type: 'multiple',
        options: ['Christian Bale', 'Robert Downey Jr.', 'Leonardo DiCaprio', 'Brad Pitt'],
        correctAnswer: 0,
        timeLimit: 30,
        points: 100
      }
    ],
    tags: ['movies', 'entertainment', 'trivia'],
    author: 'FilmBuff',
    creatorId: '3',
    likes: 200,
    createdAt: new Date(),
    plays: 3000,
    rating: 4.7
  }
]; 