import { BoardState, CardItem } from './types';

const items: CardItem[] = [
  { id: 'm1-acc', title: 'Learn WCAG 2.1 & ARIA Roles', category: 'Core Web Tech', level: 'Advanced', description: 'Semantic HTML, keyboard navigation, live regions.', resources: ['https://www.w3.org/WAI/standards-guidelines/wcag/'], portfolio: 'Accessible components with Storybook docs' },
  { id: 'm1-css-arch', title: 'Master CSS Architecture', category: 'Core Web Tech', level: 'Advanced', description: 'BEM, SMACSS, utility-first, Grid/Flexbox.', resources: ['https://getbem.com/', 'https://smacss.com/'], portfolio: 'Design tokens + theming' },
  { id: 'm3-react', title: 'React 18 Concurrency Deep Dive', category: 'Framework Mastery', level: 'Advanced', description: 'useTransition, Suspense, useDeferredValue.', resources: ['https://react.dev/learn'], portfolio: 'Next.js dashboard with lazy-loaded charts' },
  { id: 'm4-state', title: 'State Management at Scale', category: 'State & Data Management', level: 'Advanced', description: 'Redux Toolkit, TanStack Query, Zustand.', resources: ['https://redux-toolkit.js.org/', 'https://tanstack.com/query/latest'], portfolio: 'Offline mode + optimistic updates' },
  { id: 'm5-mfe', title: 'Microfrontends & Shared Libraries', category: 'UI Architecture', level: 'Advanced', description: 'Module Federation, Single-SPA, versioned UI kits.', resources: ['https://module-federation.github.io/'], portfolio: 'E-commerce MFE with Product/Cart/Checkout' },
  { id: 'm6-perf', title: 'Core Web Vitals & Security', category: 'Performance & Security', level: 'Architect', description: 'LCP/INP/CLS, Lighthouse, CSP, XSS prevention.', resources: ['https://web.dev/vitals/'], portfolio: 'Bundle splitting + secure auth' },
  { id: 'm7-lead', title: 'Leadership & Governance', category: 'Leadership & Governance', level: 'Advanced', description: 'PR review strategy, UI guidelines, mentoring.', resources: [], portfolio: 'UI Architecture Playbook' },
  { id: 'm8-ci', title: 'Monorepo Tooling & CI/CD', category: 'Tooling & CI/CD', level: 'Architect', description: 'Nx/Turborepo, pnpm, multi-app pipelines.', resources: ['https://nx.dev/'], portfolio: 'Monorepo CI/CD pipeline' },
  { id: 'm9-portfolio', title: 'Strategic Portfolio & Presentation', category: 'Leadership & Governance', level: 'Architect', description: 'Case studies, recorded architecture talk.', resources: [], portfolio: 'Portfolio site with projects & blog' },
];

export const seedState: BoardState = {
  columns: {
    backlog: { id: 'backlog', title: 'Backlog', itemIds: items.map(i => i.id) },
    inProgress: { id: 'inProgress', title: 'In Progress', itemIds: [] },
    done: { id: 'done', title: 'Done', itemIds: [] },
  },
  items: Object.fromEntries(items.map(i => [i.id, i])),
  columnOrder: ['backlog', 'inProgress', 'done'],
};
