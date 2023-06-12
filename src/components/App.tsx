import { useCallback, useState } from "react";
import "./App.css";
import { MemoCell } from "./Cell.tsx";
import { buildInitialGrid } from "../utils";

export function App() {
  const [grid, setGrid] = useState(() => buildInitialGrid());
  
  const increaseCellValue = useCallback((x: number, y: number) => {
    setGrid((prevGrid) => {
      return prevGrid.map((row, rowIndex) => {
        if (rowIndex !== x) {
          const newRow = [...row];
          newRow[y] = newRow[y] + 1;
          return newRow;
        }
        
        return row.map(value => value + 1);
      });
    });
  }, []);
  
  return (
    <>
      {grid.map((row, x) =>
        <div key={`${x}-row`} className="row">
          {row.map((value, y) =>
            <MemoCell
              key={`${y}-column`}
              x={x}
              y={y}
              value={value}
              increaseValue={increaseCellValue}
            />
          )}
        </div>
      )}
    </>
  );
}
