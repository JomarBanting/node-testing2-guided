const Hobbit = require('./hobbits-model')
const db = require("../../data/dbConfig")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test("environment is testing", () => {
    expect(process.env.NODE_ENV).toBe("testing")
})

describe("getAll", () => {
    test("resolve all the hobbits in the table", async () => {
        const result = await Hobbit.getAll()
        expect(result).toHaveLength(4)
        expect(result[0]).toMatchObject({ name: "sam" })
    })
})
describe("getById", () => {
    test("resolves the hobbit by the given id", async () => {
        let result = await Hobbit.getById(1)
        expect(result).toMatchObject({ name: "sam" })
        result = await Hobbit.getById(2)
        expect(result).toMatchObject({ name: "frodo" })
    })
})
describe("insert", () => {
    const bilbo = { name: "bilbo" }
    test("resolves the newly created hobbits", async () => {
        const result = await Hobbit.insert(bilbo);
        expect(result).toMatchObject({ name: "bilbo" })
    })
    test("adds the hobbit to the hobbits table", async () => {
        await Hobbit.insert(bilbo)
        const records = await Hobbit.getAll()
        expect(records).toHaveLength(5)
    })
})

describe("update", () => {
    test("updating the hobbit name", async () => {
        let result = await Hobbit.update(1, { name: "Pepper" })
        expect(result).toMatchObject({ name: "Pepper" })
    })
})

describe("delete", () => {
    test("deleting the hobbit", async () => {
        await Hobbit.remove(1)
        let total = await db("hobbits")
        expect(total).toHaveLength(3)
    })
})