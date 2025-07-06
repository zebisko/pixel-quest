export const ARTWORKS = [
  {
    id: 'starry-night',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: '1889',
    movement: 'Post-Impressionism',
    description: 'An iconic night sky over a small hillside village, painted from memory.',
    colors: ['#0c1445', '#4b5bab', '#8b9bb4', '#e6d3a7', '#f3e9d0'],
    difficulty: 'medium'
  },
  {
    id: 'mona-lisa',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    year: '1503-1519',
    movement: 'High Renaissance',
    description: 'A half-length portrait painting by Italian artist Leonardo da Vinci.',
    colors: ['#2c1e1e', '#5d4b36', '#8a7b66', '#c5b9a4', '#e8d9c5'],
    difficulty: 'hard'
  },
  {
    id: 'the-scream',
    title: 'The Scream',
    artist: 'Edvard Munch',
    year: '1893',
    movement: 'Expressionism',
    description: 'An iconic representation of human anxiety and existential dread.',
    colors: ['#e2ac3f', '#8d3a2b', '#3e2e2a', '#5c7ab8', '#f0e7d8'],
    difficulty: 'medium'
  },
  {
    id: 'girl-with-pearl',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: '1665',
    movement: 'Dutch Golden Age',
    description: 'A tronie of a girl with a headscarf and a pearl earring.',
    colors: ['#1a1a2e', '#3d3d5e', '#7a6a5e', '#c4b6a6', '#f0e6d2'],
    difficulty: 'hard'
  },
  {
    id: 'the-persistence-of-memory',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    year: '1931',
    movement: 'Surrealism',
    description: 'Famous for its melting clocks in a dreamlike landscape.',
    colors: ['#e8e0c8', '#d0c4a8', '#a89c84', '#6c5c54', '#3c3c3c'],
    difficulty: 'medium'
  },
  // Add more artworks as needed
];

export const getArtworkById = (id) => {
  return ARTWORKS.find(artwork => artwork.id === id);
};
