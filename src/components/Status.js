export function Status({ winner, isDraw, currentPlayer, playerNames, timeLeft }) {
  if (winner) return <h2 className="status">Winner: {playerNames[winner]}!</h2>;
  if (isDraw) return <h2 className="status">Draw!</h2>;
  return (
    <div className="status-container">
      <h2 className="status">Next Player: {playerNames[currentPlayer]} ({currentPlayer})</h2>
      <div className="timer-badge">Time Left: {timeLeft}s</div>
    </div>
  );
}