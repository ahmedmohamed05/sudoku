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
import MapGrid, { type Highlight } from "./components/Grid.tsx";
import type { ActionType, Grid, GridItemValues } from "./features/types.ts";
import ConfirmationDialog from "./components/ConfirmationDialog.tsx";
import LevelsButtons from "./components/LevelsButtons.tsx";
import getActionMessage from "./features/getActionMsg.ts";

interface ConfirmationState {
  show: boolean;
  action: ActionType | null;
}

function App() {
  const [sol, setSol] = useState<Grid>(generateNewGrid());
  const [grid, setGrid] = useState<Grid>([]);
  const [highlightedCells, setHighlightedCells] = useState<Highlight>({
    row: 0,
    col: 0,
  });
  const [titleText, setTitleText] = useState("Here Is Your Sudoku");
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [level, setLevel] = useState(DifficultyLevel.Expert);
  const [solveBtnClicked, setSolveBtnClicked] = useState(false);
  const [confirmationState, setConfirmationState] = useState<ConfirmationState>(
    { show: false, action: null }
  );
  const [showLevels, setShowLevels] = useState(true);

  useEffect(() => {
    setSolveBtnClicked(false);
    setGrid(hideCells(sol, level));
    setTitleText("Here Is Your Sudoku");
    setPuzzleSolved(false);
  }, [sol, level]);

  // cell actions handlers
  const handleChange = (row: number, col: number, val: string): void => {
    if (!isValidRange(val)) return;

    setGrid((prev) => {
      prev[row][col] = {
        item: val as GridItemValues,
        alreadyFilled: false,
      };

      return Array.from(prev);
    });
  };

  const handleCellClick = (row: number, col: number) => {
    setHighlightedCells({ row, col });
  };

  // const handelReset
  // Action Handlers
  const handleReset = () => {
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
  const handelRegenerateGrid = () => setSol(generateNewGrid());
  const checkSolHandler = () => {
    if (solveBtnClicked) {
      setTitleText("You Have To Solve It, I Know You Can");
      return;
    }

    const ret = isValidSolution(grid);
    if (ret) {
      setTitleText("Congratulation You Solved It !!!");
      setPuzzleSolved(true);
    } else {
      setTitleText("Good Job So Far Keep Going !");
    }
    console.log(ret);
  };
  const handleSolve = () => {
    setGrid((prev) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          prev[i][j].item = sol[i][j].item;
        }
      }
      return Array.from(prev);
    });
  };
  const handleChangeLevel = () => {
    setShowLevels(true);
    setSol(generateNewGrid());
  };

  // Confirmation Handlers
  const handleCancelConfirmation = () => {
    setConfirmationState({ show: false, action: null });
  };
  const handleConfirmedAction = () => {
    switch (confirmationState.action) {
      case "solve":
        handleSolve();
        break;
      case "reset":
        handleReset();
        break;
      case "regenerate":
        handelRegenerateGrid();
        break;
      case "change level":
        handleChangeLevel();
        break;
      default:
        return;
    }
    handleCancelConfirmation();
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center flex-col gap-4">
      <h1
        className="font-bold text-4xl text-center px-2"
        style={{ color: puzzleSolved ? "blue" : "black" }}
      >
        {titleText}
      </h1>
      <main>
        <div className="flex flex-col overflow-hidden">
          <MapGrid
            grid={grid}
            changeHandler={handleChange}
            handleClick={handleCellClick}
            highlight={highlightedCells}
          />
        </div>
      </main>
      <ActionButtons
        checkSolHandler={checkSolHandler}
        reGenerateGridHandler={() =>
          setConfirmationState({ show: true, action: "regenerate" })
        }
        solveHandler={() =>
          setConfirmationState({ show: true, action: "reset" })
        }
        resetHandler={() =>
          setConfirmationState({ show: true, action: "reset" })
        }
        changeLevelHandler={() =>
          setConfirmationState({ show: true, action: "change level" })
        }
      />

      <ConfirmationDialog
        title={getActionMessage(confirmationState.action as ActionType)}
        onConfirm={handleConfirmedAction}
        onCancel={handleCancelConfirmation}
        show={confirmationState.show}
      />

      <LevelsButtons
        show={showLevels}
        setLevel={(level: DifficultyLevel) => {
          setLevel(level);
          setShowLevels(false);
        }}
      />
    </div>
  );
}

export default App;
