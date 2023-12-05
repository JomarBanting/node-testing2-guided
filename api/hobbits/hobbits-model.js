const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  return db("hobbits").where("id", id).first()
}

async function insert(hobbit) {
  return await db("hobbits").insert(hobbit).then(([id]) => {
    return db("hobbits").where("id", id).first()
  })
}

async function update(id, changes) {
  await db("hobbits").update(changes).where("id", id)
  const result = await db("hobbits").where("id", id).first()
  return result
}

async function remove(id) {
  const hobbit = await db("hobbits").where("id", id).select("name")
  await db("hobbits").del().where("id", id)
  return hobbit
}
