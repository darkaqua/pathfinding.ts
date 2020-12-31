import {FinderEnum, Grid} from '../src';

export const smallGrid = [
    [50, 55, 60, 65, 70],
    [45, 0,  0,  0,  75],
    [40, 0,  0,  0,  1 ],
    [35, 0,  0,  0,  5 ],
    [30, 25, 20, 15, 10],
];

export const testCasesSmallGrid = [
    {
        grid: smallGrid,
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
        grid: smallGrid,
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
        grid: smallGrid,
        startPoint: { x: 4, y: 2 },
        endPoint: { x: 4, y: 1 },
        maxJumpCost: 100,
        path: [
            { x: 4, y: 2 },
            { x: 4, y: 1 },
        ],
    },
    {
        grid: smallGrid,
        startPoint: { x: 4, y: 2 },
        endPoint: { x: 4, y: 1 },
        maxJumpCost: 1,
        path: [],
    },
    {
        grid: smallGrid,
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
        grid: smallGrid,
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
        grid: smallGrid,
        startPoint: { x: 0, y: 1 },
        endPoint: { x: 4, y: 3 },
        maxJumpCost: 5,
        path: [
            { x: 0, y: 1 },
            { x: 0, y: 4 },
            { x: 4, y: 4 },
            { x: 4, y: 3 },
        ],
    }
]

describe('test JPS v1', () => {
    const testCases = [
        ...testCasesSmallGrid
    ];

    testCases.forEach(({
        startPoint,
        endPoint,
        maxJumpCost,
        path: expectedPath,
        grid
    }) => {
        it(`validates pathfinding from {${Object.values(startPoint)}} to {${Object.values(endPoint)}} with jumpCost {${maxJumpCost}}`, () => {
            const testGrid = new Grid(grid, 'node')
            const path = testGrid.findPath(startPoint, endPoint, maxJumpCost, FinderEnum.JUMP_POINT);
            expect(path).toEqual(expectedPath);
        });
    });

    it('throws an error if start point does no exist', () => {
        const grid = new Grid(smallGrid)
        const find = () => grid.findPath({ x: 999, y: 999 }, { x: 4, y: 1 });

        expect(find).toThrowError('startNode does not exist in the grid');
    });

    it('throws an error if end point does no exist', () => {
        const grid = new Grid(smallGrid)
        const find = () => grid.findPath({ x: 4, y: 1 }, { x: 999, y: 999 });

        expect(find).toThrowError('endNode does not exist in the grid');
    });

    it('throws an error if grid is empty', () => {
        const createEmptyGrid = () => new Grid([]);
        expect(createEmptyGrid).toThrowError('grid matrix cannot be empty');
    });
});
