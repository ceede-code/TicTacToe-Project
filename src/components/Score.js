export function Scoreboard({ scores, playerNames }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard-item">{playerNames.X}: <strong>{scores.X}</strong></div>
      <div className="scoreboard-item">Draws: <strong>{scores.draws}</strong></div>
      <div className="scoreboard-item">{playerNames.O}: <strong>{scores.O}</strong></div>
    </div>
  );
}