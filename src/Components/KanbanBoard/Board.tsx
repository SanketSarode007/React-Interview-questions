import { BoardSideBar } from "./BoardSideBar";
import { MainLayout } from "./MainLayout";
import { KanbanHeader } from "./KanbanHeader";
import { BoardLayout } from "./BoardLayout";
import { ColumnsLayout } from "./ColumnsLayout";
import React from "react";

export type ColumnType = "new" | "doing" | "done";

export const Board: React.FC = () => {

    return (
        <MainLayout>
            <KanbanHeader />
            <div className="flex gap-2 overflow-hidden mx-2 flex-1">
                <BoardSideBar />
                <BoardLayout>
                    <div className="bg-[#dcdccc] p-4 flex-1 flex rounded-md">
                        <div className="overflow-y-auto  flex-1 h-full rounded-md">
                            <div className="flex w-full h-full gap-4 items-start">
                                <ColumnsLayout />
                            </div>
                        </div>
                    </div>
                </BoardLayout>
            </div>
        </MainLayout>
    );
};