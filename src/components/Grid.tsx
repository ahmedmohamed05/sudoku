import { getSquareIndex } from "../features/gird.ts";
import { type Grid } from "../features/types.ts";

export interface MapGridProps {
  grid: Grid;
  changeHandler: (rowIndex: number, colIndex: number, value: string) => void;
}

function MapGrid({ grid, changeHandler }: MapGridProps) {
  return grid.map((row, rowIndex) => {
    const bottomBorder = rowIndex == 2 || rowIndex == 5 ? "border-bottom" : "";
    return (
      <div className={`flex-1 sudoku-row ${bottomBorder}`} key={rowIndex}>
        {row.map(({ item, alreadyFilled }, itemIndex) => {
          let classes =
            "sudoku-square-item-" +
            (getSquareIndex(rowIndex, itemIndex) + 1).toString();

          if (itemIndex == 2 || itemIndex == 5) classes += " border-right ";

          const color = alreadyFilled ? "#343a40" : "#0d6efd";

          return (
            <div
              className={`sudoku-square-item m-0.5 md:m-1 inline-block ${classes} `}
              key={itemIndex}
              style={{ border: `solid 2px #212529` }}
            >
              <input
                onChange={(e) => {
                  changeHandler(rowIndex, itemIndex, e.target.value);
                }}
                type="text"
                value={item}
                disabled={alreadyFilled}
                className="w-7 md:w-10 lg:w-12 aspect-square font-bold text-xl md:text-2xl text-center outline-none"
                style={{ color }}
              />
            </div>
          );
        })}
      </div>
    );
  });
}

export default MapGrid;
