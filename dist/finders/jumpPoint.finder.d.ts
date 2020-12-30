import { Grid } from "../objects/grid";
import { Point } from "../objects/point/point";
import { PointInterface } from "../objects/point/point.interface";
export declare const findPath: (startPoint: Point, endPoint: Point, maxJumpCost: number, grid: Grid) => PointInterface[];
