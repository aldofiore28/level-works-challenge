import { useEffect, useReducer, useCallback } from "react";
import "./App.css";
import Cell from "./Cell.tsx";
import { gridReducer } from "./reducer.ts";
import { buildInitialState, checkForFibonacciSequences } from "./util.ts";

function App() {
  const [state, dispatch] = useReducer(
    gridReducer,
    {},
    buildInitialState
  );
  
  const increaseCellValue = useCallback((x: number, y: number) => {
    dispatch({
      type: "INCREMENT",
      payload: { x, y },
    });
  }, [dispatch]);
  
  useEffect(() => {
    const checkFibonacciSequence = async () => {
      try {
        const result = checkForFibonacciSequences(state.grid);
        dispatch({
          type: "FIBONACCI",
          payload: {
            toFillFibonacci: result
          }
        });
        console.log("Fibonacci sequence check result:", result);
      } catch (error) {
        console.error(error);
      }
    };
    
    const timer = setTimeout(checkFibonacciSequence, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [state.grid, increaseCellValue]);
  
  return (
    <>
      {state.grid.map((row, x) =>
        <div key={`${x}-row`} className="row">
          {row.map((value, y) =>
            <Cell
              key={`${y}-column`}
              x={x}
              y={y}
              value={value}
              fill={!!state.toFill.length && state.toFill.includes(`${x}-${y}`)}
              increaseValue={increaseCellValue}/>
          )}
        </div>
      )}
    </>
  );
}

export default App;
