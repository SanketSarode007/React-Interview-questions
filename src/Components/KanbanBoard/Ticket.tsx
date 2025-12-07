import {type ColumnType } from "./Board";

interface TicketProps {
  title?: string;
  content?: string;
  cardIndex: number;
  column: ColumnType;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, cardIndex: number, column: ColumnType) => void;
}

export const Ticket: React.FC<TicketProps> = ({ title, content, cardIndex, column, onDragStart }) => {
  return (
    <div
      className="border-blue-500 border-2 bg-blue-200 min-h-25 w-full rounded-2xl shadow-xl cursor-grab"
      draggable
      onDragStart={(e) => onDragStart(e, cardIndex, column)}
    >
      <div className="py-2 border-b-blue-500 border-b-2">
        <h3 className="px-2 text-lg">{title}</h3>
      </div>
      <div className="min-h-20 px-2 py-1">{content}</div>
    </div>
  );
};