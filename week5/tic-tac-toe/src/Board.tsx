import { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState<Array<"X" | "O" | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i: number) {
    const nextSquares = squares.slice();
    if (nextSquares[i] !== null || calculateWinner(squares)) return;

    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-0 w-[288px]">
        {squares.map((value, i) => (
          <Square key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>

      <div className="text-xl font-bold">
        {winner
          ? `Winner: ${winner}`
          : squares.every(square => square !== null)
            ? `Draw match!`
            : `Next player: ${xIsNext ? "X" : "O"}`}
      </div>
    </div>
  );
}

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: Array<"X" | "O" | null>): "X" | "O" | null {
  for (let [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
