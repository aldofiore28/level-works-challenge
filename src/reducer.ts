export type State = {
  grid: number[][];
  toFill: string[];
};

type Action<Type extends string, T> = {
  type: Type;
  payload: T;
}

type IncrementAction = Action<"INCREMENT", { x: number, y: number }>;
type Actions = IncrementAction;

export function gridReducer(state: State, action: Actions) {
  switch (action.type) {
    case "INCREMENT":
      const { x, y } = action.payload;
      
      const newToFill: string[] = [];
      const newGrid = state.grid.map((row, rowIndex) =>
        row.map((value, columnIndex) => {
          // update the value only if you are in the selected row if you are
          // looping through another row but you are in the correct column
          if (columnIndex === y || rowIndex === x) {
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
    default:
      return state;
  }
}