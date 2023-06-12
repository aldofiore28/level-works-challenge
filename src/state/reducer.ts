export type State = {
  grid: number[][];
  toFill: string[];
  toFillFibonacci: string[];
  resetQueue: string[];
};

type Action<Type extends string, T> = {
  type: Type;
  payload: T;
}

type IncrementAction = Action<"INCREMENT", { x: number, y: number }>;
type FibonacciAction = Action<"COLOR_FIBONACCI", { toFillFibonacci: string[] }>
type ResetAction = Action<"RESET", { x: number, y: number }>;
type ResetQueueAction = Action<"RESET_GRID", { queue: string[] }>;
type ResetToFillAction = Action<"RESET_TO_FILL", Record<string, never>>;
export type Actions = IncrementAction | FibonacciAction | ResetAction | ResetQueueAction | ResetToFillAction;

export function gridReducer(state: State, action: Actions) {
  switch (action.type) {
    case "INCREMENT": {
      const newToFill: string[] = [];
      const newGrid = state.grid.map((row, rowIndex) =>
        row.map((value, columnIndex) => {
          // update the value only if you are in the selected row if you are
          // looping through another row but you are in the correct column
          if (columnIndex === action.payload.y || rowIndex === action.payload.x) {
            // keep track of what needs to be filled yellow
            newToFill.push(`${rowIndex}-${columnIndex}`);
            return value + 1;
          }
          
          return value;
        })
      );
      
      return {
        ...state,
        grid: newGrid,
        toFill: newToFill,
      };
    }
    case "COLOR_FIBONACCI": {
      return {
        ...state,
        toFillFibonacci: action.payload.toFillFibonacci
      };
    }
    case "RESET": {
      return {
        ...state,
        resetQueue: [...state.resetQueue, `${action.payload.x}-${action.payload.y}`]
      };
    }
    case "RESET_GRID": {
      const updatedGrid = [...state.grid.map(row => [...row])];
      
      for (const coordinate of state.resetQueue) {
        const [x, y] = coordinate.split("-");
        const rowIndex = parseInt(x);
        const columnIndex = parseInt(y);
        
        // Check if the coordinates are within the valid range
        if (
          rowIndex >= 0 &&
          rowIndex < updatedGrid.length &&
          columnIndex >= 0 &&
          columnIndex < updatedGrid[rowIndex].length
        ) {
          updatedGrid[rowIndex][columnIndex] = 0;
        }
      }
      
      return {
        ...state,
        grid: updatedGrid,
        resetQueue: [],
        toFillFibonacci: []
      };
    }
    case "RESET_TO_FILL": {
      return state.toFill.length ? {
        ...state,
        toFill: []
      } : state;
    }
    default:
      return state;
  }
}