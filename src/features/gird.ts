import type { Grid, GridItemValues } from "./types";
import getRandomInt from "./random-number";

export function initGrid(): Grid {
  // Create a new array for each row
  return Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => ({
      item: "",
      alreadyFilled: true,
      userFilled: false,
    }))
  );
}

// Get Sub-grid square index
export function getSquareIndex(row: number, col: number): number {
  return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

export enum DifficultyLevel {
  Easy,
  Medium,
  Hard,
}

function numberOfCellsToHide(level: DifficultyLevel) {
  let min = 0,
    max = 0;
  switch (level) {
    case DifficultyLevel.Easy:
      min = 20;
      max = 29;
      break;
    case DifficultyLevel.Medium:
      min = 30;
      max = 39;
      break;
    case DifficultyLevel.Hard:
      min = 40;
      max = 49;
      break;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hideCells(grid: Grid, level: DifficultyLevel) {
  const n = numberOfCellsToHide(level);
  const copy = copyGrid(grid);
  for (let i = 1; i <= n; i++) {
    const randomRow = getRandomInt(0, 8);
    const randomCol = getRandomInt(0, 8);

    copy[randomRow][randomCol] = {
      item: "",
      alreadyFilled: false,
    };
  }

  return copy;
}

export function generateNewGrid(): Grid {
  const sol: Grid = generateGridBackTrack(initGrid(), 0, 0).grid;
  return sol;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValidPlace(
  grid: Grid,
  row: number,
  col: number,
  n: GridItemValues
): boolean {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i].item == n) return false;
  }

  for (let i = 0; i < 9; i++) {
    if (grid[i][col].item == n) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol].item == n) return false;
    }
  }

  return true;
}

function copyGrid(grid: Grid): Grid {
  return grid.map((row) => row.map((cell) => ({ ...cell })));
}

function generateGridBackTrack(
  grid: Grid,
  row: number,
  col: number
): { grid: Grid; status: boolean } {
  if (row === 9) return { grid, status: true };
  if (col === 9) return generateGridBackTrack(grid, row + 1, 0);

  // Create a copy before modifications
  const newGrid = copyGrid(grid);

  if (newGrid[row][col].item !== "") {
    return generateGridBackTrack(newGrid, row, col + 1);
  }

  const numbers = Array.from(
    { length: 9 },
    (_, i) => (i + 1).toString() as GridItemValues
  );
  for (const num of shuffle(numbers)) {
    if (isValidPlace(newGrid, row, col, num)) {
      newGrid[row][col] = { ...newGrid[row][col], item: num };

      const result = generateGridBackTrack(newGrid, row, col + 1);
      if (result.status) return result;
    }
  }

  return { grid, status: false };
}

function isValidRow(grid: Grid, row: number): boolean {
  const seen = new Set<GridItemValues>();
  for (let i = 0; i < 9; i++) {
    if (seen.has(grid[row][i].item)) return false;

    seen.add(grid[row][i].item);
  }

  return true;
}

function isValidCol(grid: Grid, col: number): boolean {
  const seen = new Set<GridItemValues>();
  for (let i = 0; i < 9; i++) {
    if (seen.has(grid[i][col].item)) return false;

    seen.add(grid[i][col].item);
  }

  return true;
}

function isValidSubGrid(grid: Grid, row: number, col: number): boolean {
  const seen = new Set<GridItemValues>();

  const startRow = (row / 3) * 3;
  const startCol = (col / 3) * 3;

  // Sub-grids are 3X3 2D-arrays
  for (let i = startRow; i < 3; i++) {
    for (let j = startCol; j < 3; j++) {
      const item = grid[i][j].item;

      if (seen.has(item)) return false;

      seen.add(item);
    }
  }

  return true;
}

export function isValidSolution(grid: Grid): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j].item == "") return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (!(isValidRow(grid, i) || isValidCol(grid, i))) return false;

    for (let j = 0; j < 9; j++) {
      if (!isValidSubGrid(grid, i, j)) return false;
    }
  }

  return true;
}
