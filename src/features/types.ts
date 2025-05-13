export type GridItemValues =
  | ""
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type GridItem = {
  item: GridItemValues;
  alreadyFilled: boolean;
};

export type Grid = GridItem[][];

export interface Puzzle {
  grid: Grid;
  sol: Grid;
}

export type ActionType = "solve" | "reset" | "regenerate" | "change level";
