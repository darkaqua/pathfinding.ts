import { Point } from "./point/point";
export declare class Node {
    readonly point: Point;
    cost: number;
    g: number;
    h: number;
    f: number;
    opened: boolean;
    closed: boolean;
    parent: Node;
    constructor(point: Point, cost?: number);
}
