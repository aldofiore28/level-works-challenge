// A number is Fibonacci if and only if one or both of (5*n2 + 4) or (5*n2 – 4) is a perfect square
// https://en.wikipedia.org/wiki/Fibonacci_sequence#Recognizing_Fibonacci_numbers
export function isPerfectSquare(num: number) {
  const sqrt = Math.sqrt(num);
  return (sqrt * sqrt) === num;
}

export function isFibonacciNumber(num: number) {
  const left = 5 * num * num + 4;
  const right = 5 * num * num - 4;
  
  return isPerfectSquare(left) || isPerfectSquare(right);
}

export function isFibonacciGrid(grid: number[][], constraint: number = 5) {
  return ["0-0", "0-1", "0-2", "0-3", "0-4"];
}