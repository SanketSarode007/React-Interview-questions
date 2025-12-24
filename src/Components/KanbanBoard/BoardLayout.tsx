import type { LayoutProps } from "./MainLayout"
import React from "react";

export const BoardLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="flex-1 overflow-hidden flex">
            {children}
        </div>
    )
}