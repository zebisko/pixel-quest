/**
 * Complete 25-level configuration system implementing the specification
 * Each level defines quest requirements and artwork quantities for balanced progression
 * 
 * @type {Object.<number, {questsPerArtwork: number, artworksNeeded: number, title: string, description: string}>}
 */
export const LEVEL_CONFIG = {
  1: { questsPerArtwork: 5, artworksNeeded: 1, title: 'Tutorial', description: 'Introduction to pixel art discovery' },
  2: { questsPerArtwork: 8, artworksNeeded: 1, title: 'Apprentice', description: 'Learning the basics' },
  3: { questsPerArtwork: 12, artworksNeeded: 1, title: 'Novice', description: 'Building confidence' },
  4: { questsPerArtwork: 15, artworksNeeded: 1, title: 'Adept', description: 'Getting comfortable' },
  5: { questsPerArtwork: 20, artworksNeeded: 1, title: 'Practitioner', description: 'Developing consistency' },
  6: { questsPerArtwork: 10, artworksNeeded: 2, title: 'Multi-tasker', description: 'Managing multiple artworks' },
  7: { questsPerArtwork: 12, artworksNeeded: 2, title: 'Coordinator', description: 'Balancing complexity' },
  8: { questsPerArtwork: 15, artworksNeeded: 2, title: 'Organizer', description: 'Advanced planning' },
  9: { questsPerArtwork: 18, artworksNeeded: 2, title: 'Strategist', description: 'Strategic thinking' },
  10: { questsPerArtwork: 15, artworksNeeded: 3, title: 'Curator', description: 'Three artwork mastery' },
  11: { questsPerArtwork: 18, artworksNeeded: 3, title: 'Collector', description: 'Growing collection' },
  12: { questsPerArtwork: 22, artworksNeeded: 3, title: 'Connoisseur', description: 'Artistic appreciation' },
  13: { questsPerArtwork: 20, artworksNeeded: 4, title: 'Expert', description: 'Four artwork challenge' },
  14: { questsPerArtwork: 24, artworksNeeded: 4, title: 'Authority', description: 'Established expertise' },
  15: { questsPerArtwork: 29, artworksNeeded: 4, title: 'Specialist', description: 'Specialized knowledge' },
  16: { questsPerArtwork: 28, artworksNeeded: 5, title: 'Master', description: 'Five artwork mastery' },
  17: { questsPerArtwork: 34, artworksNeeded: 5, title: 'Virtuoso', description: 'Exceptional skill' },
  18: { questsPerArtwork: 41, artworksNeeded: 5, title: 'Grandmaster', description: 'Elite achievement' },
  19: { questsPerArtwork: 41, artworksNeeded: 6, title: 'Champion', description: 'Six artwork challenge' },
  20: { questsPerArtwork: 49, artworksNeeded: 6, title: 'Hero', description: 'Heroic dedication' },
  21: { questsPerArtwork: 59, artworksNeeded: 6, title: 'Legend', description: 'Legendary status' },
  22: { questsPerArtwork: 71, artworksNeeded: 6, title: 'Mythic', description: 'Mythical achievement' },
  23: { questsPerArtwork: 85, artworksNeeded: 6, title: 'Immortal', description: 'Immortal dedication' },
  24: { questsPerArtwork: 102, artworksNeeded: 6, title: 'Divine', description: 'Divine mastery' },
  25: { questsPerArtwork: 122, artworksNeeded: 6, title: 'Transcendent', description: 'Ultimate achievement' }
};

/**
 * Calculate total quests needed to complete a level
 * @param {number} level - The level number (1-25)
 * @returns {number} Total quests required for the level
 */
export const getTotalQuestsForLevel = (level) => {
  const config = LEVEL_CONFIG[level];
  return config ? config.questsPerArtwork * config.artworksNeeded : 0;
};

