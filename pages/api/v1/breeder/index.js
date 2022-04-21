import { authenticated } from 'middlewares/authentication'
import { decode } from 'jsonwebtoken'
import prisma from 'services/prisma'
import nc from 'next-connect'
import withMethodHandler from 'middlewares/withMethodHandler'

const postBreeder = async (req, res) => {
  const jwt = req.headers.authorization.split(' ')[1]
  const id = decode(jwt).sub
  const breederData = req.body
  try {
    const findUser = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        address: true,
        phoneNumber: true,
      },
    })
    const mergedData = { ...findUser, ...breederData }
    const result = await prisma.user.update({
      where: { id },
      data: {
        role: 'breeder',
        breeders: {
          create: mergedData,
        },
      },
      include: {
        breeders: true,
      },
    })
    res.status(200).json({ data: result })
  } catch (error) {
    res.status(500).json({ data: 'Register Failed' })
    console.log(error)
  }
}

const handler = nc()
  .use(withMethodHandler(['POST']))
  .use(authenticated())
  .post((req, res) => postBreeder(req, res))

export default handler
