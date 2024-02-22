import './styles.scss';
import { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './winner';
import History from './components/History';
import StatusMessage from './components/StatusMessage';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);

  const gameingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gameingBoard.squares);

  const handleSquareClick = clickedPosition => {
    if (gameingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : history[history.length - 1];

      const nextSquaresState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquaresState,
        isXNext: !lastGamingState.isXNext,
      });
    });

    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIK <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} gameingBoard={gameingBoard} />
      <Board
        squares={gameingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />

      <button
        type="button"
        onClick={onNewGameStart}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start New Game
      </button>

      <h2
        style={{
          fontWeight: 'normal',
        }}
      >
        Current game History:
      </h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
}

export default App;
