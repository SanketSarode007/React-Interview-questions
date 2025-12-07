
interface TileProps {
    no: number;
    clickedTile: number[];
    handleTileClick: (item: number) => void;
}

export const Tile: React.FC<TileProps> = ({ no, clickedTile, handleTileClick }) => {

    return (
        <>
            <div className={`${clickedTile.includes(no) ? 'bg-green-500' : ''} 
            h-25 border-2 flex justify-center items-center cursor-pointer`} onClick={() => handleTileClick(no)}>
                {no}
            </div>
        </>
    )
}