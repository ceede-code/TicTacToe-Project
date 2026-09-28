import { Square } from './Square';

export function Board({ board, winLine, onSquareClick }) {
  return (
    <div className="board">
      {board.map((cell, idx) => (
        <Square
          key={idx}
          value={cell}
          isWinningSquare={winLine?.includes(idx)}
          onClick={() => onSquareClick(idx)}
        />
      ))}
    </div>
  );
}