const schema = require("inputs/pet/update")
const prisma = require("services/prisma")

async function update(req, res) {
  try {
    const { id: idParam } = req.query

    const validResult = await schema.validateAsync(
      {
        id: idParam,
        ...req.body
      }
    )

    const { id, ...rest } = validResult
    const result = await prisma.pet.update({
      data: { ...rest },
      where: { id }
    })

    res.status(200).json({ data: result })
  } catch (error) {
    res.status(500).json({ data: error.message })
  }
}

async function remove(req, res) {
  try {
    const id = parseInt(req.query.id)

    const result = await prisma.pet.delete({
      where: { id }
    })

    res.status(200).json({ data: result })
  } catch (error) {
    res.status(500).json({ data: error.message })
  }
}

export default async function handler(req, res) {
  const allowedMethods = ['DELETE', 'PATCH', 'PUT']
  const isAllowed = allowedMethods.includes(req.method)
  if (!isAllowed) return res.status(405).json({ data: "405 Method Not Allowed" })

  if (["PATCH", "PUT"].includes(req.method)) {
    await update(req, res)
    return;
  }

  await remove(req, res)
}