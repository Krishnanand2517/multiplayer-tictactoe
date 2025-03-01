export type Player = {
  name: string;
  symbol: string;
};

export type GameOptions = {
  playerOne: Player;
  playerTwo: Player;
};

export type BoardState = (string | null)[];

export type DecorationType = "page" | "box";
