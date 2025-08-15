# UI Architect Roadmap — Kanban (React Query Edition)

## What’s inside:

- React + Vite + TypeScript + Tailwind
- @tanstack/react-query + Devtools
- Mock API in src/api.ts with:
- fetchBoard() – loads (seed or localStorage)
- createOrUpdateItem() – add/edit with optimistic updates
- deleteItem() – delete with optimistic updates
- moveItem() – drag/drop persist with optimistic updates
- Pre-filled 9-month roadmap cards
- Add/Edit/Delete cards, search, drag & drop
- Clean, responsive UI

A Kanban board for your 9‑month UI Architect roadmap, powered by **React Query** with optimistic updates and a mock API (localStorage + artificial latency).

## ✨ Features

- Three columns: **Backlog**, **In Progress**, **Done**
- Pre‑filled roadmap cards
- Drag & drop via `@hello-pangea/dnd`
- Add/Edit/Delete milestones
- Search by title/description/category/level
- **React Query** data layer + Devtools
- Local persistence using `localStorage`

## 🚀 Quick Start

```bash
npm install
npm run dev
```

> Requires Node 18+

## 🧩 Key Files

- `src/api.ts` – mock API (fetch/save/create/delete/move)
- `src/App.tsx` – React Query hooks & optimistic updates
- `src/components/*` – UI components
- `src/data.ts` – seed roadmap items
- `src/types.ts` – types
- `src/index.css` – Tailwind styles

Replace `src/api.ts` later with your real backend — the UI logic stays the same.

Alright — here’s a full breakdown of the **UI Architect Roadmap Kanban (React Query)** project I generated for you.

---

## **1. Purpose**

This is a **React + Vite + TypeScript + Tailwind CSS** Kanban board that visually organizes your **9-month UI Architect learning roadmap** into columns:

- **Backlog** – things you plan to learn/do later
- **In Progress** – things you’re actively working on
- **Done** – completed skills/projects

The app is **data-driven** and powered by:

- **React Query (@tanstack/react-query)** → handles fetching, caching, and mutations (optimistic updates)
- **@hello-pangea/dnd** → drag & drop between columns
- **LocalStorage + Mock API** → persistent data without needing a real backend (but swappable with API calls)

---

## **2. Features**

✅ **Pre-loaded roadmap** — Based on your 9-month UI Architect plan
✅ **Drag & drop** — Move tasks between columns with smooth animations
✅ **Add/Edit/Delete tasks** — Manage skills dynamically
✅ **Color-coded categories** — e.g., Core Web Tech (Blue), Framework (Green), State (Purple)
✅ **Persistent data** — LocalStorage keeps state across refreshes
✅ **Optimistic UI** — Instant visual updates while saving in background
✅ **React Query Devtools** — Inspect query/mutation state during development
✅ **Responsive design** — Works on desktop and mobile

---

## **3. Tech Stack**

| Area             | Library / Tool                                       |
| ---------------- | ---------------------------------------------------- |
| Frontend         | React 18, TypeScript                                 |
| Build Tool       | Vite                                                 |
| Styling          | Tailwind CSS                                         |
| State/Data Fetch | @tanstack/react-query                                |
| Drag & Drop      | @hello-pangea/dnd                                    |
| Dev Tooling      | React Query Devtools, ESLint, TypeScript strict mode |
| Storage          | LocalStorage (mock API)                              |

---

## **4. Project Structure**

```
📂 ui-architect-kanban
 ┣ 📂 src
 ┃ ┣ 📜 api.ts           # Mock API for CRUD ops (LocalStorage persistence)
 ┃ ┣ 📜 types.ts         # Type definitions for Board, Task, Category
 ┃ ┣ 📜 data.ts          # Preloaded roadmap data
 ┃ ┣ 📜 Board.tsx        # Kanban board component
 ┃ ┣ 📜 Column.tsx       # Column component
 ┃ ┣ 📜 Card.tsx         # Task card component
 ┃ ┣ 📜 App.tsx          # Main app component
 ┃ ┣ 📜 main.tsx         # React entry point
 ┃ ┗ 📜 index.css        # Tailwind styles + custom utility classes
 ┣ 📜 package.json
 ┣ 📜 vite.config.ts
 ┣ 📜 tailwind.config.ts
 ┗ 📜 tsconfig.json
```

---

## **5. How It Works**

### a) **Data Flow**

1. On app load, `useQuery(['board'], fetchBoard)` loads board data from LocalStorage or seeds it with your roadmap.
2. Each column (`Backlog`, `In Progress`, `Done`) is rendered via the `Column` component.
3. Cards are draggable via `<DragDropContext>` from `@hello-pangea/dnd`.
4. When you drop a card, `moveItemMutation.mutate()` runs → updates local state instantly (optimistic update) → saves to LocalStorage.
5. Add/Edit/Delete actions also use **React Query mutations** with optimistic updates.

### b) **Optimistic Updates**

- When moving a card, the UI updates immediately (no waiting for persistence).
- If saving fails (mock API can simulate latency/errors), it rolls back to the previous state.

---

## **6. Styling**

- **Tailwind CSS** handles responsive layout, spacing, typography.
- Custom category colors are defined in `tailwind.config.ts`.
- `.card`, `.badge`, `.column` utility classes simplify repetitive styles.
- Rounded corners, subtle shadows, and clean typography for a **Figma-like** feel.

---

## **7. How to Replace with Real Backend**

Currently, `api.ts` uses LocalStorage.
To connect to a real backend (e.g., Spring Boot, Express, Firebase), you:

- Replace `fetchBoard`, `createOrUpdateItem`, `deleteItem`, and `moveItem` with `fetch` or `axios` API calls.
- Keep the same function signatures so React Query hooks work unchanged.

---

## **8. Why This Architecture?**

- **React Query** abstracts async state and caching — no manual loading/error states.
- **Drag-and-drop** handled declaratively by `@hello-pangea/dnd`.
- **Local-first** persistence makes it fast and offline-friendly.
- Code is **split into small, reusable components** — easy to maintain and extend.

---

If you want, I can now draw you a **full architecture diagram** showing:

- Component hierarchy
- Data flow
- How React Query interacts with storage and UI

Do you want me to prepare that diagram next?
"# UI-Architect-Roadmap-Kanban" 
