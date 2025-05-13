import type React from "react";
import type { DifficultyLevel } from "../features/gird";

export interface LevelButtonProps {
  text: string;
  styles?: React.CSSProperties;
  clickHandler: (level: DifficultyLevel) => void;
  level: DifficultyLevel;
}

function LevelButton({ text, styles, clickHandler, level }: LevelButtonProps) {
  return (
    <button
      onClick={() => clickHandler(level)}
      style={styles}
      className="text-black py-2 px-4 text-xl transition-transform hover:-translate-y-1 cursor-pointer max-md:w-full"
    >
      {text}
    </button>
  );
}

export default LevelButton;
