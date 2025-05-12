import { useEffect, useState } from "react";
import "./App.css";
import {
  DifficultyLevel,
  generateNewGrid,
  hideCells,
  isValidSolution,
} from "./features/gird.ts";
import isValidRange from "./features/validate-range.ts";
import ActionButtons from "./components/ActionButtons.tsx";
import MapGrid from "./components/Grid.tsx";
import type { Grid, GridItemValues } from "./features/types.ts";

function App() {
  const [sol, setSol] = useState<Grid>(generateNewGrid());
  const [grid, setGrid] = useState<Grid>([]);
  const [titleText, setTitleText] = useState("Here Is Your Sudoku");

  useEffect(() => {
    setGrid(hideCells(sol, DifficultyLevel.Easy));
  }, [sol]);

  const onChangeHandler = (row: number, col: number, val: string): void => {
    if (!isValidRange(val)) return;

    setGrid((prev) => {
      prev[row][col] = {
        item: val as GridItemValues,
        alreadyFilled: false,
      };

      return Array.from(prev);
    });
  };

  const resetHandler = () => {
    setGrid((prev) =>
      Array.from(
        prev.map((row) =>
          row.map((item) => {
            if (!item.alreadyFilled) return { ...item, item: "" };
            return item;
          })
        )
      )
    );
  };

  const generateNewGridHandler = () => {
    setSol(generateNewGrid());
  };

  const checkSolHandler = () => {
    const ret = isValidSolution(grid);
    if (ret) {
      setTitleText("Congratulation You Solved It !!!");
    } else {
      setTitleText("Good Job So Far Keep Trying !");
    }
  };

  const solveHandler = () => {
    setGrid((prev) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          prev[i][j].item = sol[i][j].item;
        }
      }
      return Array.from(prev);
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="font-bold text-5xl text-center px-2">{titleText}</h1>
      <main>
        <div className="flex flex-col overflow-hidden">
          <MapGrid grid={grid} changeHandler={onChangeHandler} />
        </div>
      </main>
      <ActionButtons
        checkSolHandler={checkSolHandler}
        reGenerateGridHandler={generateNewGridHandler}
        solveHandler={solveHandler}
        resetHandler={resetHandler}
      />
    </div>
  );
}

export default App;
