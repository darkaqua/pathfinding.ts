import { Graph } from '../src/objects/graph';
import { PointInterface } from '../src/objects/point/point.interface';
import {minimumJumps} from "../src/finders/minimumJumpBFS.finder";
import {Grid} from "../src";

describe('test path finding', () => {
    const grid_A = [
        [50, 55, 60, 65, 70],
        [45, 0,  0,  0,  75],
        [40, 0,  0,  0,  1 ],
        [35, 0,  0,  0,  5 ],
        [30, 25, 20, 15, 10],
    ]

    const testCases = [
        {
            grid: grid_A,
            startPoint: { x: 4, y: 2 },
            endPoint: { x: 4, y: 1 },
            maxJumpCost: 5,
            path: [
                { x: 4, y: 2 },
                { x: 4, y: 4 },
                { x: 0, y: 4 },
                { x: 0, y: 0 },
                { x: 4, y: 0 },
                { x: 4, y: 1 },
            ],
        },
        {
            grid: grid_A,
            startPoint: { x: 4, y: 2 },
            endPoint: { x: 4, y: 1 },
            maxJumpCost: 10,
            path: [
                { x: 4, y: 2 },
                { x: 4, y: 4 },
                { x: 0, y: 4 },
                { x: 0, y: 0 },
                { x: 4, y: 0 },
                { x: 4, y: 1 },
            ],
        },
        {
            grid: grid_A,
            startPoint: { x: 4, y: 2 },
            endPoint: { x: 4, y: 1 },
            maxJumpCost: 100,
            path: [
                { x: 4, y: 2 },
                { x: 4, y: 1 },
            ],
        },
        {
            grid: grid_A,
            startPoint: { x: 4, y: 2 },
            endPoint: { x: 4, y: 1 },
            maxJumpCost: 1,
            path: [],
        },
        {
            grid: grid_A,
            startPoint: { x: 2, y: 0 },
            endPoint: { x: 4, y: 4 },
            maxJumpCost: 10,
            path: [
                { x: 2, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 4 },
                { x: 4, y: 4 },
            ],
        },
        {
            grid: grid_A,
            startPoint: { x: 4, y: 3 },
            endPoint: { x: 0, y: 1 },
            maxJumpCost: 5,
            path: [
                { x: 4, y: 3 },
                { x: 4, y: 4 },
                { x: 0, y: 4 },
                { x: 0, y: 1 },
            ],
        },
        {
            grid: grid_A,
            startPoint: { x: 0, y: 1 },
            endPoint: { x: 4, y: 3 },
            maxJumpCost: 5,
            path: [
                { x: 0, y: 1 },
                { x: 0, y: 4 },
                { x: 4, y: 4 },
                { x: 4, y: 3 },
            ],
        },
    ] as {
        grid: number[][];
        startPoint: PointInterface;
        endPoint: PointInterface;
        maxJumpCost: number;
        path: PointInterface[];
    }[];

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
        const graph = new Graph(grid_A, 6)
        const find = () => graph.findPath({ x: 999, y: 999 }, { x: 4, y: 1 });

        expect(find).toThrowError(ReferenceError);
    });

    it('throws an error if end point does no exist', () => {
        const graph = new Graph(grid_A, 6)
        const find = () => graph.findPath({ x: 4, y: 1 }, { x: 999, y: 999 });

        expect(find).toThrowError(ReferenceError);
    });

    it('throws an error if grid is empty', () => {
        const createEmptyGrid = () => new Graph([], 3);
        expect(createEmptyGrid).toThrowError(ReferenceError);
    });
});
