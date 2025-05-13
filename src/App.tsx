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
import ConfirmationDialog, {
  type ConfirmationDialogProps,
} from "./components/ConfirmationDialog.tsx";
import LevelsButtons from "./components/LevelsButtons.tsx";

function App() {
  const [sol, setSol] = useState<Grid>(generateNewGrid());
  const [grid, setGrid] = useState<Grid>([]);
  const [titleText, setTitleText] = useState("Here Is Your Sudoku");
  const [level, setLevel] = useState(DifficultyLevel.Expert);
  const [confirmProps, setConfirmProps] = useState<ConfirmationDialogProps>({
    title: "Select Difficulty Level",
    children: <LevelsButtons setLevel={setLevelHandler} />,
    show: true,
    onCancel: cancelConfirmationDialog,
  });

  useEffect(() => {
    setGrid(hideCells(sol, level));
  }, [sol, level]);

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
    setConfirmProps((prev) => ({ ...prev, show: true }));
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

  function setLevelHandler(level: DifficultyLevel) {
    setLevel(level);
    cancelConfirmationDialog();
  }

  function cancelConfirmationDialog() {
    setConfirmProps((prev) => ({ ...prev, show: false }));
  }

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

      <ConfirmationDialog
        {...confirmProps}
        onCancel={cancelConfirmationDialog}
      />
    </div>
  );
}

export default App;
