export function Square({ value, onClick, isWinningSquare }) {
  return (
    <button
      className={`square ${isWinningSquare ? 'square--winner' : ''}`}
      onClick={onClick}
      disabled={Boolean(value)}
    >
      {value}
    </button>
  );
}