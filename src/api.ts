import { BoardState, CardItem, ColumnId } from './types';
import { seedState } from './data';

const KEY = 'ui-architect-kanban-rq';

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

export async function fetchBoard(): Promise<BoardState> {
  await sleep(300); // simulate network
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) as BoardState : seedState;
}

export async function saveBoard(state: BoardState): Promise<void> {
  await sleep(200);
  localStorage.setItem(KEY, JSON.stringify(state));
}

export async function createOrUpdateItem(item: CardItem): Promise<BoardState> {
  const state = await fetchBoard();
  const exists = !!state.items[item.id];
  const items = { ...state.items, [item.id]: item };
  const columns = exists ? state.columns : {
    ...state.columns,
    backlog: { ...state.columns.backlog, itemIds: [item.id, ...state.columns.backlog.itemIds] }
  };
  const next = { ...state, items, columns };
  await saveBoard(next);
  return next;
}

export async function deleteItem(id: string): Promise<BoardState> {
  const state = await fetchBoard();
  const { [id]: _, ...rest } = state.items;
  const columns = Object.fromEntries(
    Object.entries(state.columns).map(([k, col]) => [k, { ...col, itemIds: col.itemIds.filter(x => x !== id) }])
  ) as BoardState['columns'];
  const next = { ...state, items: rest, columns };
  await saveBoard(next);
  return next;
}

export async function moveItem(sourceCol: ColumnId, destCol: ColumnId, sourceIdx: number, destIdx: number): Promise<BoardState> {
  const state = await fetchBoard();
  const startIds = Array.from(state.columns[sourceCol].itemIds);
  const [removed] = startIds.splice(sourceIdx, 1);
  const finishIds = Array.from(state.columns[destCol].itemIds);
  finishIds.splice(destIdx, 0, removed);
  const next = {
    ...state,
    columns: {
      ...state.columns,
      [sourceCol]: { ...state.columns[sourceCol], itemIds: startIds },
      [destCol]: { ...state.columns[destCol], itemIds: finishIds },
    }
  };
  await saveBoard(next);
  return next;
}
