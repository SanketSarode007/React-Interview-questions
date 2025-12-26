import React from 'react';
import { useEffect, useState } from "react";
import { Tile } from "../GridLights/Tile";

export const GridLights: React.FC = () => {

    const tileArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [clickedTile, setClickedTiles] = useState<number[]>([])
    const [removeTile, setRemoveTiles] = useState(false);

    function removeItem(value: number) {
        setClickedTiles((prev) => {
            const removed = prev.filter(item => item !== value)
            return removed
        })
    }

    function handleTileClick(value: number) {
        if (value !== 5 && !clickedTile.includes(value)) {
            setClickedTiles((prev) => {
                if (prev.length === 7) {
                    setRemoveTiles(true)
                }
                return [...prev, value]
            })
        }
    }

    useEffect(() => {
        let interval: number;
        if (removeTile) {
            interval = setInterval(() => {
                setClickedTiles((prev) => {
                    if (prev.length === 0) {
                        clearInterval(interval)
                        setRemoveTiles(false)
                        return prev
                    }
                    removeItem(prev[prev.length - 1])
                    return prev
                })
            }, 100)
        }

        return () => clearInterval(interval)
    }, [removeTile])

    return (
        <>
            <div className="absolute top-[30%] left-[37%] ">
                <div className="grid grid-cols-[repeat(3,100px)] gap-x-2 gap-y-2">
                    {
                        tileArray.map((item) => (
                            <Tile key={item} no={item} clickedTile={clickedTile} handleTileClick={(item) => handleTileClick(item)} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}