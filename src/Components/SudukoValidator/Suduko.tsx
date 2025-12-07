import { Cell } from "../SudukoValidator/Cell";
export const Suduko: React.FC = () => {

    const sudukoGrid: number[] = Array.from({ length: 81 }, () => -1);
    
    console.log(sudukoGrid)

    function getRowColumnBorders(index: number) {
        const row = Math.floor(index / 9);
        const col = (index) % 9;

        let borderClasses = '';

        if (row % 3 === 0 ) borderClasses += " border-t-3  border-t-black ";
        if (col % 3 === 0) borderClasses += " border-l-3  border-l-black ";

        if(row > 0 && row % 8 === 0) borderClasses += ' border-b-3 border-b-black '
        if(col > 0 && col % 8 === 0) borderClasses += ' border-r-3 border-r-black '

        return borderClasses;
    }

    return (
        <>
            <div className="absolute top-[18%] left-[32%] ">
                <h1 className="text-amber-700 text-center text-2xl mb-3">Suduko Board</h1>
                <div className="grid grid-cols-[repeat(9,50px)]">
                   {
                     sudukoGrid.map((item, index) => {
                        let borderclasses = getRowColumnBorders(index)
                        return (
                            <Cell className={borderclasses}/>
                        )
                     })
                   }
                </div>
            </div>
        </>
    )
}