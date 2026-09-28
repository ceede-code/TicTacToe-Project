import React, { useReducer, useEffect } from 'react';
import './App.css';
import { ACTIONS, initialState, gameReducer } from './Source';
import { Scoreboard } from './components/Score';
import { Status } from './components/Status';
import { Board } from './components/Board';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (state.winner || state.isDraw) return;

    if (state.timeLeft <= 0) {
      dispatch({ type: ACTIONS.TIME_OUT });
      return;
    }

    const timer = setInterval(() => {
      dispatch({ type: ACTIONS.TICK_TIMER });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeLeft, state.winner, state.isDraw, state.currentPlayer]);

  return (
    <main className="app-container">
      <Scoreboard scores={state.scores} playerNames={state.playerNames} />

      <Status
        winner={state.winner}
        isDraw={state.isDraw}
        currentPlayer={state.currentPlayer}
        playerNames={state.playerNames}
        timeLeft={state.timeLeft}
      />

      <Board
        board={state.board}
        winLine={state.winLine}
        onSquareClick={(index) => dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index } })}
      />

      <div className="controls">
        <button className="btn" onClick={() => dispatch({ type: ACTIONS.UNDO })}>Undo</button>
        <button className="btn" onClick={() => dispatch({ type: ACTIONS.RESET })}>Reset</button>
      </div>
    </main>
  );
}
