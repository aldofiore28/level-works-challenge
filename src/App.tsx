import { useReducer } from "react";
import "./App.css";
import Cell from "./Cell.tsx";
import { gridReducer } from "./reducer.ts";

function buildInitialGrid(rows: number = 50, columns: number = 50): number[][] {
  return new Array(rows).fill(new Array(columns).fill(0));
}

function App() {
  const [grid, dispatch] = useReducer(gridReducer, buildInitialGrid());
  
  const increaseCellValue = (x: number, y: number) => {
    dispatch({
      type: "INCREMENT",
      payload: { x, y }
    });
  };
  
  return (
    <>
      {grid.map((row, x) =>
        <div key={`${x}-row`} className="row">
          {row.map((value, y) =>
            <Cell key={`${y}-column`} x={x} y={y} value={value} increaseValue={increaseCellValue}/>
          )}
        </div>
      )}
    </>
  );
}

export default App;
