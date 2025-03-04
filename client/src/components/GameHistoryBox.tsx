import { GameHistory, GameOptions } from "../types";

const GameHistoryBox = ({
  gameOptions,
  gameHistory,
}: {
  gameOptions: GameOptions;
  gameHistory: GameHistory;
}) => {
  return (
    <div
      className="mb-6 p-3 bg-amber-100 border-2 border-amber-300 rounded-lg"
      style={{ transform: "rotate(-0.5deg)" }}
    >
      <h2 className="text-center font-bold text-amber-900 mb-2">
        Game History
      </h2>

      <div className="flex justify-around text-sm">
        <div className="text-center">
          <p className="font-bold text-amber-900">
            {gameOptions.playerOne.name}
          </p>
          <p className="text-amber-700">{gameHistory.player1Wins}</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-amber-900">Draws</p>
          <p className="text-amber-700">{gameHistory.draws}</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-amber-900">
            {gameOptions.playerTwo.name}
          </p>
          <p className="text-amber-700">{gameHistory.player2Wins}</p>
        </div>
      </div>
    </div>
  );
};

export default GameHistoryBox;
