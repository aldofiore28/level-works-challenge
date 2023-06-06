import { useCallback, useEffect, useReducer } from "react";
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
  
  const addToResetQueue = useCallback((x: number, y: number) => {
    dispatch({
      type: "RESET",
      payload: { x, y },
    });
  }, [dispatch]);
  
  const resetGrid = useCallback((queue: string[]) => {
    dispatch({
      type: "RESET_GRID",
      payload: { queue }
    });
  }, [dispatch]);
  
  const resetToFill = useCallback(() => {
    dispatch({
      type: "RESET_TO_FILL",
      payload: {}
    });
  }, [dispatch]);
  
  useEffect(() => {
    const checkFibonacciSequence = async () => {
      try {
        const result = checkForFibonacciSequences(state.grid);
        dispatch({
          type: "COLOR_FIBONACCI",
          payload: {
            toFillFibonacci: result
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    
    const timer = setTimeout(checkFibonacciSequence, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [state.grid, increaseCellValue, addToResetQueue]);
  
  useEffect(() => {
    if (
      state.resetQueue.length !== 0 &&
      state.resetQueue.length === state.toFillFibonacci.length
    ) {
      resetGrid(state.resetQueue);
    }
  }, [resetGrid, state.resetQueue, state.toFillFibonacci.length]);
  
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
              toFill={state.toFill}
              toFillFibonacci={state.toFillFibonacci}
              increaseValue={increaseCellValue}
              addToResetQueue={addToResetQueue}
              resetToFill={resetToFill}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
