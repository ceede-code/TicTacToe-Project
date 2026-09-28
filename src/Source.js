// Basic logic
export const PLAYERS = { X: 'X', O: 'O' };

export const ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  RESET: 'RESET',
  UNDO: 'UNDO',
  SET_NAME: 'SET_NAME',
  TICK_TIMER: 'TICK_TIMER',
  TIME_OUT: 'TIME_OUT',
};

export const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

// secondary game logic & ruling
export function calculateWinner(board) {
  for (const [a, b, c] of WINNING_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

export function isBoardFull(board) {
  return board.every(Boolean);
}

// state transition 
export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: PLAYERS.X,
  winner: null,
  winLine: null,
  isDraw: false,
  history: [Array(9).fill(null)],
  scores: { [PLAYERS.X]: 0, [PLAYERS.O]: 0, draws: 0 },
  playerNames: { [PLAYERS.X]: 'Player 1', [PLAYERS.O]: 'Player 2' },
  timeLeft: 10,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE: {
      const { index } = action.payload;
      if (state.board[index] || state.winner || state.isDraw) return state;

      const nextBoard = [...state.board];
      nextBoard[index] = state.currentPlayer;

      const winResult = calculateWinner(nextBoard);
      const drawResult = !winResult && isBoardFull(nextBoard);

      const nextScores = { ...state.scores };
      if (winResult) nextScores[winResult.winner] += 1;
      else if (drawResult) nextScores.draws += 1;

      return {
        ...state,
        board: nextBoard,
        currentPlayer: state.currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X,
        winner: winResult?.winner || null,
        winLine: winResult?.line || null,
        isDraw: drawResult,
        history: [...state.history, nextBoard],
        scores: nextScores,
        timeLeft: 10,
      };
    }

    case ACTIONS.UNDO: {
      if (state.history.length <= 1) return state;

      const previousHistory = state.history.slice(0, -1);
      const previousBoard = previousHistory[previousHistory.length - 1];

      return {
        ...state,
        board: previousBoard,
        currentPlayer: state.currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X,
        winner: null,
        winLine: null,
        isDraw: false,
        history: previousHistory,
        timeLeft: 10,
      };
    }

    case ACTIONS.RESET:
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: PLAYERS.X,
        winner: null,
        winLine: null,
        isDraw: false,
        history: [Array(9).fill(null)],
        timeLeft: 10,
      };

    case ACTIONS.SET_NAME:
      return {
        ...state,
        playerNames: {
          ...state.playerNames,
          [action.payload.player]: action.payload.name,
        },
      };

    case ACTIONS.TICK_TIMER:
      if (state.winner || state.isDraw) return state;
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    case ACTIONS.TIME_OUT:
      if (state.winner || state.isDraw) return state;
      return {
        ...state,
        currentPlayer: state.currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X,
        timeLeft: 10,
      };

    default:
      return state;
  }
}

