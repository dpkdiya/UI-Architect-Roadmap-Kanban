import { useMemo, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from './components/Column';
import EditorModal from './components/EditorModal';
import { CardItem, ColumnId } from './types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateItem, deleteItem, fetchBoard, moveItem } from './api';

export default function App() {
  const qc = useQueryClient();
  const { data, isLoading, isError } = useQuery({ queryKey: ['board'], queryFn: fetchBoard });
  const [query, setQuery] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<CardItem | null>(null);

  const upsert = useMutation({
    mutationFn: createOrUpdateItem,
    onMutate: async (item) => {
      await qc.cancelQueries({ queryKey: ['board'] });
      const prev = qc.getQueryData(['board']);
      qc.setQueryData(['board'], (state: any) => {
        const exists = state?.items?.[item.id];
        const items = { ...state.items, [item.id]: item };
        const columns = exists ? state.columns : {
          ...state.columns,
          backlog: { ...state.columns.backlog, itemIds: [item.id, ...state.columns.backlog.itemIds] }
        };
        return { ...state, items, columns };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['board'], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['board'] }),
  });

  const del = useMutation({
    mutationFn: deleteItem,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ['board'] });
      const prev = qc.getQueryData(['board']);
      qc.setQueryData(['board'], (state: any) => {
        const { [id]: _, ...rest } = state.items;
        const columns = Object.fromEntries(
          Object.entries(state.columns).map(([k, col]: any) => [k, { ...col, itemIds: col.itemIds.filter((x: string) => x !== id) }])
        );
        return { ...state, items: rest, columns };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['board'], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['board'] }),
  });

  const move = useMutation({
    mutationFn: ({ sourceCol, destCol, sourceIdx, destIdx }: { sourceCol: ColumnId; destCol: ColumnId; sourceIdx: number; destIdx: number }) =>
      moveItem(sourceCol, destCol, sourceIdx, destIdx),
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: ['board'] });
      const prev: any = qc.getQueryData(['board']);
      const startIds = Array.from(prev.columns[vars.sourceCol].itemIds);
      const [removed] = startIds.splice(vars.sourceIdx, 1);
      const finishIds = Array.from(prev.columns[vars.destCol].itemIds);
      finishIds.splice(vars.destIdx, 0, removed);
      qc.setQueryData(['board'], {
        ...prev,
        columns: {
          ...prev.columns,
          [vars.sourceCol]: { ...prev.columns[vars.sourceCol], itemIds: startIds },
          [vars.destCol]: { ...prev.columns[vars.destCol], itemIds: finishIds },
        }
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => ctx?.prev && qc.setQueryData(['board'], ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: ['board'] }),
  });

  const filtered = useMemo(() => {
    if (!data) return null;
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    const items = Object.fromEntries(
      Object.entries(data.items).filter(([_, item]: any) =>
        item.title.toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.level.toLowerCase().includes(q)
      )
    );
    const columns = Object.fromEntries(
      Object.entries(data.columns).map(([k, col]: any) => [k, { ...col, itemIds: col.itemIds.filter((id: string) => items[id]) }])
    ) as any;
    return { ...data, items, columns };
  }, [data, query]);

  function onDragEnd(result: DropResult) {
    const { destination, source } = result;
    if (!destination || !data) return;
    const sourceCol = source.droppableId as ColumnId;
    const destCol = destination.droppableId as ColumnId;
    if (sourceCol === destCol && source.index === destination.index) return;
    move.mutate({ sourceCol, destCol, sourceIdx: source.index, destIdx: destination.index });
  }

  function handleNew() {
    setEditing(null);
    setEditorOpen(true);
  }

  function handleSave(item: CardItem) {
    upsert.mutate(item);
  }

  function handleEdit(item: CardItem) {
    setEditing(item);
    setEditorOpen(true);
  }

  function handleDelete(id: string) {
    del.mutate(id);
  }

  function resetBoard() {
    localStorage.removeItem('ui-architect-kanban-rq');
    qc.invalidateQueries({ queryKey: ['board'] });
    setQuery('');
  }

  if (isLoading) return <div className="p-6">Loading board…</div>;
  if (isError || !filtered) return <div className="p-6 text-red-600">Failed to load board</div>;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-white/70 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">UI Architect Roadmap — Kanban (React Query)</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              className="input sm:w-80"
              placeholder="Search title, category, level…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn" onClick={handleNew}>+ New</button>
            <button className="btn" onClick={resetBoard}>Reset</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.columnOrder.map((colId) => {
              const col = filtered.columns[colId];
              return (
                <Column
                  key={col.id}
                  id={col.id}
                  title={col.title}
                  itemIds={col.itemIds}
                  items={filtered.items}
                  onEditItem={handleEdit}
                  onDeleteItem={handleDelete}
                />
              );
            })}
          </div>
        </DragDropContext>

        <section className="mt-8 text-xs text-gray-500">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Category Legend</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <li><span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'var(--category-core)' }}></span> Core Web Tech</li>
            <li><span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'var(--category-framework)' }}></span> Framework Mastery</li>
            <li><span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'var(--category-state)' }}></span> State & Data Management</li>
            <li><span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'var(--category-architecture)' }}></span> UI Architecture</li>
            <li><span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'var(--category-perf)' }}></span> Performance & Security</li>
            <li><span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'var(--category-tooling)' }}></span> Tooling & CI/CD</li>
            <li><span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'var(--category-leadership)' }}></span> Leadership & Governance</li>
          </ul>
        </section>
      </main>

      <EditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}
