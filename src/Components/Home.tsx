import React from 'react';

export const Home: React.FC = () => {
    return (
        <div>
            <div>
                <h1 className="text-xl">React Components</h1>
            </div>
            <div className="flex justify-start items-center p-4">
                <div className="flex justify-start rounded-md flex-wrap items-center bg-purple-200 border border-purple-600 gap-2 px-2 py-4">
                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/gridlights">GridLights</a>
                    </div>
                    
                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/lights-out">LightsOut</a>
                    </div>
                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/memory-game">Memory Game</a>
                    </div>

                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/otp-validator">OTP Validator</a>
                    </div>

                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/paginated-table">Table with Pagination</a>
                    </div>

                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/react-hook-form">React Hook Form</a>
                    </div>

                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/react-suspense-demo">React Suspense Demo</a>
                    </div>

                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/suduko">Suduko</a>
                    </div>

                    <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                        <a href="/kanbanboard">Kanban Board</a>
                    </div>
                </div>
            </div>
        </div>
    )
}