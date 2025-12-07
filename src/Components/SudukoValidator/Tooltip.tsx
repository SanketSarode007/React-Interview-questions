interface TooltipProps {
    message: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ message }) => {
    return (
        <span className="absolute text-red-500  rounded-md block text-xs shadow-lg z-10 bg-red-100 p-1  top-full">
            {message}
        </span>
    )
}