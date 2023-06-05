type State = number[][];
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
      
      return state.map((row, rowIndex) =>
        row.map((value, columnIndex) => {
          if (columnIndex === y || rowIndex === x) {
            return value + 1;
          }
          
          return value;
        })
      );
    default:
      return state;
  }
}