/**
 * Calculate pixels to reveal per quest for a level
 * Uses ceiling division to ensure artwork completion
 * @param {number} level - The level number (1-25)
 * @returns {number} Pixels revealed per quest completion
 */
export const getPixelsPerQuest = (level) => {
  const config = LEVEL_CONFIG[level];
  if (!config) return 0;
  // Ensure we always reveal enough pixels to complete the artwork
  return Math.ceil(TOTAL_PIXELS / config.questsPerArtwork);
};

// Calculate total XP needed to reach a level
export const getTotalXpForLevel = (targetLevel) => {
  let totalXp = 0;
  for (let i = 1; i < targetLevel; i++) {
    // Use variable XP based on level difficulty to ensure progression
    const baseXp = 37.5; // Average XP per quest
    const levelMultiplier = 1 + (i - 1) * 0.1; // Increase XP requirement by 10% per level
    totalXp += getTotalQuestsForLevel(i) * baseXp * levelMultiplier;
  }
  return Math.round(totalXp);
};

// Calculate current level from total XP
export const getLevelFromXp = (totalXp) => {
  let level = 1;
  let xpConsumed = 0;
  
  while (level <= 25) {
    const baseXp = 37.5;
    const levelMultiplier = 1 + (level - 1) * 0.1;
    const levelXpRequired = getTotalQuestsForLevel(level) * baseXp * levelMultiplier;
    
    if (totalXp >= xpConsumed + levelXpRequired) {
      xpConsumed += levelXpRequired;
      level++;
    } else {
      break;
    }
  }
  
  return Math.min(level, 25);
};

// Calculate XP required for current level
export const getXpRequiredForLevel = (level) => {
  const baseXp = 37.5;
  const levelMultiplier = 1 + (level - 1) * 0.1;
  return Math.round(getTotalQuestsForLevel(level) * baseXp * levelMultiplier);
};

// Import SVG artworks
import picassoLesdemoiselles from '../assets/01_picasso_les_demoiselles.svg';
import vanGoghStarryNight from '../assets/11_van_gogh_starry_night.svg';
import malevichWhiteOnWhite from '../assets/03_malevich_white_on_white.svg';
import daliPersistenceMemory from '../assets/04_dali_persistence_of_memory.svg';
import raviVarmaArjunSubhadra from '../assets/05_ravi_varma_arjun_subhadra.svg';
import jaminiRoyApsaras from '../assets/06_jamini_roy_apsaras.svg';
import husainLovers from '../assets/07_husain_lovers.svg';
import picassoGuernica from '../assets/08_picasso_guernica.svg';
import razaTanavaBinDu from '../assets/09_raza_tanava_bindu.svg';
import sherGilFarkasKhan from '../assets/10_sher_gil_farkas_khan.svg';
import warholSoupCans from '../assets/12_warhol_soup_cans.svg';
import pollockLavenderMist from '../assets/13_pollock_lavender_mist.svg';
import nandalalBose from '../assets/14_nandalal_bose.svg';
import tyebMehtaFallingFigure from '../assets/15_tyeb_mehta_falling_figure.svg';
import kandinskyCompositionVII from '../assets/16_kandinsky_composition_vii.svg';
import ramKumarLandscape from '../assets/17_ram_kumar_landscape.svg';
import rothkoRedStudy from '../assets/18_rothko_red_study.svg';
import bPrabhaWoman from '../assets/19_b_prabha_woman.svg';
import mondrianComposition from '../assets/20_mondrian_composition.svg';
import duchampFountain from '../assets/02_duchamp_fountain.svg';
import hokusaiGreatWave from '../assets/21_hokusai_great_wave.svg';
import satishGujral from '../assets/22_satish_gujral.svg';
import kahloThornNecklace from '../assets/23_kahlo_thorn_necklace.svg';
import basquiatSkull from '../assets/24_basquiat_skull.svg';
import avinashChandra from '../assets/25_avinash_chandra.svg';
import yvesKleinBlue from '../assets/26_yves_klein_blue.svg';
import zahaHadid from '../assets/27_zaha_hadid.svg';

