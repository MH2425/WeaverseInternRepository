// import { useState } from "react";

type SquareProps = {
    value: 'X' | 'O' | null;
    onClick: () => void;
}

export default function Square({value, onClick} : SquareProps) {
    return (
        <>
            <button 
                onClick={onClick}
                className="bg-gray-300 border h-24 w-24 font-bold flex items-center justify-center">
                    {value}
            </button>
        </>
    );
}