const db = require("../data/dbConfig")
const request = require("supertest")
const server = require("./server")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})

describe("[GET] /hobbits", () => {
    test("response with 200 Ok", async () => {
        const res = await request(server).get("/hobbits")
        expect(res.status).toBe(200)
    })
    test("response with all the hobbits", async () => {
        const res = await request(server).get("/hobbits")
        expect(res.body).toHaveLength(4)
    })
})

describe("[POST] /hobbits", () => {
    const bilbo = { name: "bilbo" }
    test("adds a hobbit to the database", async () => {
        await request(server).post("/hobbits").send(bilbo)
        expect(await db("hobbits")).toHaveLength(5)
    })
    test("response with the hobbit", async () => {
        const res = await request(server).post("/hobbits").send(bilbo)
        expect(res.body).toMatchObject(bilbo)
    })
})

describe("[PUT] /hobbits/:id", () => {
    const jeef = { name: "jeef" }
    test("update a hobbit from the server", async () => {
        const res = await request(server).put("/hobbits/1").send(jeef)
        expect(res.body).toMatchObject({name: "jeef"})
    })
})

describe("[DELETE] /hobbits/:id", () => {
    test("delete a hobbit from the server", async () => {
        await request(server).delete("/hobbits/1")
        const remainingHobbits = await db("hobbits")
        expect(remainingHobbits).toHaveLength(3)
    })
})