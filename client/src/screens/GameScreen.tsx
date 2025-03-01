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

  useEffect(() => {
    if (!gameOptions) {
      navigate("/");
    }
  }, [gameOptions, navigate]);

  const handleCellClick = (index: number) => {
    // Already filled
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer.symbol;
    setBoard(newBoard);

    setCurrentPlayer(
      currentPlayer.symbol === gameOptions.playerOne.symbol
        ? gameOptions.playerTwo
        : gameOptions.playerOne
    );
  };

  if (!gameOptions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-amber-50 rounded-lg shadow-lg border-4 border-amber-900 border-dotted relative">
      <HeadText />

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
