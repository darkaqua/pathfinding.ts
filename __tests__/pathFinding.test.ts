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

    const grid_B = new Grid([
        [1, 1, 1, 5, 9, 9],
        [1, 1, 1, 5, 9, 9],
        [1, 1, 1, 0, 12, 12],
        [1, 1, 1, 1, 15, 15],
        [1, 1, 1, 1, 15, 15],
    ]);

    const roomAPath: number[][] = [
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 7, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 7, 10, 10, 10, 10, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 7, 10, 10, 10, 10, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 7, 10, 10, 10, 10, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 12, 12, 12, 12, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 15, 15, 15, 15, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, /*from*/1, 19, 19/*to*/, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19]
    ];
    const grid_romA = new Grid(roomAPath);

    const testCases = [
        {
            grid: grid_romA,
            startPoint: { x: 13, y: 20 },
            endPoint: { x: 15, y: 20 },
            path: [
                { x: 13, y: 20 },
                { x: 11, y: 20 },
                { x: 11, y: 21 },
                { x: 9, y: 21 },
                { x: 9, y: 20 },
                { x: 14, y: 20 },
                { x: 15, y: 20 }
            ],
        },
        {
            grid: grid_B,
            startPoint: { x: 3, y: 3 },
            endPoint: { x: 4, y: 3 },
            maxJump: undefined,
            path: [
                { x: 3, y: 3 },
                { x: 2, y: 3 },
                { x: 2, y: 1 },
                { x: 4, y: 1 },
                { x: 4, y: 3 },
            ],
        },
        {
            grid: grid_B,
            startPoint: { x: 4, y: 3 },
            endPoint: { x: 3, y: 3 },
            maxJump: undefined,
            path: [
                { x: 4, y: 3 },
                { x: 4, y: 1 },
                { x: 2, y: 1 },
                { x: 2, y: 3 },
                { x: 3, y: 3 },
            ],
        },
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

        expect(find).toThrowError(ReferenceError);
    });

    it('throws an error if end point does no exist', () => {
        const find = () => grid_A.findPath({ x: 4, y: 1 }, { x: 999, y: 999 });

        expect(find).toThrowError(ReferenceError);
    });

    it('throws an error if grid is empty', () => {
        const createEmptyGrid = () => new Grid([]);
        expect(createEmptyGrid).toThrowError(ReferenceError);
    });
});
