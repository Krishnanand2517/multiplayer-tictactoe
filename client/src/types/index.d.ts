export type GameMode = "local" | "online";

export type Player = {
  name: string;
  symbol: "X" | "O";
};

export type GameOptions = {
  gameMode: GameMode;
  playerOne?: Player;
  playerTwo?: Player;
  gameCode: string;
};

export type BoardState = (string | null)[];

export type GameHistory = {
  player1Wins: number;
  player2Wins: number;
  draws: number;
};

export type DecorationType = "page" | "box";
