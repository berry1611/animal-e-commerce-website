const schema = require("inputs/pet/create")
const prisma = require("services/prisma")

async function create(req, res) {
  try {
    const { raceId, animalId } = req.body
    if (!animalId) {
      const race = await prisma.race.findUnique({
        where: {
          id: raceId
        }
      })
      req.body.animalId = race.animalId
    }

    const schemaResult = await schema.validateAsync(req.body)

    const result = await prisma.pet.create({
      data: schemaResult
    })
    res.status(200).json({ data: result })
  } catch (error) {
    res.status(500).json({ data: error.message })
  }
}

async function list(req, res) {
  try {
    const { skip, take, ...rest } = req.query
    const parsedSkip = parseInt(skip)
    const parsedTake = parseInt(take)

    const result = await prisma.pet.findMany({
      ...(skip && { skip: parsedSkip }),
      ...(take && { take: parsedTake }),
      where: { ...rest }
    })

    res.status(200).json({ data: result })
  } catch (error) {
    res.status(500).json({ data: error.message })
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).json({ data: "405 Method Not Allowed" })

  if (req.method == "GET") {
    await list(req, res)
    return;
  }

  await create(req, res)
}