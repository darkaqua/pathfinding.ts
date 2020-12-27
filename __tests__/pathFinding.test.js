"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('test path finding', () => {
    const grid = new src_1.Grid([
        [50, 55, 60, 65, 70],
        [45, 0, 0, 0, 75],
        [40, 0, 0, 0, 1],
        [35, 0, 0, 0, 5],
        [30, 25, 20, 15, 10],
    ]);
    it('validates pf {test 1}', () => {
        const path = grid.findPath({ x: 4, y: 2 }, { x: 4, y: 1 });
        expect(path).toEqual([
            { x: 4, y: 2 },
            { x: 4, y: 4 },
            { x: 0, y: 4 },
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 4, y: 1 }
        ]);
    });
    it('validates pf {test 2}', () => {
        const path = grid.findPath({ x: 4, y: 2 }, { x: 4, y: 1 }, 10);
        expect(path).toEqual([
            { x: 4, y: 2 },
            { x: 4, y: 4 },
            { x: 0, y: 4 },
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 4, y: 1 }
        ]);
    });
    it('validates pf {test 3}', () => {
        const path = grid.findPath({ x: 4, y: 2 }, { x: 4, y: 1 }, 100);
        expect(path).toEqual([
            { x: 4, y: 2 },
            { x: 4, y: 1 }
        ]);
    });
    it('validates pf {test 4}', () => {
        const path = grid.findPath({ x: 4, y: 2 }, { x: 4, y: 1 }, 1);
        expect(path).toEqual([]);
    });
});
