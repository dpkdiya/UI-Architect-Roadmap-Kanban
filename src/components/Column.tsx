import { Droppable, Draggable } from '@hello-pangea/dnd';
import { CardItem } from '../types';
import Card from './Card';

interface Props {
  id: string;
  title: string;
  itemIds: string[];
  items: Record<string, CardItem>;
  onEditItem: (item: CardItem) => void;
  onDeleteItem: (id: string) => void;
}

export default function Column({ id, title, itemIds, items, onEditItem, onDeleteItem }: Props) {
  return (
    <div className="column">
      <div className="column-title">{title}</div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-3 min-h-[200px] ${snapshot.isDraggingOver ? 'bg-blue-50/60 rounded-lg p-2' : ''}`}
          >
            {itemIds.map((itemId, index) => {
              const item = items[itemId];
              return (
                <Draggable draggableId={itemId} index={index} key={itemId}>
                  {(prov) => (
                    <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                      <Card item={item} onEdit={onEditItem} onDelete={onDeleteItem} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
