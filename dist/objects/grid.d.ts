import { Node } from "./node";
import { Point } from "./point/point";
import { PointInterface } from "./point/point.interface";
import { FinderEnum } from "../finders/finder.enum";
export declare class Grid {
    private _width;
    private _height;
    private readonly _matrix;
    nodes: Node[][];
    constructor(matrix: any);
    getNode(point: Point): Node | null;
    private clone;
    findPath(startPoint: PointInterface, endPoint: PointInterface, maxJumpCost?: number, finderEnum?: FinderEnum): PointInterface[];
}
