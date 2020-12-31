import { Grid } from '../src';
import { PointInterface } from '../src/objects/point/point.interface';

describe('test path finding', () => {
    const grid_A = new Grid([
        [50, 55, 60, 65, 70],
        [45, 0,  0,  0,  75],
        [40, 0,  0,  0,  1 ],
        [35, 0,  0,  0,  5 ],
        [30, 25, 20, 15, 10],
    ]);

    const testCases = [
        {
            grid: grid_A,
            startPoint: { x: 4, y: 2 },
            endPoint: { x: 4, y: 1 },
            maxJump: undefined,
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
        grid: Grid;
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
            const path = grid.findPath(startPoint, endPoint, maxJumpCost);
            expect(path).toEqual(expectedPath);
        });
    });

    it('throws an error if start point does no exist', () => {
        const find = () => grid_A.findPath({ x: 999, y: 999 }, { x: 4, y: 1 });

        expect(find).toThrowError('startNode does not exist in the grid');
    });

    it('throws an error if end point does no exist', () => {
        const find = () => grid_A.findPath({ x: 4, y: 1 }, { x: 999, y: 999 });

        expect(find).toThrowError('endNode does not exist in the grid');
    });

    it('throws an error if grid is empty', () => {
        const createEmptyGrid = () => new Grid([]);
        expect(createEmptyGrid).toThrowError('grid matrix cannot be empty');
    });
});
