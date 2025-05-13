import type React from "react";
import LevelButton from "./LevelButton";
import { DifficultyLevel } from "../features/gird";

export interface LevelButtonsProps {
  show: boolean;
  setLevel: (level: DifficultyLevel) => void;
}

function LevelsButtons({ setLevel, show }: LevelButtonsProps) {
  if (!show) return null;
  interface Btn {
    text: string;
    styles: React.CSSProperties;
    level: DifficultyLevel;
  }

  const btns: Btn[] = [
    {
      text: "Easy",
      styles: { backgroundColor: "lime" },
      level: DifficultyLevel.Easy,
    },
    {
      text: "Medium",
      styles: { backgroundColor: "yellow" },
      level: DifficultyLevel.Medium,
    },
    {
      text: "Hard",
      styles: { backgroundColor: "purple" },
      level: DifficultyLevel.Hard,
    },
    {
      text: "Expert",
      styles: { backgroundColor: "red" },
      level: DifficultyLevel.Expert,
    },
  ];

  return (
    <div className="fixed inset-0 flex justify-center items-center flex-col bg-gray-800/70">
      <div className="flex justify-center items-center gap-2 max-md:flex-col my-4 bg-gray-800 py-10 p-12">
        {btns.map((btn) => (
          <LevelButton {...btn} clickHandler={setLevel} key={btn.text} />
        ))}
      </div>
    </div>
  );
}

export default LevelsButtons;
