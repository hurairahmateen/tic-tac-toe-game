import { useState } from "react";
import "./App.css";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const winner = getWinner(board);
  const isDraw = !winner && board.every((cell) => cell);

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "Draw game"
      : `Next player: ${player}`;

  const handleCellClick = (index) => {
    if (board[index] || winner) return;
    const nextBoard = [...board];
    nextBoard[index] = player;
    setBoard(nextBoard);
    setPlayer(player === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <p className="status">{status}</p>
      <div className="grid" role="grid" aria-label="Tic Tac Toe">
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            className="cell"
            onClick={() => handleCellClick(index)}
            disabled={Boolean(cell) || Boolean(winner)}
            aria-label={`Cell ${index + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>
      <button type="button" className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
