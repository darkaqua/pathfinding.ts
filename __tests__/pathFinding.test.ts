import { Grid } from '../src';
import { PointInterface } from '../src/objects/point/point.interface';

describe('test path finding', () => {
    const grid = new Grid([
        [50, 55, 60, 65, 70],
        [45, 0, 0, 0, 75],
        [40, 0, 0, 0, 1],
        [35, 0, 0, 0, 5],
        [30, 25, 20, 15, 10],
    ]);

    const testCases = [
        {
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
            startPoint: { x: 4, y: 2 },
            endPoint: { x: 4, y: 1 },
            maxJumpCost: 100,
            path: [
                { x: 4, y: 2 },
                { x: 4, y: 1 },
            ],
        },
        {
            startPoint: { x: 4, y: 2 },
            endPoint: { x: 4, y: 1 },
            maxJumpCost: 1,
            path: [],
        },
    ] as {
        startPoint: PointInterface;
        endPoint: PointInterface;
        maxJumpCost: number;
        path: PointInterface[];
    }[];

    testCases.forEach(
        ({ startPoint, endPoint, maxJumpCost, path: expectedPath }) => {
            it(`validates pathfinding for jumpCost  ${maxJumpCost}`, () => {
                const path = grid.findPath(startPoint, endPoint, maxJumpCost);
                expect(path).toEqual(expectedPath);
            });
        }
    );

    it('throws an error if start point does no exist', () => {
        const find = () => grid.findPath({ x: 999, y: 999 }, { x: 4, y: 1 });

        expect(find).toThrowError(ReferenceError);
    });

    it('throws an error if end point does no exist', () => {
        const find = () => grid.findPath({ x: 4, y: 1 }, { x: 999, y: 999 });

        expect(find).toThrowError(ReferenceError);
    });
});
