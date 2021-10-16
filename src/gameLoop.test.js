const rewire = require("rewire")
const gameLoop = rewire("./gameLoop")
const Dot = gameLoop.__get__("Dot")

// @ponicode
describe("flash", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Anas", "Pierre Edouard", "George"], ["George", "Michael", "George"], ["George", "George", "Jean-Philippe"]]
        inst = new Dot(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.flash()
        }
    
        expect(callFunction).not.toThrow()
    })
})
