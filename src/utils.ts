import { Category, Level } from './types';

export const categoryColor: Record<Category, string> = {
  'Core Web Tech': 'category-core',
  'Framework Mastery': 'category-framework',
  'State & Data Management': 'category-state',
  'UI Architecture': 'category-architecture',
  'Performance & Security': 'category-perf',
  'Tooling & CI/CD': 'category-tooling',
  'Leadership & Governance': 'category-leadership',
};

export const levelEmoji: Record<Level, string> = {
  'Beginner': '🌱',
  'Intermediate': '🛠️',
  'Advanced': '🚀',
  'Architect': '🏛️'
};
