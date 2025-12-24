import { useEffect, useState } from "react";
import { type ColumnType } from "./Board";
import React from "react";

interface TicketProps {
  title?: string;
  content?: string;
  cardIndex: string;
  column: ColumnType;
  isRemoving: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, cardIndex: string, column: ColumnType) => void;
  onDelete: (column: ColumnType, cardId: string) => void
}

export const Ticket: React.FC<TicketProps> = ({ title, content, cardIndex, column, onDragStart, onDelete, isRemoving }) => {

  const [isTitleEditAble, setIsTitleEditable] = useState(false)
  const [isContentEditAble, setIsContentEditAble] = useState(false)
  const [mount, setMount] = useState(false);

  function handleTitleDoubleClick() {
    setIsTitleEditable(!isTitleEditAble)
  }

  function handleContentDoubleClick() {
    setIsContentEditAble(!isContentEditAble)
  }

  useEffect(() => {
    requestAnimationFrame(() => setMount(true))
  }, [mount])

  return (
     <div
      className={`relative bg-[#f5f5f0] min-h-25 w-full px-2 py-2 
        rounded-lg shadow-md transition-all duration-500 ease-in-out ${isRemoving ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}
        ${mount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      draggable
      onDragStart={(e) => onDragStart(e, cardIndex, column)}>
      <div className=" border-0 py-2 flex gap-1" onDoubleClick={handleTitleDoubleClick}>
        <div className="cursor-grab">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" /></svg>
        </div>
        <h3 className="text-md outline-none flex-1" contentEditable={isTitleEditAble} onBlur={() => setIsTitleEditable(false)} >{title}</h3>
      </div>
      <div className="min-h-20 px-2 py-2 outline-none shadow-md text-sm border-0 bg-[#FFFFF0] rounded-lg" onBlur={() => setIsContentEditAble(false)} contentEditable={isContentEditAble} onDoubleClick={handleContentDoubleClick}>{content}</div>
      <div>
        <button className="border border-red-400 rounded-full cursor-pointer shadow-md z-50 p-1 bg-black absolute -top-1 -right-1"
          onClick={() => onDelete(column, cardIndex)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FF0000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
        </button>
      </div>
      <div className="absolute -top-2 -right-2 z-0 bg-[#edeee6] p-5 rounded-full"></div>
    </div>
  );
};