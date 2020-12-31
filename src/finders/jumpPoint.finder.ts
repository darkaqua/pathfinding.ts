import {Grid} from "../objects/grid";
import {Point} from "../objects/point/point";
import {OpenList} from "../objects/openList";
import {Node} from "../objects/node";
import {HeuristicUtils} from "../utils/heuristic.utils";
import {PointInterface} from "../objects/point/point.interface";

export const findPath = (
    startPoint: Point,
    endPoint: Point,
    maxJumpCost: number,
    grid: Grid
): PointInterface[] => {

    const openList: OpenList<Node> = new OpenList<Node>(
        (nodeA, nodeB) => nodeA.totalCost - nodeB.totalCost);
    const startNode: Node | null = grid.getNode(startPoint);
    const endNode: Node | null = grid.getNode(endPoint);

    if (startNode === null)
        throw ReferenceError('startNode does not exist in the grid');

    if (endNode === null)
        throw ReferenceError('endNode does not exist in the grid');

    startNode.opened = true;
    openList.push(startNode);

    const jump = (neighbor: Node | null, node: Node): Node | null => {
        if(!neighbor || neighbor.cost === 0)
            return null;

        if(neighbor.point.equal(endNode.point))
            return neighbor;

        const { point: neighborPoint } = neighbor;
        const { point: nodePoint } = node;

        const correctedPoint = new Point(
            neighborPoint.x - nodePoint.x,
            neighborPoint.y - nodePoint.y,
        );

        const getNode = (x: number, y: number) => grid.getNode(neighborPoint.copy(x, y));
        const hasPositiveCost = (cost?: number) => cost ?? -Infinity > 0;

        if(correctedPoint.x !== 0 && (
            (hasPositiveCost(getNode(0, -1)?.cost) && getNode(- correctedPoint.x, -1)?.cost === 0)
            || (hasPositiveCost(getNode(0, 1)?.cost) && getNode(- correctedPoint.x, 1)?.cost === 0)
        )) return neighbor;

        else if(correctedPoint.y !== 0) {
            if(
                (hasPositiveCost(getNode(-1, 0)?.cost) > 0 && getNode(- 1, - correctedPoint.y)?.cost === 0)
                || (hasPositiveCost(getNode(1, 0)?.cost) && getNode(1, - correctedPoint.y)?.cost === 0)
            ) return neighbor;

            if(jump(getNode(1, 0), neighbor) || jump(getNode(-1, 0), neighbor))
                return neighbor;
        }
        return jump(getNode(correctedPoint.x, correctedPoint.y), neighbor);
    }

    const identifySuccessors = (node: Node) => {
        findNeighbors(node).map(neighbor => {
            const jumpNode = jump(neighbor, node);
            if(!jumpNode) return;

            if(jumpNode.closed) return;

            const { point: nodePoint } = node;
            const { point: jumpNodePoint } = jumpNode;

            const jumpPoint = {
                x: jumpNodePoint.x - nodePoint.x,
                y: jumpNodePoint.y - nodePoint.y
            }
            const absoluteJumpPoint = {
                x: Math.abs(jumpPoint.x),
                y: Math.abs(jumpPoint.y)
            }
            const distance = HeuristicUtils.Octile(absoluteJumpPoint.x, absoluteJumpPoint.y);

            const distanceJump = {
                x: Array.from({ length: absoluteJumpPoint.x + 1 }, (x, i) => nodePoint.x + i)
                    .map(nodeX => grid.getNode(new Point(nodeX, nodePoint.y)) as Node)
                    .filter(node => node !== null),
                y: Array.from({ length: absoluteJumpPoint.y + 1 }, (y, i) => nodePoint.y + i)
                    .map(nodeY => grid.getNode(new Point(nodePoint.x, nodeY)) as Node)
                    .filter(node => node !== null),
            }

            const maxXCost = distanceJump.x
                .reduce((maxCost, node, index) => {
                    if(index === 0)
                        return node.cost;
                    const currentCost = Math.abs(distanceJump.x[index - 1].cost - node.cost);
                    return currentCost > maxCost ? currentCost : maxCost;
                }, 0);
            const maxYCost = distanceJump.y
                .reduce((maxCost, node, index) => {
                    if(index === 0)
                        return node.cost;
                    const currentCost = Math.abs(distanceJump.y[index - 1].cost - node.cost);
                    return currentCost > maxCost ? currentCost : maxCost;
                }, 0);

            // to expensive to jump
            const currentJumpCost = Math.abs(node.cost - jumpNode.cost);

            const jumpAverageCost = currentJumpCost / distance;

            console.log(nodePoint, jumpNodePoint, maxXCost, maxYCost);
            // console.log(distanceJump)
            // if(maxXCost > maxJumpCost || maxYCost > maxJumpCost)
            if(jumpAverageCost > maxJumpCost)
                return;


            const estimatedDistance = (node.distanceFromStart + distance) * neighbor.cost;

            if(jumpNode.opened && estimatedDistance >= jumpNode.distanceFromStart) return;

            const { point: endNodePoint } = endNode;

            jumpNode.distanceFromStart = estimatedDistance;
            jumpNode.heuristicDistance = jumpNode.heuristicDistance || HeuristicUtils.DrManhattan(
                Math.abs(jumpNodePoint.x - endNodePoint.x),
                Math.abs(jumpNodePoint.y - endNodePoint.y)
            );
            jumpNode.totalCost = jumpNode.distanceFromStart + jumpNode.heuristicDistance;
            jumpNode.parent = node;

            if(!jumpNode.opened) {
                jumpNode.opened = true;
                openList.push(jumpNode);
                return;
            }
        });
    }

    type Direction = [number, number];
    const getNeighborsByDirection = (
        directions: Direction[],
        reference: Point,
        grid: Grid
    ) => {
        return directions.reduce((acc: Node[], direction: [number, number]) => {
            const node = grid.getNode(reference.copy(...direction));
            return (node && node.cost > 0) ? [...acc, node] : acc;
        }, []);
    };
    const findNeighbors = (node: Node): Node[] => {

        const { parent, point: nodePoint } = node;

        if(!parent) return getNeighbors(node);

        const { point: parentPoint } = parent;

        const getNormalizedNumber = (no: number, pa: number) =>
            (no - pa) / Math.max(Math.abs(no - pa), 1);

        const normalizedPoint = new Point(
            getNormalizedNumber(nodePoint.x, parentPoint.x),
            getNormalizedNumber(nodePoint.y, parentPoint.y)
        );

        if(normalizedPoint.x !== 0) {
            const xDirections = [
                [0, -1],
                [0, 1],
                [normalizedPoint.x, 0],
            ] as Direction[];

            return getNeighborsByDirection(xDirections, nodePoint, grid);
        }

        if(normalizedPoint.y !== 0) {
            const xDirections = [
                [-1, 0],
                [1, 0],
                [0, normalizedPoint.y],
            ] as Direction[];

            return getNeighborsByDirection(xDirections, nodePoint, grid);
        }

        return []
    }

    const getNeighbors = (node: Node): Node[] => {
        const nodePoint = node.point;

        const xDirections = [
            [0, -1],
            [1, 0],
            [0, 1],
            [-1, 0],
        ] as Direction[];

        return getNeighborsByDirection(xDirections, nodePoint, grid);
    }

    while (!openList.empty()) {

        const node = openList.pop();
        if(!node) continue;

        node.closed = true;

        if (node === endNode) {
            const getParentPoint = (_node: Node, pointList: Point[] = []): Point[] =>
                _node.parent
                    ? getParentPoint(_node.parent, [...pointList, _node.point])
                    : [...pointList, _node.point];
            return getParentPoint(node)
                .reverse()
                .map(point => ({ x: point.x, y: point.y }));
        }

        identifySuccessors(node)
    }
    return [];

}
