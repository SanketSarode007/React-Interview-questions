import { useState } from "react";
import { Ticket } from "../KanbanBoard/Ticket";

type CardType = {
    title: string;
    content: string;
};

export type ColumnType = "new" | "doing" | "done";

export const Board: React.FC = () => {
    const [columns, setColumns] = useState<Record<ColumnType, CardType[]>>({
        new: [],
        doing: [],
        done: [],
    });

    const handleAdd = (column: ColumnType) => {
        const newCard = { title: "New Task", content: "Task description" };
        setColumns((prev) => ({
            ...prev,
            [column]: [newCard, ...prev[column]],
        }));
    };

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        cardIndex: number,
        sourceColumn: ColumnType
    ) => {
        e.dataTransfer.setData("cardIndex", cardIndex.toString());
        e.dataTransfer.setData("sourceColumn", sourceColumn);
    };

    const handleDrop = (
        e: React.DragEvent,
        targetColumn: ColumnType
    ) => {
        e.preventDefault();
        const cardIndex = parseInt(e.dataTransfer.getData("cardIndex"));
        const sourceColumn = e.dataTransfer.getData("sourceColumn") as ColumnType;

        if (!sourceColumn || isNaN(cardIndex)) return;

        const cardToMove = columns[sourceColumn][cardIndex];

        setColumns((prev) => {
            const sourceCards = [...prev[sourceColumn]];
            sourceCards.splice(cardIndex, 1);

            const targetCards = [...prev[targetColumn], cardToMove];

            return {
                ...prev,
                [sourceColumn]: sourceCards,
                [targetColumn]: targetCards,
            };
        });
    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault(); 
    };

    function columnStyle(columnKey: ColumnType){
        switch(columnKey){
            case "new":
                return 'border-amber-500 border-2 bg-amber-200'
            case "doing":
                return 'border-purple-500 border-2 bg-purple-200'
            case "done":
                return 'border-green-500 border-2 bg-green-200'
            default: 
                return '';
        }
    }

    function bottomBorder(columnKey: ColumnType){
        switch(columnKey){
            case "new":
                return 'border-b-amber-500 '
            case "doing":
                return 'border-b-purple-500'
            case "done":
                return 'border-b-green-500'
            default: 
                return '';
        }
    }

    return (
        <div className="flex flex-col mx-2 bg-gray-100 rounded-lg min-h-screen">
            <h1 className="text-amber-600 text-center text-2xl mb-3 py-3">Kanban Board</h1>
            <div className="flex justify-around gap-4 px-4 pb-8">

                {(["new", "doing", "done"] as ColumnType[]).map((columnKey) => (
                    <div
                        key={columnKey}
                        className={`${columnStyle(columnKey)}  min-h-100 w-100 rounded-2xl shadow-xl flex flex-col`}
                        onDrop={(e) => handleDrop(e, columnKey)}
                        onDragOver={allowDrop}>
                        <div className={`py-2 ${bottomBorder(columnKey)} border-b-2`}>
                            <h2 className="text-center text-lg capitalize">{columnKey}</h2>
                        </div>

                        {
                            columnKey == "new" && (
                                <div className="text-2xl text-center mx-2">
                                    <button
                                        className="border-2 border-amber-500 shadow-md cursor-pointer rounded-lg px-4 py-2 mt-1 hover:bg-amber-500 hover:text-white active:scale-90 active:transition-transform"
                                        onClick={() => handleAdd(columnKey)}
                                    >
                                        +
                                    </button>
                                </div>
                            )
                        }

                        <div className="flex flex-col py-3 px-3 gap-2 mt-2 ">
                            {columns[columnKey].map((card, index) => (
                                <Ticket
                                    key={index}
                                    cardIndex={index}
                                    title={card.title}
                                    content={card.content}
                                    column={columnKey}
                                    onDragStart={handleDragStart}
                                />
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};