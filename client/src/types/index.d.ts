export type GameMode = "local" | "online";

export type Player = {
  name: string;
  symbol: "X" | "O";
};

type LocalGameOptions = {
  gameMode: "local";
  gameCode: string;
  playerOne: Player;
  playerTwo: Player;
};

type OnlineGameOptions = {
  gameMode: "online";
  gameCode: string;
} & (
  | { playerOne: Player; playerTwo?: Player }
  | { playerOne?: Player; playerTwo: Player }
);

export type GameOptions = LocalGameOptions | OnlineGameOptions;

export type BoardState = (string | null)[];

export type GameHistory = {
  player1Wins: number;
  player2Wins: number;
  draws: number;
};

export type DecorationType = "page" | "box";
