import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GameOptions } from "../types";
import HeadText from "../components/HeadText";
import DecorativeXO from "../components/DecorativeXO";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [error, setError] = useState("");

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form Validation
    if (!playerOneName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!playerTwoName.trim()) {
      setError("Please enter a name for Player 2.");
      return;
    }

    // Create game options state to pass to the game screen
    const gameOptions: GameOptions = {
      playerOne: {
        name: playerOneName,
        symbol: "X",
      },
      playerTwo: {
        name: playerTwoName,
        symbol: "O",
      },
    };

    navigate("/game", { state: gameOptions });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-amber-50 rounded-lg shadow-lg border-4 border-amber-900 border-dotted relative">
      <HeadText />

      <form onSubmit={handleStartGame} className="relative z-10">
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
          ✏️ Start Game
        </button>
      </form>

      <DecorativeXO decorationType="box" />
    </div>
  );
};

export default HomeScreen;
