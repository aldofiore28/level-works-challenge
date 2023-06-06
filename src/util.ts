const ROW_MAXIMUM = 50;
const COLUMN_MAXIMUM = 50;
const MAX_FIBONACCI_SEQUENCE = 5;

export function buildInitialState() {
  return {
    grid: buildInitialGrid(),
    toFill: [],
    toFillFibonacci: [],
    resetQueue: [],
  };
}

export function buildInitialGrid(rows = ROW_MAXIMUM, columns = COLUMN_MAXIMUM): number[][] {
  return Array.from({ length: rows}, () =>
    Array.from({ length: columns}, () => 0)
  );
}

export function isPerfectSquare(num: number) {
  const sqrt = Math.sqrt(num);
  return sqrt === Math.floor(sqrt);
}

export function isFibonacciNumber(num: number) {
  // Specific to this application. We use 0 as the default so we are not counting it here.
  if (num === 0) return false;
  return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
}

export function adjustFibonacciStart(sequence: number[], a = 0, b = 1) {
  const start = sequence[0];
  const checkForSecondOne = sequence[1];
  while (b < start) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  if (start === 1 && checkForSecondOne !== 1) {
    return { a: 1, b: 1 };
  }
  
  return { a, b };
}

export function checkIfSequenceIsFibonacci(sequence: number[]) {
  let { a, b } = adjustFibonacciStart(sequence);
  
  for (let i = 1; i < MAX_FIBONACCI_SEQUENCE; i++) {
    const nextFibonacci = a + b;
    
    if (nextFibonacci !== sequence[i]) {
      return false;
    }
    a = b;
    b = nextFibonacci;
  }
  
  return true;
}

export function getGridCoordinates(index: number, constraint = MAX_FIBONACCI_SEQUENCE) {
  const sequence: string[] = [];
  
  for (let i = 0; i < constraint; i++) {
    const row = Math.floor((index + i) / ROW_MAXIMUM);
    const column = (index + i) % COLUMN_MAXIMUM !== 0 ?
      (index + i) % COLUMN_MAXIMUM :
      0;
    
    const coordinates = `${row}-${column}`;
    
    if (!sequence.includes(coordinates)) {
      sequence.push(`${row}-${column}`);
    }
  }
  
  return sequence;
}

export function checkForFibonacciSequences(grid: number[][]) {
  const flatGrid = grid.flat();
  const sequences: string[] = [];
  
  for (let i = 0; i < (flatGrid.length - 4); i++) {
    const gridSection = flatGrid.slice(i, i + 5);
    
    if (isFibonacciNumber(gridSection[0])) {
      // not inline to avoid a computation
      if (checkIfSequenceIsFibonacci(gridSection)) {
        sequences.push(...getGridCoordinates(i));
      }
    }
  }
  
  return [...new Set(sequences)];
}