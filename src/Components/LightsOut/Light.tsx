import React from 'react';

interface lightProps{
    light: number;
    On: number[];
    toggleLight: () => void;
}

export const Light: React.FC<lightProps> = ({light, On, toggleLight}) => {
    return (
        <>
          <div className={`${On.includes(light) ? 'from-amber-300 via-amber-400 to-amber-500' : 'from-gray-300 via-gray-400 to-gray-500'} rounded-full px-6 py-5 flex justify-center shadow-md cursor-pointer items-center 
          bg-gradient-to-br `} onClick={toggleLight}>
            {light}
          </div>
        </>
    )
}