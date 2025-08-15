import { CardItem } from '../types';
import { categoryColor, levelEmoji } from '../utils';

interface Props {
  item: CardItem;
  onEdit: (item: CardItem) => void;
  onDelete: (id: string) => void;
}

export default function Card({ item, onEdit, onDelete }: Props) {
  const tagBg = categoryColor[item.category];

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`badge border-gray-200`}>
              <span className={`badge-dot`} style={{ backgroundColor: `var(--${tagBg})` }}></span>
              <span className="text-gray-700">{item.category}</span>
            </span>
            <span className="text-xs text-gray-500">{levelEmoji[item.level]} {item.level}</span>
          </div>
          <div className="card-title">{item.title}</div>
          {item.description && (
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          )}
          {item.portfolio && (
            <p className="text-[11px] text-gray-500 mt-1"><span className="font-medium text-gray-600">Portfolio:</span> {item.portfolio}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button className="btn !px-2 !py-1" onClick={() => onEdit(item)}>Edit</button>
          <button className="btn !px-2 !py-1" onClick={() => onDelete(item.id)}>Del</button>
        </div>
      </div>
      {item.resources && item.resources.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {item.resources.map((r, idx) => (
            <a key={idx} className="text-xs text-blue-600 underline" href={r} target="_blank" rel="noreferrer">Resource {idx+1}</a>
          ))}
        </div>
      )}
    </div>
  );
}
