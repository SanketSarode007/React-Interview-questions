import React from "react";

export interface LayoutProps{
    children: React.ReactNode
}

export const MainLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col bg-white  h-screen overflow-hidden gap-2">
            {children}
        </div>
    )
}