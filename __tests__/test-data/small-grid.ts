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