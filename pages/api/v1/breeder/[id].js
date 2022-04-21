import { authenticated } from 'middlewares/authentication'
import prisma from 'services/prisma'
import nc from 'next-connect'
import withMethodHandler from 'middlewares/withMethodHandler'
import { show } from 'services/baseApiHandler'

const patchBreeder = async (req, res) => {
  let { id } = req.query
  id = parseInt(id)

  const updatedData = req.body
  try {
    const result = await prisma.breeder.update({
      where: { id },
      data: updatedData,
    })
    res.status(200).json({ data: result })
  } catch (error) {
    res.status(500).json({ data: 'Update Failed' })
  }
}

const handler = nc()
  .use(withMethodHandler(['GET', 'PATCH']))
  .use(authenticated())
  .get((req, res) => show(req, res, prisma.breeder))
  .patch((req, res) => patchBreeder(req, res))

export default handler
