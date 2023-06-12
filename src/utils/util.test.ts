import { describe, expect, it } from "vitest";
import {
  adjustFibonacciStart, buildInitialGrid,
  checkForFibonacciSequences,
  checkIfSequenceIsFibonacci,
  getGridCoordinates,
  isFibonacciNumber,
  isPerfectSquare
} from "./util.ts";

describe("util", () => {
  describe("isPerfectSquare", () => {
    it("Valid squares", () => {
      expect(isPerfectSquare(0)).toBe(true);
      expect(isPerfectSquare(1)).toBe(true);
      expect(isPerfectSquare(4)).toBe(true);
      expect(isPerfectSquare(9)).toBe(true);
      expect(isPerfectSquare(16)).toBe(true);
      expect(isPerfectSquare(25)).toBe(true);
      expect(isPerfectSquare(36)).toBe(true);
    });
    
    it("Invalid squares", () => {
      expect(isPerfectSquare(2)).toBe(false);
      expect(isPerfectSquare(3)).toBe(false);
      expect(isPerfectSquare(7)).toBe(false);
      expect(isPerfectSquare(10)).toBe(false);
      expect(isPerfectSquare(15)).toBe(false);
      expect(isPerfectSquare(17)).toBe(false);
    });
  });
  
  describe("isFibonacciNumber", () => {
    it("Returns true for Fibonacci numbers", () => {
      expect(isFibonacciNumber(0)).toBe(false); // 0 is not a Fibonacci number
      expect(isFibonacciNumber(1)).toBe(true);
      expect(isFibonacciNumber(2)).toBe(true);
      expect(isFibonacciNumber(3)).toBe(true);
      expect(isFibonacciNumber(5)).toBe(true);
      expect(isFibonacciNumber(8)).toBe(true);
      expect(isFibonacciNumber(13)).toBe(true);
      expect(isFibonacciNumber(21)).toBe(true);
    });
    
    it("Returns false for non-Fibonacci numbers", () => {
      expect(isFibonacciNumber(4)).toBe(false);
      expect(isFibonacciNumber(6)).toBe(false);
      expect(isFibonacciNumber(7)).toBe(false);
      expect(isFibonacciNumber(10)).toBe(false);
      expect(isFibonacciNumber(15)).toBe(false);
      expect(isFibonacciNumber(17)).toBe(false);
      expect(isFibonacciNumber(22)).toBe(false);
    });
  });
  
  describe("adjustFibonacciStart", () => {
    it("Returns 0 and 1 if the start of the sequence is 0", () => {
      expect(adjustFibonacciStart([0, 1, 1, 2, 3])).toEqual({ a: 0, b: 1 });
    });
    
    it("Returns 0 and 1 if the start of the sequence is 1", () => {
      expect(adjustFibonacciStart([1, 1, 2, 3, 5])).toEqual({ a: 0, b: 1 });
    });
    
    it("Returns 1 and 1 if the start of the sequence is 1 and the second item in the sequence is different than 1", () => {
      expect(adjustFibonacciStart([1, 2, 3, 5, 8])).toEqual({ a: 1, b: 1 });
    });
    
    it("Returns a as the previous number in the sequence and b as the current number in the sequence", () => {
      expect(adjustFibonacciStart([2, 3, 5, 8, 13])).toEqual({ a: 1, b: 2 });
      expect(adjustFibonacciStart([3, 5, 8, 13, 21])).toEqual({ a: 2, b: 3 });
      expect(adjustFibonacciStart([5, 8, 13, 21, 34])).toEqual({ a: 3, b: 5 });
      expect(adjustFibonacciStart([8, 13, 21, 34, 55])).toEqual({ a: 5, b: 8 });
    });
  });
  
  describe("checkIfSequenceIsFibonacci", () => {
    it("Returns true if the array represents a Fibonacci sequence", () => {
      const sequence = [1, 1, 2, 3, 5];
      
      expect(checkIfSequenceIsFibonacci(sequence)).toBe(true);
    });
    
    it("Handles second 1 in the sequence", () => {
      const sequence = [1, 2, 3, 5, 8];
      
      expect(checkIfSequenceIsFibonacci(sequence)).toBe(true);
    });
    
    it("The sequence can start anywhere", () => {
      const sequence = [34, 55, 89, 144, 233];
      
      expect(checkIfSequenceIsFibonacci(sequence)).toBe(true);
    });
  });
  
  describe("getCoordinates", () => {
    // note
    // left side of the string is the row
    // right side of the string is the column
    it("Returns the coordinates to highlight given the index of the flat grid", () => {
      const index = 0;
      const expected = ["0-0", "0-1", "0-2", "0-3", "0-4"];
      expect(getGridCoordinates(index)).toStrictEqual(expected);
    });
    
    it("Can handle the calculation from anywhere in a row", () => {
      const index = 23;
      const expected = ["0-23", "0-24", "0-25", "0-26", "0-27"];
      expect(getGridCoordinates(index)).toStrictEqual(expected);
    });
    
    it("Can handle the calculation from anywhere in a row", () => {
      const index = 56;
      const expected = ["1-6", "1-7", "1-8", "1-9", "1-10"];
      expect(getGridCoordinates(index)).toStrictEqual(expected);
    });
    
    it("Can handle the calculation between rows", () => {
      const index = 48;
      const expected = ["0-48", "0-49", "1-0", "1-1", "1-2"];
      expect(getGridCoordinates(index)).toStrictEqual(expected);
    });
  });
  
  describe("checkForFibonacciSequences", () => {
    it("returns a list of coordinates to update if they represent a Fibonacci sequence", () => {
      const grid = buildInitialGrid();
      grid[0][0] = 1;
      grid[0][1] = 1;
      grid[0][2] = 2;
      grid[0][3] = 3;
      grid[0][4] = 5;
      
      const expected = ["0-0", "0-1", "0-2", "0-3", "0-4"];
      expect(checkForFibonacciSequences(grid)).toStrictEqual(expected);
    });
    
    it("handles multiple rows", () => {
      const grid = buildInitialGrid();
      grid[0][0] = 1;
      grid[0][1] = 1;
      grid[0][2] = 2;
      grid[0][3] = 3;
      grid[0][4] = 5;
      grid[2][0] = 8;
      grid[2][1] = 13;
      grid[2][2] = 21;
      grid[2][3] = 34;
      grid[2][4] = 55;
      
      const expected = ["0-0", "0-1", "0-2", "0-3", "0-4", "2-0", "2-1", "2-2", "2-3", "2-4"];
      expect(checkForFibonacciSequences(grid)).toStrictEqual(expected);
    });
    
    it("handles sequences in between rows", () => {
      const grid = buildInitialGrid();
      grid[0][48] = 1;
      grid[0][49] = 1;
      grid[1][0] = 2;
      grid[1][1] = 3;
      grid[1][2] = 5;
      
      const expected = ["0-48", "0-49", "1-0", "1-1", "1-2"];
      expect(checkForFibonacciSequences(grid)).toStrictEqual(expected);
    });
    
    it("Remove all duplicates from the array", () => {
      const grid = buildInitialGrid();
      grid[0][48] = 1;
      grid[0][49] = 1;
      grid[1][0] = 2;
      grid[1][1] = 3;
      grid[1][2] = 5;
      grid[1][3] = 8;
      
      const expected = ["0-48", "0-49", "1-0", "1-1", "1-2", "1-3"];
      expect(checkForFibonacciSequences(grid)).toStrictEqual(expected);
    });
  });
});