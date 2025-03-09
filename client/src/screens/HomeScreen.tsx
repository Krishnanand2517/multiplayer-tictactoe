import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GameMode, GameOptions } from "../types";
import HeadText from "../components/HeadText";
import DecorativeXO from "../components/DecorativeXO";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [gameMode, setGameMode] = useState<GameMode>("local");
  const [gameCode, setGameCode] = useState("");
  const [isCreatingGame, setIsCreatingGame] = useState(true);
  const [error, setError] = useState("");

  const generateGameCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form Validation
    if (!playerOneName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (gameMode === "local" && !playerTwoName.trim()) {
      setError("Please enter a name for Player 2.");
      return;
    }

    if (gameMode === "online" && !isCreatingGame && !gameCode.trim()) {
      setError("Please enter a valid game code.");
      return;
    }

    // Create game options state to pass to the game screen
    const gameOptions: GameOptions = {
      gameMode,
      playerOne: {
        name: playerOneName,
        symbol: "X",
      },
      playerTwo: {
        name: playerTwoName,
        symbol: "O",
      },
      gameCode: isCreatingGame ? generateGameCode() : gameCode,
    };

    navigate("/game", { state: gameOptions });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-amber-50 rounded-lg shadow-lg border-4 border-amber-900 border-dotted relative">
      <HeadText />

      <form onSubmit={handleStartGame} className="relative z-10">
        {/* SELECT GAME MODE */}
        <div className="mb-6">
          <label className="block text-base font-medium mb-2 text-amber-900">
            Game Mode
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setGameMode("local")}
              className={`flex-1 py-3 px-4 rounded-lg transition-all border-2 font-medium ${
                gameMode === "local"
                  ? "bg-amber-200 text-amber-900 border-amber-700 shadow-inner"
                  : "bg-white text-amber-800 border-amber-500 hover:border-amber-700 shadow-md"
              }`}
              style={{
                transform:
                  gameMode === "local"
                    ? "scale(1.05) rotate(-1deg)"
                    : "rotate(1deg)",
              }}
            >
              Local Game
            </button>

            <button
              type="button"
              onClick={() => setGameMode("online")}
              className={`flex-1 py-3 px-4 rounded-lg transition-all border-2 font-medium ${
                gameMode === "online"
                  ? "bg-amber-200 text-amber-900 border-amber-700 shadow-inner"
                  : "bg-white text-amber-800 border-amber-500 hover:border-amber-700 shadow-md"
              }`}
              style={{
                transform:
                  gameMode === "online"
                    ? "scale(1.05) rotate(1deg)"
                    : "rotate(-1deg)",
              }}
            >
              Online Game
            </button>
          </div>
        </div>

        {/* PLAYER NAME INPUT */}
        <div className="mb-6">
          <label
            htmlFor="playerOneName"
            className="block text-md font-medium mb-2 text-amber-900"
            style={{ transform: "rotate(-1deg)" }}
          >
            Player 1 Name
          </label>
          <input
            type="text"
            id="playerOneName"
            value={playerOneName}
            onChange={(e) => setPlayerOneName(e.target.value)}
            className="w-full p-3 bg-white rounded-lg border-2 border-amber-500 focus:border-amber-700 focus:outline-none shadow-md"
            placeholder="Enter player 1 name"
            style={{ transform: "rotate(0.5deg)" }}
          />
        </div>

        {/* IF LOCAL -> PLAYER NAME INPUT */}
        {/* IF ONLINE -> CREATE GAME CODE */}
        {gameMode === "local" ? (
          <div className="mb-6">
            <label
              htmlFor="playerTwoName"
              className="block text-md font-medium mb-2 text-amber-900"
              style={{ transform: "rotate(1deg)" }}
            >
              Player 2 Name
            </label>
            <input
              type="text"
              id="playerTwoName"
              value={playerTwoName}
              onChange={(e) => setPlayerTwoName(e.target.value)}
              className="w-full p-3 bg-white rounded-lg border-2 border-amber-500 focus:border-amber-700 focus:outline-none shadow-md"
              placeholder="Enter player 2 name"
              style={{ transform: "rotate(-0.5deg)" }}
            />
          </div>
        ) : (
          <div className="mb-6">
            <label
              className="block text-md font-medium mb-2 text-amber-900"
              style={{ transform: "rotate(-1deg)" }}
            >
              Online Game Options
            </label>

            <div className="flex gap-4 mb-3">
              <button
                type="button"
                onClick={() => setIsCreatingGame(true)}
                className={`flex-1 py-3 px-4 rounded-lg transition-all border-2 font-medium ${
                  isCreatingGame
                    ? "bg-amber-200 text-amber-900 border-amber-700 shadow-inner"
                    : "bg-white text-amber-800 border-amber-500 hover:border-amber-700 shadow-md"
                }`}
                style={{
                  transform: isCreatingGame
                    ? "rotate(-1deg)"
                    : "rotate(0.5deg)",
                }}
              >
                Create Game
              </button>

              <button
                type="button"
                onClick={() => setIsCreatingGame(false)}
                className={`flex-1 py-3 px-4 rounded-lg transition-all border-2 font-medium ${
                  !isCreatingGame
                    ? "bg-amber-200 text-amber-900 border-amber-700 shadow-inner"
                    : "bg-white text-amber-800 border-amber-500 hover:border-amber-700 shadow-md"
                }`}
                style={{
                  transform: !isCreatingGame
                    ? "rotate(1deg)"
                    : "rotate(-0.5deg)",
                }}
              >
                Join Game
              </button>
            </div>
          </div>
        )}

        {!isCreatingGame && (
          <div className="mt-3 mb-6">
            <label
              htmlFor="gameCode"
              className="block text-md font-medium mb-2 text-amber-900"
              style={{ transform: "rotate(1deg)" }}
            >
              Game Code
            </label>

            <input
              type="text"
              id="gameCode"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value.toUpperCase())}
              className="w-full p-3 bg-white rounded-lg border-2 border-amber-500 focus:border-amber-700 focus:outline-none shadow-md"
              placeholder="Enter game code"
              maxLength={6}
              style={{
                fontFamily: "monospace",
                letterSpacing: "0.1em",
                transform: "rotate(-0.5deg)",
              }}
            />
          </div>
        )}

        {error && (
          <div
            className="mb-6 p-3 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 text-sm font-medium"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            ✏️ {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 mt-2 bg-amber-500 hover:bg-amber-600 rounded-lg font-bold text-white transition-all border-2 border-amber-700 shadow-md"
          style={{ transform: "rotate(1deg)" }}
        >
          {gameMode === "local"
            ? "✏️ Start Game"
            : isCreatingGame
            ? "✏️ Create Game"
            : "✏️ Join Game"}
        </button>
      </form>

      <DecorativeXO decorationType="box" />
    </div>
  );
};

export default HomeScreen;