/**
 * Extended artwork database with curated masterpieces from various cultures and periods
 * Each artwork includes metadata and SVG path for educational and discovery purposes
 * 
 * @type {Array.<{id: number, svgPath: string, title: string, artist: string, description: string, year: number, period: string, level: number}>}
 */
export const ARTWORKS = [
  {
    id: 1,
    svgPath: picassoLesdemoiselles,
    title: "Les Demoiselles d'Avignon",
    artist: "Pablo Picasso",
    description: "Revolutionary cubist masterpiece",
    year: 1907,
    period: "Cubism",
    level: 1
  },
  {
    id: 2,
    svgPath: vanGoghStarryNight,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    description: "Iconic post-impressionist painting",
    year: 1889,
    period: "Post-Impressionism",
    level: 2
  },
  {
    id: 3,
    svgPath: malevichWhiteOnWhite,
    title: "White on White",
    artist: "Kazimir Malevich",
    description: "Suprematist geometric abstraction",
    year: 1918,
    period: "Suprematism",
    level: 3
  },
  {
    id: 4,
    svgPath: daliPersistenceMemory,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    description: "Surrealist masterpiece with melting clocks",
    year: 1931,
    period: "Surrealism",
    level: 4
  },
  {
    id: 5,
    svgPath: raviVarmaArjunSubhadra,
    title: "Arjuna and Subhadra",
    artist: "Raja Ravi Varma",
    description: "Classical Indian mythological painting",
    year: 1890,
    period: "Indian Classical",
    level: 5
  },
  {
    id: 6,
    svgPath: jaminiRoyApsaras,
    title: "Apsaras",
    artist: "Jamini Roy",
    description: "Bengal folk art style painting",
    year: 1940,
    period: "Indian Folk",
    level: 6
  },
  {
    id: 7,
    svgPath: husainLovers,
    title: "Lovers",
    artist: "M.F. Husain",
    description: "Modern Indian expressionist work",
    year: 1970,
    period: "Indian Modern",
    level: 6
  },
  {
    id: 8,
    svgPath: picassoGuernica,
    title: "Guernica",
    artist: "Pablo Picasso",
    description: "Powerful anti-war cubist painting",
    year: 1937,
    period: "Cubism",
    level: 7
  },
  {
    id: 9,
    svgPath: razaTanavaBinDu,
    title: "Tanava Bindu",
    artist: "S.H. Raza",
    description: "Abstract geometric Indian painting",
    year: 1980,
    period: "Indian Abstract",
    level: 7
  },
  {
    id: 10,
    svgPath: sherGilFarkasKhan,
    title: "Two Women",
    artist: "Amrita Sher-Gil",
    description: "Indo-European synthesis painting",
    year: 1935,
    period: "Indian Modern",
    level: 8
  },
  {
    id: 11,
    svgPath: warholSoupCans,
    title: "Campbell's Soup Cans",
    artist: "Andy Warhol",
    description: "Pop art consumer culture critique",
    year: 1962,
    period: "Pop Art",
    level: 8
  },
  {
    id: 12,
    svgPath: pollockLavenderMist,
    title: "Lavender Mist",
    artist: "Jackson Pollock",
    description: "Abstract expressionist drip painting",
    year: 1950,
    period: "Abstract Expressionism",
    level: 9
  },
  {
    id: 13,
    svgPath: nandalalBose,
    title: "Gandhi and the Charkha",
    artist: "Nandalal Bose",
    description: "Indian independence movement art",
    year: 1930,
    period: "Indian Nationalist",
    level: 9
  },
  {
    id: 14,
    svgPath: tyebMehtaFallingFigure,
    title: "Falling Figure",
    artist: "Tyeb Mehta",
    description: "Contemporary Indian figurative painting",
    year: 1998,
    period: "Indian Contemporary",
    level: 10
  },
  {
    id: 15,
    svgPath: kandinskyCompositionVII,
    title: "Composition VII",
    artist: "Wassily Kandinsky",
    description: "Abstract art pioneer masterpiece",
    year: 1913,
    period: "Abstract",
    level: 10
  },
  {
    id: 16,
    svgPath: ramKumarLandscape,
    title: "Landscape",
    artist: "Ram Kumar",
    description: "Indian modernist landscape painting",
    year: 1975,
    period: "Indian Modern",
    level: 10
  },
  {
    id: 17,
    svgPath: rothkoRedStudy,
    title: "Red Study",
    artist: "Mark Rothko",
    description: "Color field abstract painting",
    year: 1958,
    period: "Abstract Expressionism",
    level: 11
  },
  {
    id: 18,
    svgPath: bPrabhaWoman,
    title: "Woman",
    artist: "B. Prabha",
    description: "Contemporary Indian women-centric art",
    year: 1980,
    period: "Indian Contemporary",
    level: 11
  },
  {
    id: 19,
    svgPath: mondrianComposition,
    title: "Composition with Red Blue and Yellow",
    artist: "Piet Mondrian",
    description: "Neoplasticism geometric abstraction",
    year: 1930,
    period: "De Stijl",
    level: 11
  },
  {
    id: 20,
    svgPath: duchampFountain,
    title: "Fountain",
    artist: "Marcel Duchamp",
    description: "Conceptual art readymade sculpture",
    year: 1917,
    period: "Conceptual",
    level: 12
  },
  {
    id: 21,
    svgPath: hokusaiGreatWave,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    description: "Iconic Japanese ukiyo-e woodblock print",
    year: 1831,
    period: "Ukiyo-e",
    level: 12
  },
  {
    id: 22,
    svgPath: satishGujral,
    title: "Abstract Composition",
    artist: "Satish Gujral",
    description: "Indian modernist abstract painting",
    year: 1975,
    period: "Indian Modern",
    level: 12
  },
  {
    id: 23,
    svgPath: kahloThornNecklace,
    title: "Self-Portrait with Thorn Necklace",
    artist: "Frida Kahlo",
    description: "Mexican surrealist self-portrait",
    year: 1940,
    period: "Surrealism",
    level: 13
  },
  {
    id: 24,
    svgPath: basquiatSkull,
    title: "Skull",
    artist: "Jean-Michel Basquiat",
    description: "Neo-expressionist street art masterpiece",
    year: 1981,
    period: "Neo-Expressionism",
    level: 13
  },
  {
    id: 25,
    svgPath: avinashChandra,
    title: "Tantric Abstraction",
    artist: "Avinash Chandra",
    description: "Indian tantric art inspired abstract work",
    year: 1970,
    period: "Indian Abstract",
    level: 13
  },
  {
    id: 26,
    svgPath: yvesKleinBlue,
    title: "IKB 191",
    artist: "Yves Klein",
    description: "International Klein Blue monochrome",
    year: 1962,
    period: "Nouveau Réalisme",
    level: 13
  },
  {
    id: 27,
    svgPath: zahaHadid,
    title: "Architectural Vision",
    artist: "Zaha Hadid",
    description: "Deconstructivist architectural design",
    year: 2008,
    period: "Contemporary Architecture",
    level: 14
  }
];


// Get artworks for a specific level
export const getArtworksForLevel = (level) => {
  return ARTWORKS.filter(artwork => artwork.level === level);
};

/**
 * Grid configuration for pixel art revelation system
 * 25x25 grid provides optimal balance between detail and performance
 */
export const GRID_SIZE = 25;

/**
 * Total pixels in each artwork (625 pixels for 25x25 grid)
 * @type {number}
 */
export const TOTAL_PIXELS = GRID_SIZE * GRID_SIZE;
