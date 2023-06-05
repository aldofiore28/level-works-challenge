export function buildInitialState() {
  return {
    grid: buildInitialGrid(),
    toFill: [],
    toFillFibonacci: [],
  };
}

export function buildInitialGrid(rows: number = 5, columns: number = 5): number[][] {
  return new Array(rows).fill(new Array(columns).fill(0));
}

function isPerfectSquare(num: number) {
  const sqrt = Math.sqrt(num);
  return sqrt === Math.floor(sqrt);
}

function isFibonacciNumber(num: number) {
  // Specific to this application. We use 0 as the default so we are not counting it here.
  if (num === 0) return false;
  return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
}

function checkIfSequenceIsFibonacci(sequence: number[]) {
  const start = sequence[0];
  
  let a = 0;
  let b = 1;
  
  // Adjust the starting point of the Fibonacci sequence
  while (b < start) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  for (let i = 1; i < 5; i++) {
    const nextFibonacci = a + b;
    if (nextFibonacci !== sequence[i]) {
      return false;
    }
    a = b;
    b = nextFibonacci;
  }
  
  return true;
}

export function getGridCoordinates(index: number, constraint: number = 5) {
  const sequence: string[] = [];
  
  for (let i = 0; i < constraint; i++) {
    const row = Math.floor(index / 5);
    const column = (i + index) % 5;
    sequence.push(`${row}-${column}`);
  }
  
  return sequence;
}

export function checkForFibonacciSequences(grid: number[][]) {
  const flatGrid = grid.flat();
  let sequences: string[] = [];
  
  for (let i = 0; i < (flatGrid.length - 4); i++) {
    const gridSection = flatGrid.slice(i, i + 5);
    
    if (isFibonacciNumber(gridSection[0])) {
      if (checkIfSequenceIsFibonacci(gridSection)) {
        sequences.push(...getGridCoordinates(i));
      }
    }
  }
  
  return sequences;
}