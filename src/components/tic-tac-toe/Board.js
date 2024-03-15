import Cell from "./Cell";
import "./GameStyles.css";

const Board = ({ cells, onClick }) => {
  return (
    <div className="game-board">
      {cells &&
        cells.map((item, index) => {
          return (
            <Cell key={index} value={item} onClick={() => onClick(index)} />
          );
        })}
    </div>
  );
};

export default Board;
