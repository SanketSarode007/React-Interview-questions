import React from 'react';
import { useState } from "react";
import { Light } from "../LightsOut/Light"

export const LightsOut: React.FC = () => {

    const lightsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

    const [Lights, setLights] = useState<number[]>(lightsArray)

    function toggleLight(value: number) {
        setLights((prev) => handleLightChange(prev, value))

        if(Lights.length === 0){
            handleGameOver();
        }
    }

    function handleGameOver(){
        alert("You have Won the Game 🎉")
    }

    //get the row col of the clicked light
    const getRowCol = (num: number, gridSize: number) => {
        return {
            row: Math.floor((num - 1) / gridSize),
            col: (num - 1) % gridSize
        }
    }

    const getAdjacentLights = (num: number, gridSize: number) => {
        const { row, col } = getRowCol(num, gridSize);
        const adjacentLights: number[] = [];

        // Check left (num-1), but avoid out-of-bound for the same row
        if (col > 0) adjacentLights.push(num - 1);

        // Check right (num+1), but avoid out-of-bound for the same row
        if (col < gridSize - 1) adjacentLights.push(num + 1);

        // Check top (num-5), but avoid out-of-bound for the first row
        if (row > 0) adjacentLights.push(num - gridSize);

        // Check bottom (num+5), but avoid out-of-bound for the last row
        if (row < gridSize - 1) adjacentLights.push(num + gridSize);

        return adjacentLights;
    };

    const toggleLightState = (lights: number[], num: number) => {
        if (lights.includes(num)) {
            return lights.filter(item => item !== num);
        } else {
            return [...lights, num];
        }
    };

    function handleLightChange(lights: number[], value: number) {
        const gridSize = 5;

        let updatedLights = toggleLightState(lights, value);

        const adjacentLights = getAdjacentLights(value, gridSize);
        adjacentLights.forEach(adjacentLight => {
            updatedLights = toggleLightState(updatedLights, adjacentLight);
        });

        return updatedLights;
    }

    return (
        <>
            <div className="absolute top-[20%] left-[35%] ">
                <div className="grid grid-cols-5 gap-x-4 gap-y-4 border-2 p-5">
                    {
                        lightsArray.map((item, index) => {
                            return <Light key={index} light={item} On={Lights} toggleLight={() => toggleLight(item)} />
                        })
                    }
                </div>
            </div>
        </>
    )
}