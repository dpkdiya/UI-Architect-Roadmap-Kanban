import { useEffect, useState } from 'react';
import { CardItem, Category, Level } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (item: CardItem) => void;
  initial?: CardItem | null;
}

const categories: Category[] = [
  'Core Web Tech',
  'Framework Mastery',
  'State & Data Management',
  'UI Architecture',
  'Performance & Security',
  'Tooling & CI/CD',
  'Leadership & Governance',
];

const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced', 'Architect'];

export default function EditorModal({ open, onClose, onSave, initial }: Props) {
  const [item, setItem] = useState<CardItem>(initial || {
    id: crypto.randomUUID(),
    title: '',
    category: 'UI Architecture',
    level: 'Intermediate',
    description: '',
    resources: [],
    portfolio: ''
  });

  useEffect(() => {
    if (initial) setItem(initial);
    else setItem({
      id: crypto.randomUUID(),
      title: '',
      category: 'UI Architecture',
      level: 'Intermediate',
      description: '',
      resources: [],
      portfolio: ''
    })
  }, [initial]);

  if (!open) return null;

  function save() {
    if (!item.title.trim()) return;
    onSave(item);
    onClose();
  }

  function handleResourceChange(text: string) {
    const list = text.split('\n').map(s => s.trim()).filter(Boolean);
    setItem(prev => ({ ...prev, resources: list }));
  }

  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-soft border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{initial ? 'Edit Milestone' : 'New Milestone'}</h2>
          <button className="btn" onClick={onClose}>Close</button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input className="input mt-1" value={item.title} onChange={e => setItem(prev => ({ ...prev, title: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <select className="select mt-1" value={item.category} onChange={e => setItem(prev => ({ ...prev, category: e.target.value as any }))}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Level</label>
              <select className="select mt-1" value={item.level} onChange={e => setItem(prev => ({ ...prev, level: e.target.value as any }))}>
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea rows={3} className="textarea mt-1" value={item.description} onChange={e => setItem(prev => ({ ...prev, description: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Portfolio (Deliverable)</label>
            <input className="input mt-1" value={item.portfolio} onChange={e => setItem(prev => ({ ...prev, portfolio: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Resources (one per line)</label>
            <textarea rows={3} className="textarea mt-1" value={(item.resources || []).join('\n')} onChange={e => handleResourceChange(e.target.value)} />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn border-blue-600 text-blue-700" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
