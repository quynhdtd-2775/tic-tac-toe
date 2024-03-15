import { useState } from "react";
import Board from "./Board";
import "./GameStyles.css";
import { calWinner } from "../../helpers/helpers";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill());
  const [xIsNext, setxIsNext] = useState(true);

  const winner = calWinner(board);
  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? "X" : "O";

    setBoard(boardCopy);
    setxIsNext(!xIsNext);
  };

  console.log(winner);
  return (
    <div>
      <Board cells={board} onClick={handleClick} />
      {winner ? `The winner is ${!xIsNext ? "X" : "O"}` : ""}
    </div>
  );
};

export default Game;
