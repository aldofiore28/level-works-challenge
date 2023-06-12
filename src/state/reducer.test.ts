import { describe, expect, it } from "vitest";
import { Actions, gridReducer, State } from "./reducer.ts";

describe("reducer", () => {
  describe("INCREMENT", () => {
    it("Increments the value of the chosen coordinates and all the values in the same row and column", () => {
      const state = {
        grid: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      } as State;
      
      const action = {
        type: "INCREMENT",
        payload: {
          x: 1,
          y: 1
        }
      } as Actions;
      
      const expected = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
      ];
      
      expect(gridReducer(state, action).grid).toEqual(expected);
    });
    
    it("Saves the coordinates of all the cells to update", () => {
      const state = {
        grid: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        toFill: [] as string[]
      } as State;
      
      const action = {
        type: "INCREMENT",
        payload: {
          x: 1,
          y: 1
        }
      } as Actions;
      
      const expected = [
        "0-1",
        "1-0",
        "1-1",
        "1-2",
        "2-1"
      ];
      
      expect(gridReducer(state, action).toFill).toEqual(expected);
    });
  });
  
  describe("RESET_GRID", () => {
    it("Resets all the values in the grid present in the resetQueue array", () => {
      const state = {
        grid: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]
        ],
        resetQueue: ['0-0', '1-1', '2-2'],
        toFillFibonacci: ['0-0', '1-1', '2-2']
      } as State;
      
      const action = {
        type: "RESET_GRID",
        payload: {}
      } as Actions;
      
      const expectedGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      
      const actual = gridReducer(state, action);
      expect(actual.grid).toStrictEqual(expectedGrid);
      expect(actual.resetQueue).toStrictEqual([]);
      expect(actual.toFillFibonacci).toStrictEqual([]);
    });
  });
  
  describe("RESET_TO_FILL", () => {
    it("Resets toFill if it has length", () => {
      const state = {
        toFill: ['0-0', '1-1', '2-2']
      } as State;
      
      const action = {
        type: "RESET_TO_FILL",
        payload: {}
      } as Actions;
      
      expect(gridReducer(state, action).toFill).toStrictEqual([]);
    });
  });
});