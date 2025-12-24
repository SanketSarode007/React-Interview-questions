import { useState } from "react";
import type { ColumnType } from "./Board";
import { Ticket } from "./Ticket";
import React from "react";

type CardType = {
    id: string;
    title: string;
    content: string;
};

export const ColumnsLayout: React.FC = () => {

    const [columns, setColumns] = useState<Record<ColumnType, CardType[]>>({
        new: [],
        doing: [],
        done: [],
    });

    const [isRemoving, setIsRemoving] = useState(false)

    const handleAddTicket = (column: ColumnType) => {
        const id = crypto.randomUUID();
        const newCard = { id: id, title: "New Task", content: "Task description" };
        setColumns((prev) => ({
            ...prev,
            [column]: [newCard, ...prev[column]],
        }));
    };

    const handleDeleteTicket = (column: ColumnType, cardId: string) => {

        setIsRemoving(true)

        setColumns((prev) => ({
            ...prev,
            [column]: [...prev[column]].filter((card) => card.id !== cardId)
        }))
    }

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        cardIndex: string,
        sourceColumn: ColumnType
    ) => {
        e.dataTransfer.setData("cardIndex", cardIndex);
        e.dataTransfer.setData("sourceColumn", sourceColumn);
    };

    const handleDrop = (
        e: React.DragEvent,
        targetColumn: ColumnType
    ) => {
        e.preventDefault();
        const cardIndex = e.dataTransfer.getData("cardIndex");
        const sourceColumn = e.dataTransfer.getData("sourceColumn") as ColumnType;

        if (!sourceColumn) return;

        if (sourceColumn == targetColumn) return;

        const cardToMove = columns[sourceColumn].find((card) => card.id === cardIndex);

        setColumns((prev) => {
            return {
                ...prev,
                [sourceColumn]: prev[sourceColumn].filter((card) => card.id !== cardIndex),
                [targetColumn]: [...prev[targetColumn], cardToMove],
            };
        });
    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className="flex w-full  gap-4 h-full items-start rounded-md">
            {(["new", "doing", "done"] as ColumnType[]).map((columnKey) => (
                <div
                    key={columnKey}
                    className={`w-full min-h-full rounded-lg shadow-md flex flex-col bg-[#edeee6]`}
                    onDrop={(e) => handleDrop(e, columnKey)}
                    onDragOver={allowDrop}>
                    <div className={`py-2 px-4 flex justify-between`}>
                        <h2 className=" text-lg capitalize">{columnKey}</h2>
                        {
                            columnKey == "new" && (
                                <div className="text-2xl text-center ">
                                    <button
                                        className=" bg-[#093FB4] text-white shadow-md cursor-pointer rounded-lg px-3 py-1 hover:bg-[#1B56FD] active:scale-90 active:transition-transform"
                                        onClick={() => handleAddTicket(columnKey)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                                    </button>
                                </div>
                            )
                        }
                    </div>

                    <div className="flex flex-col py-3 px-3 gap-4 mt-2">
                        {columns[columnKey].map((card) => (
                            <Ticket
                                key={card.id}
                                cardIndex={card.id}
                                title={card.title}
                                content={card.content}
                                column={columnKey}
                                isRemoving={isRemoving}
                                onDragStart={handleDragStart}
                                onDelete={handleDeleteTicket}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}