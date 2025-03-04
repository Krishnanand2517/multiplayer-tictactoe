export type Player = {
  name: string;
  symbol: string;
};

export type GameOptions = {
  playerOne: Player;
  playerTwo: Player;
};

export type BoardState = (string | null)[];

export type GameHistory = {
  player1Wins: number;
  player2Wins: number;
  draws: number;
};

export type DecorationType = "page" | "box";
