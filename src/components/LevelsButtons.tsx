import type React from "react";
import LevelButton from "./LevelButton";
import { DifficultyLevel } from "../features/gird";

export interface LevelButtonsProps {
  setLevel: (level: DifficultyLevel) => void;
}

function LevelsButtons({ setLevel }: LevelButtonsProps) {
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
    <div className="flex justify-center items-center gap-2 max-md:flex-col my-4 bg-gray-800 py-10 p-12">
      {btns.map((btn) => (
        <LevelButton {...btn} clickHandler={setLevel} key={btn.text} />
      ))}
    </div>
  );
}

export default LevelsButtons;
