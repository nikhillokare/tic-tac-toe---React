import React, { useState } from "react";
import "./App.css";

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || checkWinner()) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const winner = checkWinner();
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>
      <div className="status">{status}</div>
      {winner && <button onClick={resetGame}>Restart</button>}
    </div>
  );
};

export default App;
