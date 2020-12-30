import {OpenList} from "../src/objects/openList";

describe('test openList', () => {

    let list: OpenList<number>

    beforeEach(() => {
        list = new OpenList<number>((a, b) => a - b);
    })

    it("inserts one", () => {
        list.push(1)
        expect(list.pop()).toBe(1)
    })

    it("is empty", () => {
        expect(list.empty()).toBe(true)
    })

    it("is not empty", () => {
        list.push(1)
        expect(list.empty()).toBe(false)
    })

    it("removes lowest value", () => {
        list.push(3)
        list.push(5)
        list.push(1)
        expect(list.pop()).toBe(1)
        expect(list.pop()).toBe(3)
        expect(list.pop()).toBe(5)
    })

    it("errors when popping from empty list", () => {
        expect(() => list.pop()).toThrowError(ReferenceError)
    })

})
