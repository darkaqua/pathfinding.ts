// @ts-ignore
import { smallGrid, testCasesSmallGrid } from "./test-data/small-grid";
// @ts-ignore
import { testCasesBigGrid } from "./test-data/big-grid";
import { Grid } from "../src";

describe("Diagonal Jump Point", () => {
  const testCases = [...testCasesSmallGrid, ...testCasesBigGrid];

  testCases.forEach(
    ({ startPoint, endPoint, maxJumpCost, path: expectedPath, grid }) => {
      it(`validates pathfinding from {${Object.values(startPoint)}} to {${Object.values(endPoint)}} with jumpCost {${maxJumpCost}}`, () => {
        const testGrid = new Grid(grid);
        const path = testGrid.findPath(startPoint, endPoint, maxJumpCost);
        // drawLayout(grid, path)
        expect(path).toEqual(expectedPath);
      });
    },
  );

  it("throws an error if start point does no exist", () => {
    const grid = new Grid(smallGrid);
    const find = () => grid.findPath({ x: 999, y: 999 }, { x: 4, y: 1 });

    expect(find).toThrowError("startNode does not exist in the grid");
  });

  it("throws an error if end point does no exist", () => {
    const grid = new Grid(smallGrid);
    const find = () => grid.findPath({ x: 4, y: 1 }, { x: 999, y: 999 });

    expect(find).toThrowError("endNode does not exist in the grid");
  });

  it("throws an error if grid is empty", () => {
    const createEmptyGrid = () => new Grid([]);
    expect(createEmptyGrid).toThrowError("grid matrix cannot be empty");
  });
});
