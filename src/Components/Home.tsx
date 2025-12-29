import React from "react"
export const Home: React.FC = () => {

    const list = [
        { path: '/gridlights', label: 'GridLights' },
        { path: '/image-gallery', label: 'Image Gallery' },
        { path: '/lights-out', label: 'LightsOut' },
        { path: '/Memory Game', label: 'Memory Game' },
        { path: '/otp-validator', label: 'OTP Validator' },
        { path: '/paginated-table', label: 'Paginated Table' },
        { path: '/react-hook-form', label: 'React Hook Form' },
        { path: '/react-suspense-demo', label: 'React Suspense Demo' },
        { path: '/suduko', label: 'Suduko' },
        { path: '/kanbanboard', label: 'Kanban Board' },
        { path: '/debounce', label: 'Debounce Search' },
    ]

    return (
        <div>
            <div>
                <h1 className="text-xl">React Components</h1>
            </div>
            <div className="flex justify-start items-center p-4">
                <div className="flex justify-start rounded-md flex-wrap items-center bg-purple-200 border border-purple-600 gap-2 px-2 py-4">
                    {
                        list.map((item) => {
                            return <div className="bg-purple-500 px-2 rounded-sm py-2 text-white">
                                <a href={item.path}>{item.label}</a>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
