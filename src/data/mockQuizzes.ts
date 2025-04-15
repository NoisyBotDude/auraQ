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
  },
  {
    id: '4',
    title: 'Space Technology',
    description: 'Explore the engineering behind space exploration and satellite systems.',
    category: 'Technology',
    difficulty: 'hard',
    questions: [
      {
        id: '1',
        text: 'What was the first artificial satellite launched into space?',
        type: 'multiple',
        options: ['Explorer 1', 'Sputnik 1', 'Vanguard 1', 'Telstar 1'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'Which space telescope was launched in 1990?',
        type: 'multiple',
        options: ['James Webb', 'Hubble', 'Chandra', 'Spitzer'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'What is the main purpose of the International Space Station?',
        type: 'multiple',
        options: ['Space Tourism', 'Military Operations', 'Scientific Research', 'Satellite Repair'],
        correctAnswer: 2,
        timeLimit: 30,
        points: 100
      }
    ],
    tags: ['space', 'technology', 'engineering'],
    author: 'TechExplorer',
    creatorId: '4',
    likes: 150,
    createdAt: new Date(),
    plays: 1800,
    rating: 4.6
  },
  {
    id: '5',
    title: 'Astronomy Basics',
    description: 'Test your knowledge of fundamental astronomy concepts and celestial bodies.',
    category: 'Science',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        text: 'What is the closest star to Earth?',
        type: 'multiple',
        options: ['Alpha Centauri', 'Proxima Centauri', 'The Sun', 'Sirius'],
        correctAnswer: 2,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'Which planet has the most moons in our solar system?',
        type: 'multiple',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'What is a light-year?',
        type: 'multiple',
        options: ['Time measurement', 'Distance measurement', 'Speed measurement', 'Energy measurement'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      }
    ],
    tags: ['astronomy', 'science', 'space'],
    author: 'StarGazer',
    creatorId: '5',
    likes: 95,
    createdAt: new Date(),
    plays: 2200,
    rating: 4.3
  },
  {
    id: '6',
    title: 'Cosmic Phenomena',
    description: 'Learn about fascinating cosmic events and astronomical phenomena.',
    category: 'Science',
    difficulty: 'hard',
    questions: [
      {
        id: '1',
        text: 'What is a supernova?',
        type: 'multiple',
        options: ['A new star', 'A dying star explosion', 'A black hole', 'A galaxy'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'What causes a solar eclipse?',
        type: 'multiple',
        options: ['Earth blocking the Sun', 'Moon blocking the Sun', 'Mars blocking the Sun', 'Venus blocking the Sun'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'What is a quasar?',
        type: 'multiple',
        options: ['A type of star', 'A type of galaxy', 'A type of black hole', 'A type of nebula'],
        correctAnswer: 2,
        timeLimit: 30,
        points: 100
      }
    ],
    tags: ['cosmic', 'science', 'phenomena'],
    author: 'CosmicExplorer',
    creatorId: '6',
    likes: 180,
    createdAt: new Date(),
    plays: 1700,
    rating: 4.7
  },
  {
    id: '7',
    title: 'Space History',
    description: 'Test your knowledge about significant events in space exploration history.',
    category: 'History',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        text: 'Which country launched the first artificial satellite?',
        type: 'multiple',
        options: ['United States', 'Soviet Union', 'China', 'United Kingdom'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'Who was the first human to walk on the Moon?',
        type: 'multiple',
        options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Alan Shepard'],
        correctAnswer: 0,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'In which year was the International Space Station launched?',
        type: 'multiple',
        options: ['1995', '1998', '2001', '2005'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      }
    ],
    creatorId: '7',
    author: 'HistoryBuff',
    likes: 75,
    plays: 1200,
    rating: 4.4,
    tags: ['space', 'history', 'exploration'],
    createdAt: new Date()
  },
  {
    id: '8',
    title: 'Astrobiology',
    description: 'Explore the fascinating field of life in the universe and extraterrestrial possibilities.',
    category: 'Science',
    difficulty: 'hard',
    questions: [
      {
        id: '1',
        text: 'What is the study of life in the universe called?',
        type: 'multiple',
        options: ['Astrobiology', 'Exobiology', 'Xenobiology', 'All of the above'],
        correctAnswer: 3,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'Which planet in our solar system is most likely to have microbial life?',
        type: 'multiple',
        options: ['Mars', 'Europa', 'Titan', 'Venus'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'What is the Drake Equation used for?',
        type: 'multiple',
        options: ['Calculating rocket trajectories', 'Estimating the number of extraterrestrial civilizations', 'Measuring star distances', 'Predicting asteroid impacts'],
        correctAnswer: 1,
        timeLimit: 30,
        points: 100
      }
    ],
    creatorId: '8',
    author: 'BioExplorer',
    likes: 95,
    plays: 900,
    rating: 4.6,
    tags: ['space', 'biology', 'science'],
    createdAt: new Date()
  },
  {
    id: '9',
    title: 'Space Photography',
    description: 'Learn about capturing the beauty of space through astrophotography.',
    category: 'Art',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        text: 'What is the most important factor in astrophotography?',
        type: 'multiple',
        options: ['Camera type', 'Telescope size', 'Light pollution', 'All of the above'],
        correctAnswer: 3,
        timeLimit: 30,
        points: 100
      },
      {
        id: '2',
        text: 'Which type of photography captures star trails?',
        type: 'multiple',
        options: ['Long exposure', 'Short exposure', 'Time-lapse', 'High-speed'],
        correctAnswer: 0,
        timeLimit: 30,
        points: 100
      },
      {
        id: '3',
        text: 'What is the best time to photograph the Milky Way?',
        type: 'multiple',
        options: ['Noon', 'Sunset', 'Midnight', 'Dawn'],
        correctAnswer: 2,
        timeLimit: 30,
        points: 100
      }
    ],
    creatorId: '9',
    author: 'PhotoArtist',
    likes: 110,
    plays: 1500,
    rating: 4.7,
    tags: ['space', 'photography', 'art'],
    createdAt: new Date()
  }
]; 