export type Category =
  | 'Core Web Tech'
  | 'Framework Mastery'
  | 'State & Data Management'
  | 'UI Architecture'
  | 'Performance & Security'
  | 'Tooling & CI/CD'
  | 'Leadership & Governance';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Architect';

export type ColumnId = 'backlog' | 'inProgress' | 'done';

export interface CardItem {
  id: string;
  title: string;
  category: Category;
  level: Level;
  description?: string;
  resources?: string[];
  portfolio?: string;
}

export interface BoardState {
  columns: Record<ColumnId, { id: ColumnId; title: string; itemIds: string[] }>;
  items: Record<string, CardItem>;
  columnOrder: ColumnId[];
}
