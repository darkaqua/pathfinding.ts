import { Node } from "./node";
export declare class OpenList {
    private list;
    constructor();
    push(node: Node): void;
    pop(): Node;
    empty(): boolean;
}
