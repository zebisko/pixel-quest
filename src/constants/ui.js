// UI Constants following Clean Code principles
// Extracting magic numbers and hardcoded values for better maintainability

export const LAYOUT = {
  SIDEBAR_WIDTH_EXPANDED: 'w-80', // 320px
  SIDEBAR_WIDTH_COLLAPSED: 'w-16', // 64px
  SIDEBAR_MARGIN_EXPANDED: 'ml-80', // 320px margin for main content
  SIDEBAR_MARGIN_COLLAPSED: 'ml-16', // 64px margin for main content
  MOBILE_HEADER_HEIGHT: 'h-8',
  BUTTON_HEIGHT: 'h-8',
  PROGRESS_BAR_HEIGHT: 'h-2',
  QUEST_CARD_HEIGHT: 'h-9',
  QUEST_LIST_MAX_HEIGHT: 'max-h-96',
};

export const SPACING = {
  HEADER_PADDING: 'p-4',
  CONTENT_PADDING: 'p-3',
  CARD_PADDING: 'p-4',
  SMALL_GAP: 'gap-1',
  MEDIUM_GAP: 'gap-2',
  LARGE_GAP: 'gap-3',
};

export const BORDER_RADIUS = {
  SMALL: 'rounded-md',
  MEDIUM: 'rounded-xl',
  LARGE: 'rounded-2xl',
  FULL: 'rounded-full',
  // Specific border radius utilities for Clean Code
  BOTTOM_ONLY_LARGE: 'rounded-b-2xl', // Only bottom corners rounded
  TOP_ONLY_LARGE: 'rounded-t-2xl', // Only top corners rounded
};

export const TYPOGRAPHY = {
  TITLE_FONT_SIZE: '2.5em',
  TITLE_LINE_HEIGHT: '2.5rem',
  SMALL_TEXT: 'text-xs',
  MEDIUM_TEXT: 'text-sm',
  LARGE_TEXT: 'text-lg',
};

export const ANIMATIONS = {
  TRANSITION_DURATION: 'duration-300',
  TRANSITION_EASE: 'ease-in-out',
  FADE_IN: 'animate-fade-in',
  SCALE_IN: 'animate-scale-in',
  BOUNCE: 'animate-bounce',
};

export const Z_INDEX = {
  // Base layer (lowest)
  BASE: 'z-0',
  SIDEBAR_DESKTOP: 'z-10',
  MOBILE_HEADER: 'z-30',
  MOBILE_OVERLAY: 'z-40',
  SIDEBAR_MOBILE: 'z-50',
  
  // Modal layers (highest)
  MODAL_OVERLAY: 'z-[100]',
  MODAL_CONTENT: 'z-[101]',
};

export const POSITIONING = {
  // Fixed positioning utilities
  FIXED_FULL_SCREEN: 'fixed inset-0',
  FIXED_VIEWPORT: 'fixed top-0 left-0 w-screen h-screen',
  FIXED_SIDEBAR: 'fixed inset-y-0 left-0',
  
  // Layout positioning
  SIDEBAR_FIXED: 'fixed inset-y-0 left-0 h-screen',
  SIDEBAR_MOBILE: 'fixed inset-y-0 left-0 h-screen',
  
  // Center positioning
  CENTER_MODAL: 'flex items-center justify-center min-h-screen',
};

export const DIFFICULTY_LEVELS = [
  { value: 'easy', stars: 1, xp: 25 },
  { value: 'medium', stars: 2, xp: 50 },
  { value: 'hard', stars: 3, xp: 100 },
];

export const INPUT_STYLES = {
  BORDER_RADIUS: '6px',
  FONT_SIZE: '20px',
  HEIGHT: 'auto',
  PADDING: '12px 16px',
};

export const QUEST_FORM_MESSAGES = {
  TITLE: 'add new quest',
  DESCRIPTION: 'create a task to complete and earn xp',
  PLACEHOLDER: 'what quest shall you embark on?',
  EMPTY_STATE: 'no active quests. add one to start your adventure!',
  CLICK_TO_ADD: 'click to add quest',
  COLLAPSE: 'collapse',
};

export const SIDEBAR_LABELS = {
  DASHBOARD: 'dashboard',
  GALLERY: 'gallery',
  LEVEL_PREFIX: 'level ',
  XP_SUFFIX: ' xp',
  ARTWORKS_COLLECTED: 'artworks collected',
  XP_TO_NEXT_LEVEL: ' xp to next level',
  PIXELS_REVEALED: ' pixels revealed',
};

export const ARIA_LABELS = {
  OPEN_SIDEBAR: 'Open sidebar',
  CLOSE_SIDEBAR: 'Close sidebar',
  EXPAND_SIDEBAR: 'Expand sidebar',
  COLLAPSE_SIDEBAR: 'Collapse sidebar',
  DISMISS_HELP: 'Dismiss help',
  COMPLETE_QUEST: 'Complete quest',
  DELETE_QUEST: 'Delete quest',
  CLOSE_MODAL: 'Close modal',
};

export const APP_CONSTANTS = {
  DEFAULT_DIFFICULTY: 'medium',
  DEFAULT_VIEW: 'dashboard',
  INPUT_FOCUS_DELAY: 0,
  VIEWS: {
    DASHBOARD: 'dashboard',
    GALLERY: 'gallery',
  },
  MAIN_TITLE: 'pixel quest',
  LEVEL_UP_MESSAGES: {
    TITLE_SUFFIX: ' complete!',
    SUBTITLE: "you've unlocked new artworks!",
    CONGRATULATIONS: '🎉 congratulations on your progress!',
    KEEP_GOING: 'keep completing quests to discover more masterpieces.',
    NEXT_GOAL_PREFIX: '🎯 next goal: reach level ',
    NEXT_GOAL_SUFFIX: ' to unlock new artworks!',
    COLLECTED_FROM_LEVEL: 'artworks collected from level ',
    VIEW_GALLERY: 'view gallery',
    CONTINUE_QUESTING: 'continue questing',
  },
};

export const CONSOLE_MESSAGES = {
  ADDING_QUEST: '➕ Adding new quest:',
  COMPLETING_QUEST: '🎯 Completing quest:',
};