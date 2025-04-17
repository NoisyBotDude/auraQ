export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const mockCategories: Category[] = [
  {
    id: 'tech',
    name: 'Technology',
    description: 'Questions about computers, software, and digital innovation',
    icon: 'FaLaptopCode'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Questions about physics, chemistry, biology, and more',
    icon: 'FaFlask'
  },
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Questions about algebra, geometry, calculus, and more',
    icon: 'FaCalculator'
  },
  {
    id: 'history',
    name: 'History',
    description: 'Questions about world history and historical events',
    icon: 'FaLandmark'
  },
  {
    id: 'literature',
    name: 'Literature',
    description: 'Questions about books, authors, and literary works',
    icon: 'FaBook'
  },
  {
    id: 'geography',
    name: 'Geography',
    description: 'Questions about countries, places, and earth science',
    icon: 'FaGlobe'
  },
  {
    id: 'arts',
    name: 'Arts',
    description: 'Questions about painting, sculpture, and other art forms',
    icon: 'FaPalette'
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Questions about songs, artists, and musical theory',
    icon: 'FaMusic'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Questions about various sports and athletics',
    icon: 'FaRunning'
  },
  {
    id: 'movies',
    name: 'Movies & TV',
    description: 'Questions about films, TV shows, and cinema',
    icon: 'FaFilm'
  }
];

export const addNewCategory = (category: Category) => {
  mockCategories.push(category);
}; 