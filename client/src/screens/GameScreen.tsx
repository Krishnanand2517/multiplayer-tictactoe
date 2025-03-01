import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BoardState, GameOptions, Player } from "../types";
import HeadText from "../components/HeadText";

const GameScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const gameOptions = location.state as GameOptions;

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    gameOptions?.playerOne
  );

  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    if (!gameOptions) {
      navigate("/");
    }
  }, [gameOptions, navigate]);

  const checkDraw = (board: BoardState): boolean => {
    if (board.every((cell) => cell !== null)) {
      setIsDraw(true);
      return true;
    }

    return false;
  };

  const handleCellClick = (index: number) => {
    // Already filled or game over
    if (board[index] || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer.symbol;
    setBoard(newBoard);

    if (!checkDraw(newBoard)) {
      setCurrentPlayer(
        currentPlayer.symbol === gameOptions.playerOne.symbol
          ? gameOptions.playerTwo
          : gameOptions.playerOne
      );
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(gameOptions.playerOne);
    setIsDraw(false);
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
          ${isDraw ? "animate-pulse" : ""}`}
        style={{ transform: "rotate(0.5deg)" }}
      >
        {isDraw ? (
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
          return (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`bg-white border-2 border-amber-500 rounded-lg flex items-center justify-center text-4xl font-bold transition-all aspect-square relative z-10
                ${!cell ? "hover:bg-amber-100" : ""}`}
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

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={resetGame}
          className="py-3 px-4 bg-amber-500 hover:bg-amber-600 rounded-lg font-bold text-white transition-all border-2 border-amber-700 shadow-md z-10"
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

      {/* Decorative XO elements */}
      <div className="absolute -rotate-12 text-4xl font-bold text-amber-200 -left-4 top-20 select-none">
        X
      </div>
      <div className="absolute rotate-12 text-4xl font-bold text-amber-200 -right-4 top-32 select-none">
        O
      </div>
      <div className="absolute -rotate-6 text-4xl font-bold text-amber-200 left-4 bottom-6 select-none">
        O
      </div>
      <div className="absolute rotate-6 text-4xl font-bold text-amber-200 right-6 bottom-8 select-none">
        X
      </div>
    </div>
  );
};

export default GameScreen;
