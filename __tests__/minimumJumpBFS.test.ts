import { Graph } from '../src/objects/graph';

import {smallGrid, testCasesSmallGrid} from "./test-data/small-grid";
import {testCasesBigGrid} from "./test-data/big-grid";

describe('test minimumJumpBFS', () => {
    const testCases = [
        ...testCasesSmallGrid,
        ...testCasesBigGrid
    ]

    testCases.forEach(({
        startPoint,
        endPoint,
        maxJumpCost,
        path: expectedPath,
        grid
    }) => {
        it(`validates pathfinding from ${Object.values(startPoint)} to ${Object.values(endPoint)} with jumpCost  ${maxJumpCost}`, () => {
            const graph = new Graph(grid, maxJumpCost)

            const path = graph.findPath(startPoint, endPoint);

            expect(path).toEqual(expectedPath);
        });
    });

    it('throws an error if start point does no exist', () => {
        const graph = new Graph(smallGrid, 6)
        const find = () => graph.findPath({ x: 999, y: 999 }, { x: 4, y: 1 });

        expect(find).toThrowError(ReferenceError);
    });

    it('throws an error if end point does no exist', () => {
        const graph = new Graph(smallGrid, 6)
        const find = () => graph.findPath({ x: 4, y: 1 }, { x: 999, y: 999 });

        expect(find).toThrowError(ReferenceError);
    });

    it('throws an error if grid is empty', () => {
        const createEmptyGrid = () => new Graph([], 3);
        expect(createEmptyGrid).toThrowError(ReferenceError);
    });
});
