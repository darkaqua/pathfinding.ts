import { PointInterface } from "./point.interface";
export declare class Point implements PointInterface {
    x: number;
    y: number;
    constructor(x: number, y: number);
    copy(x: number, y: number): Point;
    equal(point: Point): boolean;
}
