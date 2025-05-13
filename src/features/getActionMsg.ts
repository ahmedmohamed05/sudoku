import type { ActionType } from "./types";

export default function getActionMessage(action: ActionType) {
  switch (action) {
    case "solve":
      return "This will reveal the solution. Are you sure?";
    case "reset":
      return "Reset all progress and start over?";
    case "regenerate":
      return "Generate a new puzzle? Current progress will be lost.";
    case "change level":
      return "Change the level, This Will Generate New One";
    default:
      return "No Action";
  }
}
