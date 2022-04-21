import { decode } from 'jsonwebtoken'
import { authenticated } from 'middlewares/authentication'
import withMethodHandler from 'middlewares/withMethodHandler'
import nc from 'next-connect'
import { list } from 'services/baseApiHandler'
import prisma from 'services/prisma'

const patchUser = async (req, res) => {
  const jwt = req.headers.authorization.split(' ')[1]
  const id = decode(jwt).sub

  const updatedData = req.body
  try {
    const result = await prisma.user.update({
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
  .get((req, res) => list(req, res, prisma.user))
  .patch((req, res) => patchUser(req, res))

export default handler
