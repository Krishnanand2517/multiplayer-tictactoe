import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BoardState, GameHistory, GameOptions, Player } from "../types";
import { WIN_COMBINATIONS } from "../constants";
import HeadText from "../components/HeadText";
import DecorativeXO from "../components/DecorativeXO";
import GameHistoryBox from "../components/GameHistoryBox";

const GameScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const gameOptions = location.state as GameOptions;

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    gameOptions?.playerOne
  );

  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory>({
    player1Wins: 0,
    player2Wins: 0,
    draws: 0,
  });

  useEffect(() => {
    if (!gameOptions) {
      navigate("/");
    }
  }, [gameOptions, navigate]);

  const checkWin = (board: BoardState) => {
    for (const combo of WIN_COMBINATIONS) {
      const [a, b, c] = combo;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winningPlayer =
          board[a] === gameOptions.playerOne.symbol
            ? gameOptions.playerOne
            : gameOptions.playerTwo;

        setWinner(winningPlayer);
        setWinningLine(combo);

        setGameHistory((prev) => ({
          ...prev,
          player1Wins:
            winningPlayer.symbol === gameOptions.playerOne.symbol
              ? prev.player1Wins + 1
              : prev.player1Wins,
          player2Wins:
            winningPlayer.symbol === gameOptions.playerTwo.symbol
              ? prev.player2Wins + 1
              : prev.player2Wins,
        }));

        return true;
      }
    }

    return false;
  };

  const checkDraw = (board: BoardState) => {
    if (board.every((cell) => cell !== null)) {
      setIsDraw(true);

      setGameHistory((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));

      return true;
    }

    return false;
  };

  const handleCellClick = (index: number) => {
    // Already filled or game over
    if (board[index] || isDraw || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer.symbol;
    setBoard(newBoard);

    if (!checkWin(newBoard)) {
      if (!checkDraw(newBoard)) {
        // Switch players
        setCurrentPlayer(
          currentPlayer.symbol === gameOptions.playerOne.symbol
            ? gameOptions.playerTwo
            : gameOptions.playerOne
        );
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(gameOptions.playerOne);
    setIsDraw(false);
    setWinner(null);
    setWinningLine(null);
  };

  const goToHomeScreen = () => {
    navigate("/");
  };

  if (!gameOptions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-amber-50 rounded-lg shadow-lg border-4 border-amber-900 border-dotted relative">
      <HeadText />

      {/* GAME STATUS */}
      <div
        className={`text-center mb-4 p-2 bg-amber-100 rounded-lg border-2 border-amber-300
          ${isDraw || !!winner ? "animate-pulse" : ""}`}
        style={{ transform: "rotate(0.5deg)" }}
      >
        {winner ? (
          <p className="text-amber-900 font-bold">🎉 {winner.name} wins! 🎉</p>
        ) : isDraw ? (
          <p className="text-amber-900 font-bold">🤝 It's a draw! 🤝</p>
        ) : (
          <p className="text-amber-900">
            {currentPlayer.name}'s turn ({currentPlayer.symbol})
          </p>
        )}
      </div>

      {/* GAME BOARD */}
      <div className="grid grid-cols-3 gap-2 mb-6 w-full aspect-square">
        {board.map((cell, index) => {
          const isWinningCell = winningLine?.includes(index);

          return (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`border-2 rounded-lg flex items-center justify-center text-4xl font-bold transition-all aspect-square relative z-10
                ${
                  isWinningCell
                    ? "bg-amber-200 border-amber-600"
                    : "bg-white border-amber-500"
                }
                ${!cell && !isDraw && !winner ? "hover:bg-amber-100" : ""}`}
              style={{
                transform: `rotate(${Math.random() * 2 - 1}deg)`,
                boxShadow: "3px 3px 0 rgba(146, 64, 14, 0.2)",
              }}
              disabled={!!cell}
            >
              <span
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  cell === "X" ? "text-amber-700" : "text-amber-900"
                }`}
              >
                {cell}
              </span>
            </button>
          );
        })}
      </div>

      {/* GAME HISTORY */}
      <GameHistoryBox gameOptions={gameOptions} gameHistory={gameHistory} />

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={resetGame}
          className={`py-3 px-4 bg-amber-500 hover:bg-amber-600 rounded-lg font-bold text-white transition-all border-2 border-amber-700 shadow-md z-10
            ${isDraw || winner ? "animate-bounce" : ""}`}
          style={{ transform: "rotate(-0.5deg)" }}
        >
          New Game
        </button>

        <button
          onClick={goToHomeScreen}
          className="py-3 px-4 bg-amber-400 hover:bg-amber-500 rounded-lg font-bold text-white transition-all border-2 border-amber-700 shadow-md z-10"
          style={{ transform: "rotate(0.5deg)" }}
        >
          Home Screen
        </button>
      </div>

      <DecorativeXO decorationType="box" />
    </div>
  );
};

export default GameScreen;
